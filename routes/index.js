/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/theme', require('./task'));

module.exports = router;