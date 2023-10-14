/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/', taskController.getAll);

router.get('/:name', taskController.getSingle);

router.put('/:name', taskController.updateTask);

router.post('/', taskController.createTask);

module.exports = router;