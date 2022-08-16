const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

/* ENDPOINT USERS. */
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.updateByid);

module.exports = router;
