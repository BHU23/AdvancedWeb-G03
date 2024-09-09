const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Routes for authentication
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
