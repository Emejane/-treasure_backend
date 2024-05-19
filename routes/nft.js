const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { createCache, findCache } = require('../controllers/nftController');

router.post('/create-cache', [auth, role(['organisateur'])], createCache);

router.get('/find-cache', [auth, role(['chasseur'])], findCache);

module.exports = router;
