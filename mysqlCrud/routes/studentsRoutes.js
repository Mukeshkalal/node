const express = require('express');
const { getStudents } = require('../controllers/studentsController');

const router = express.Router();


//Router

//Get All Employ
router.get('/get', getStudents);


module.exports = router;