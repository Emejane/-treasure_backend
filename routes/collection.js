const express = require('express');
const router = express.Router();
const collection = require('../models/Collection'); // Assurez-vous d'importer votre modèle de données NFT
const collectionController = require('../controllers/collectionController');

router.get('/fetchAndSaveCollections', collectionController.fetchAndSaveData);
router.get('/getCollections', collectionController.getCollections);
router.get('/getCollection/:id', collectionController.getCollectionById);


module.exports = router;