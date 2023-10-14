/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.get('/:username', userController.getUser);

router.put('/:username', userController.updateUser);

router.post('/', userController.createUser);



module.exports = router;