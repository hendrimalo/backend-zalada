const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

/* ENDPOINT LOGIN DAN REGISTER */
router.post('/login', usersController.login);
router.post('/register', usersController.register);

module.exports = router;
