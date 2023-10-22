/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// const getUser = async (req, res) => {
//     // Checking if username is valid or not
//     if (!ObjectId.isValid(req.params.username)) {
//         res.status(400).json('Must use a valid username to find user')
//     }
//     const username = req.params.username; // Get the username from the request parameters
//     const result = await mongodb.getDb().db().collection('users').find({
//         username: username // Search for the user by username
//     });
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//     });
// };


const getUser = async (req, res) => {
    const {
        username
    } = req.params;

    if (!username || !/^[a-zA-Z0-9_]{4,10}$/.test(username)) {
        return res.status(400).json({
            error: 'The username field must be provided.'
        });
    }

    try {
        const result = await mongodb.getDb().db().collection('users').findOne({
            username
        });

        if (!result) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a user.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        permissions: req.body.permissions,
        title: req.body.title,
        tasks: req.body.tasks
    };
    //console.log('Data received for updateContact:', contact);
    const response = await mongodb
        .getDb()
        .db()
        .collection('users')
        .replaceOne({
            _id: userId
        }, updatedUser);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};



const deleteUser = async (req, res) => {

    // Checking if task name is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to delete user');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('users').deleteOne({
            _id: userId
        }, true);
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