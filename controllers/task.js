/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('task').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// const getTask = async (req, res) => {
//     // Checking if task name is valid or not
//     if (!ObjectId.isValid(req.params.name)) {
//         res.status(400).json('Must use a valid task name to retrieve task');
//     }

//     const taskName = req.params.name; // Get the task name from the request parameters
//     const result = await mongodb.getDb().db().collection('task').find({
//         name: taskName // Search for the task by name
//     });
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//     });
// };
const getTask = async (req, res) => {
    const {
        name
    } = req.params;

    if (!name) {
        return res.status(400).json({
            error: 'The name field must be provided'
        });
    }

    try {
        const result = await mongodb.getDb().db().collection('task').findOne({
            name
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



const createTask = async (req, res) => {
    const task = {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        assignedUser: req.body.assignedUser,
        notes: req.body.notes
    };
    console.log('Data received for createTask:', task);
    const response = await mongodb.getDb().db().collection('task').insertOne(task);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating task:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
};

const updateTask = async (req, res) => {
    // Checking if task Id is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must uses a valid task id to update the task')
    }
    const userId = new ObjectId(req.params.id);
    const updatedTask = {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        assignedUser: req.body.assignedUser,
        notes: req.body.notes
    };

    //console.log('Data received for updateContact:', contact);
    const response = await mongodb
        .getDb()
        .db()
        .collection('task')
        .replaceOne({
            _id: userId
        }, updatedTask);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
};

const deleteTask = async (req, res) => {

    // Checking if task Id is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid task id to delete task');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('task').deleteOne({
            _id: userId
        }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the task.');
    }
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    getTask,
    deleteTask
};