const express = require('express');
const router = express.Router();
const NFT = require('../models/NFT'); // Assurez-vous d'importer votre modèle de données NFT
const nftController = require('../controllers/nftController');
// Route pour récupérer tous les NFT
/**
 * @openapi
 * /fetchAndSaveNFT:
 *   get:
 *     description: Fetch and get all the nft records
 *     responses:
 *       200:
 *         description: Returns all the records of nfts
 */
router.get('/fetchAndSaveNFT', nftController.fetchAndSaveData);

module.exports = router;