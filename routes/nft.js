// routes/nft.js
const express = require('express');
const router = express.Router();
const NFT = require('../models/NFT');
const nftController = require('../controllers/nftController');

/**
 * @swagger
 * tags:
 *   name: NFTs
 *   description: API to manage NFTs
 */

/**
 * @swagger
 * /api/nft/fetchAndSaveNFT:
 *   get:
 *     summary: Fetch and save NFT data
 *     tags: [NFTs]
 *     responses:
 *       200:
 *         description: NFT data fetched and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NFT'
 *       500:
 *         description: Server error
 */
router.get('/fetchAndSaveNFT', nftController.fetchAndSaveData);

/**
 * @swagger
 * /api/nft/getNFTS:
 *   get:
 *     summary: Retrieve a list of NFTs
 *     tags: [NFTs]
 *     responses:
 *       200:
 *         description: A list of NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NFT'
 *       500:
 *         description: Server error
 */
router.get('/getNFTS', nftController.getNfts);

/**
 * @swagger
 * /api/nft/getNFT/{id}:
 *   get:
 *     summary: Retrieve an NFT by ID
 *     tags: [NFTs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The NFT ID
 *     responses:
 *       200:
 *         description: An NFT object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFT'
 *       404:
 *         description: NFT not found
 *       500:
 *         description: Server error
 */
router.get('/getNFT/:id', nftController.getNftById);

module.exports = router;
