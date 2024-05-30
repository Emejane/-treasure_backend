// routes/collection.js
const express = require('express');
const router = express.Router();
const collection = require('../models/Collection');
const collectionController = require('../controllers/collectionController');

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: API to manage collections
 */

/**
 * @swagger
 * /api/collection/fetchAndSaveCollections:
 *   get:
 *     summary: Fetch and save collection data
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Collection data fetched and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       500:
 *         description: Server error
 */
router.get('/fetchAndSaveCollections', collectionController.fetchAndSaveData);

/**
 * @swagger
 * /api/collection/getCollections:
 *   get:
 *     summary: Retrieve a list of collections
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: A list of collections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       500:
 *         description: Server error
 */
router.get('/getCollections', collectionController.getCollections);

/**
 * @swagger
 * /api/collection/getCollection/{id}:
 *   get:
 *     summary: Retrieve a collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The collection ID
 *     responses:
 *       200:
 *         description: A collection object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.get('/getCollection/:id', collectionController.getCollectionById);

module.exports = router;
