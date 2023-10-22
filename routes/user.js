/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const validation = require('../middleware/validate');

router.get('/', userController.getAll);

router.get('/:username', userController.getUser);

router.put('/:id', validation.saveUser, userController.updateUser);

router.post('/', validation.saveUser, userController.createUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;