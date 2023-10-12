/* eslint-disable no-undef */
const mongodb = require('../db/connect');
//const { ObjectId } = require('mongodb'); 

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getUser = async (req, res) => {
    const username = req.params.username; // Get the username from the request parameters
    const result = await mongodb.getDb().db().collection('users').find({
        username: username // Search for the user by username
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        permission: req.body.permission,
        tasks: req.body.tasks
    };
    console.log('Data received for createUser:', user);
    const response = await mongodb.getDb().db().collection('user').insertOne(user);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating user:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

module.exports = {
    getAll,
    createUser,
    getUser
};