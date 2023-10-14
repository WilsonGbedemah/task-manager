/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./user'));
router.use('/task', require('./task'));

module.exports = router;