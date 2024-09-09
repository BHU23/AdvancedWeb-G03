const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

// customer route
router.get('/customers', customerController.getAllCustomers);


module.exports = router;
