const fetch = require('node-fetch');
const mongoose = require('mongoose');
const connectDB = require('../config/db'); 
const collectionModel = require('../models/Collection');

const url = 'https://api.opensea.io/api/v2/collections';
const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-api-key': process.env.API_KEY }
};

const fetchAndSaveData = async (req, res) => {
  try {
    await connectDB();

    const res = await fetch(url, options);
    const json = await res.json();

    console.log('JSON response:', JSON.stringify(json, null, 2));

    if (json.collections && Array.isArray(json.collections)) {
      const filteredData = json.collections
        .filter(collection => collection.image_url) 
        .map(collection => ({
          name: collection.name,
          collection_id: collection.collection, 
          description: collection.description,
          image_url: collection.image_url,
          owner: collection.owner,
          fetchedBy: req.user.id 
        }));

      await collectionModel.insertMany(filteredData);
      console.log('Data has been saved successfully.');
      res.status(200).json({ message: 'Data fetched and saved successfully.' });
    } else {
      console.error('Error: The fetched data does not contain an array of collections.');
      res.status(400).json({ message: 'The fetched data does not contain an array of collections.' });
    }
    console.log('Data ended successfully.');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error.' });
  } finally {
    console.log('Database closed.');
    mongoose.connection.close();
  }
};

const getCollections = async (req, res) => {
    try {
        const collectionInfo = await collectionModel.find();
        res.json(collectionInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCollectionById = async (req, res) => {
    try {
        const collectionInfo = await collectionModel.findById(req.params.id);
        res.json(collectionInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    fetchAndSaveData,
    getCollections,
    getCollectionById
};