const express = require('express');
const { registerUser, loginUser, currentUser, getUser } = require('../controllers/usersController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);


module.exports = router;