const fetch = require('node-fetch');
const mongoose = require('mongoose');
const connectDB = require('../config/db'); 
const Collection = require('../models/Collection');

const url = 'https://api.opensea.io/api/v2/collections';
const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-api-key': process.env.API_KEY }
};

const fetchAndSaveData = async () => {
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
          owner: collection.owner
        }));

      await Collection.insertMany(filteredData);
      console.log('Data has been saved successfully.');
    } else {
      console.error('Error: The fetched data does not contain an array of collections.');
    }
    console.log('Data ended successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    console.log('Database closed .');
    mongoose.connection.close();
  }
};

const getCollections = async (req, res) => {
    try {
        const collectionInfo = await collection.find();
        res.json(collectionInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCollectionById = async (req, res) => {
    try {
        const collectionInfo = await collection.findById(req.params.id);
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