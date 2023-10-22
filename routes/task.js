/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');
const validation = require('../middleware/validate');

router.get('/', taskController.getAll);

router.get('/:name', taskController.getTask);

router.put('/:id', validation.saveTask, taskController.updateTask);

router.post('/', validation.saveTask, taskController.createTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;