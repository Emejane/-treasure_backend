const fetch = require('node-fetch');
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Chemin vers votre fichier db.js
const NFT = require('../models/NFT');
const Collection = require('../models/Collection');

const fetchAndSaveData = async () => {
  try {
    await connectDB();

    const collections = await Collection.find(); 
    for (const collection of collections) {
      const url = `https://api.opensea.io/api/v2/collection/${collection.collection_id}/nfts`;
      console.log(`Fetching data from URL: ${url}`); 

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': process.env.API_KEY 
        }
      };

      const res = await fetch(url, options);
      if (!res.ok) {
        console.error(`Failed to fetch data for collection: ${collection._id}. Status: ${res.status}`);
        continue;
      }

      const json = await res.json();
      console.log('JSON response:', JSON.stringify(json, null, 2));

      if (json.success === false) {
        console.error(`API error for collection: ${collection._id}`);
        continue;
      }

      if (json.nfts && Array.isArray(json.nfts)) { 
        const extractedData = json.nfts
          .filter(nft => nft.image_url)
          .map(nft => ({
            name: nft.name,
            collection_id: collection._id,
            description: nft.description,
            image_url: nft.image_url
          }));
        await NFT.insertMany(extractedData);
        console.log('Data has been saved successfully for collection:', collection._id);
      } else {
        console.error('Error: The fetched data does not contain an array of NFTs for collection:', collection._id);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

const getCollections = async (req, res) => {
  try {
    const collectionInfo = await Collection.find();
    res.json(collectionInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collectionInfo = await Collection.findById(req.params.id);
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
