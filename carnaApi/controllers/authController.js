const Login = require('../models/Login');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const login = await Login.findOne({ email });

        if (!login || !await bcrypt.compare(password, login.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token or start a session for the logged-in user
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};
