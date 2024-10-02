const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Admin authenticated routes
router.post('/register', companyController.registerCompany);
router.post('/login', companyController.companyLogin);
router.get('/', companyController.getCompaniesByAdmin);

// New routes
router.get('/:id', companyController.getSingleCompany);   // Get single company by ID
router.put('/:id', companyController.updateCompany);      // Update company by ID
router.delete('/:id', companyController.deleteCompany); 

module.exports = router;
