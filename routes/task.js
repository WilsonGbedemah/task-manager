const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/', taskController.getAll);

router.get('/:id', taskController.getSingle);

router.post('/', taskController.createContact);

module.exports = router;