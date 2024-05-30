const express = require('express');
const router = express.Router();
const { register, login, signOut} = require('../controllers/authController');


/**
 * @openapi
 * /register:
 *   post:
 *     description: Fetch and save a collection data from the API
 *     responses:
 *       200:
 *         description: Returns collection data that is stored in the database
 */
router.post('/register', register);

/**
 * @openapi
 * /login:
 *   post:
 *     description: Fetch and save a collection data from the API
 *     responses:
 *       200:
 *         description: Returns collection data that is stored in the database
 */
router.post('/login', login);

/**
 * @openapi
 * /logout/{id}:
 *   post:
 *     description: logout the user from the system
 *     responses:
 *       200:
 *         description: the user is logged out
 */
router.post('/logout/:id', signOut);

module.exports = router;
