const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/companyModel');
require('dotenv').config();

exports.registerCompany = async (req, res) => {
    try {
        const { name, address, email, phone, password } = req.body;

        // Validate input
        if (!name || !address || !email || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Get the adminId from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        // Check if company with the same email already exists
        const companyExists = await Company.findCompanyByEmail(email);
        if (companyExists) {
            return res.status(400).json({ error: 'Company with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register company linked to adminId
        await Company.registerCompany( name, address, email, phone, hashedPassword, adminId);

        res.status(201).json({ message: 'Company registered successfully' });
    } catch (error) {
        console.error('Company Registration Error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};


exports.companyLogin = async (req, res) => {
    console.log('hello login');

    try {
        const { email, password } = req.body;

        // Debug log: Check if email and password are coming through correctly
        console.log({ email, password });

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the company by email
        const company = await Company.findCompanyByEmail(email);
        console.log('Company found:', company);

        // Check if company exists
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, company.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Check if JWT_SECRET is loaded
        console.log('JWT Secret:', process.env.JWT_SECRET);

        // Create a JWT token for the company
        const token = jwt.sign({ id: company.id, adminId: company.admin_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated JWT token:', token);

        // Send the token as a response
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error logging in:', error.message, error.stack);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};



exports.getCompaniesByAdmin = async (req, res) => {
    try {
        // Get the adminId from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        const companies = await Company.getAllCompaniesByAdmin(adminId);
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};


exports.getSingleCompany = async (req, res) => {
    try {
        const { id } = req.params;

        // Extract adminId from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        // Find the company by ID
        const company = await Company.findCompanyById(id);

        // Check if company exists
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Check if the company belongs to the authenticated admin
        if (company.admin_id !== adminId) {
            return res.status(403).json({ error: 'You are not authorized to view this company' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};


exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email, phone, country } = req.body;

        // Validate input
        if (!name || !address || !email || !phone || !country) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Extract adminId from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        // Find the company by ID
        const company = await Company.findCompanyById(id);

        // Check if company exists
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Check if the company belongs to the authenticated admin
        if (company.admin_id !== adminId) {
            return res.status(403).json({ error: 'You are not authorized to update this company' });
        }

        // Update company details
        await Company.updateCompany(id, name, address, email, phone, country);
        res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ error: 'Failed to update company' });
    }
};


exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        // Extract adminId from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        // Find the company by ID
        const company = await Company.findCompanyById(id);

        // Check if company exists
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Check if the company belongs to the authenticated admin
        if (company.admin_id !== adminId) {
            return res.status(403).json({ error: 'You are not authorized to delete this company' });
        }

        // Delete the company
        await Company.deleteCompany(id);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ error: 'Failed to delete company' });
    }
};


