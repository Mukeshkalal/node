const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { email, password, username, country, number } = req.body;

        // Validate input
        if (!email || !password || !username || !country || !number) {
            return res.status(400).json({ error: 'All fields are required' });
        }

           // Check if admin with the same email already exists
           const adminExists = await Admin.findAdminByEmail(email);
           if (adminExists) {
               return res.status(400).json({ error: 'Admin with this email already exists' });
           }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call model to insert into DB
        await Admin.registerAdmin(email, hashedPassword, username, country, number);

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error); // Log the error in the console
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};


exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findAdminByEmail(email);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};
