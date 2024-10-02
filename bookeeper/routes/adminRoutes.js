const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAllAdmins);
router.post('/register', adminController.register);
router.post('/login', adminController.login);

module.exports = router;
