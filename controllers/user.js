/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const {
    ObjectId
} = require('mongodb');

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
        permissions: req.body.permissions,
        title: req.body.title,
        tasks: req.body.tasks
    };
    console.log('Data received for createUser:', user);
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating user:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    const username = req.params.username; // Get the username from the request parameters
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        permissions: req.body.permissions,
        title: req.body.title,
        tasks: req.body.tasks
    };

    const response = await mongodb
        .getDb()
        .db()
        .collection('users')
        .updateOne({
            username: username // Update based on the username
        }, {
            $set: updatedUser
        });

    console.log(response);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        console.log('Error updating user:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};
const deleteUser = async (req, res) => {
    const userName = req.params.username;
    const db = mongodb.getDb().db();
    try {
        const response = await db.collection('users').deleteOne({
            username: userName
        });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the user.');
    }
};


module.exports = {
    getAll,
    createUser,
    getUser,
    updateUser,
    deleteUser
};