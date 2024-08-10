const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");



const getUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// @decs Register User
// @route GET /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("Email already register!");
    }


    //hash password

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hash", hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log(`User created${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error('User data us not valid');
    }

    res.json({ message: "Register the User" });
});


// @decs Login User
// @route GET /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    //compare password with hashPassword

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        )
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Password in wrong");
    }
});

// @decs Current User
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    getUser
}