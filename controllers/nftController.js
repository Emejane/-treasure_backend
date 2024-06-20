const fetch = require('node-fetch');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const NFT = require('../models/NFT');
const Collection = require('../models/Collection');

const fetchAndSaveData = async (req, res) => {
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

      const resFetch = await fetch(url, options);
      if (!resFetch.ok) {
        console.error(`Failed to fetch data for collection: ${collection._id}. Status: ${resFetch.status}`);
        continue;
      }

      const json = await resFetch.json();
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

    res.status(200).json({ message: 'Data fetched and saved successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    mongoose.connection.close();
  }
};

const getNfts = async (req, res) => {
  try {
    const nftInfo = await NFT.find();
    res.json(nftInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNftById = async (req, res) => {
  try {
    const nftInfo = await NFT.findById(req.params.id);
    if (!nftInfo) {
      return res.status(404).json({ message: 'NFT not found' });
    }
    res.json(nftInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAndSaveData,
  getNfts,
  getNftById
};
