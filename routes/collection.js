const express = require('express');
const router = express.Router();
const collection = require('../models/Collection'); // Assurez-vous d'importer votre modèle de données NFT
const collectionController = require('../controllers/collectionController');


/**
 * @openapi
 * /fetchAndSaveCollections:
 *   get:
 *     description: Fetch and save a collection data from the API
 *     responses:
 *       200:
 *         description: Returns collection data that is stored in the database
 */
router.get('/fetchAndSaveCollections', collectionController.fetchAndSaveData);
/**
 * @openapi
 * /getCollections:
 *   get:
 *     description: get a collection data from the database
 *     responses:
 *       200:
 *         description: Returns collection data that is stored in the database
 */
router.get('/getCollections', collectionController.getCollections);
/**
 * @openapi
 * /getCollection/{id}:
 *   get:
 *     description: get a specific collection data from the database
 *     responses:
 *       200:
 *         description: Returns collection data that is stored in the database
 */
router.get('/getCollection/:id', collectionController.getCollectionById);


module.exports = router;