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

const getSingle = async (req, res) => {
    const taskName = req.params.name; // Get the task name from the request parameters
    const result = await mongodb.getDb().db().collection('task').find({
        name: taskName // Search for the task by name
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
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
    const taskName = req.params.name; // Get the task name from the request parameters
    const updatedTask = {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        assignedUser: req.body.assignedUser,
        notes: req.body.notes
    };

    const response = await mongodb
        .getDb()
        .db()
        .collection('task')
        .updateOne({
                name: taskName
            }, // Update based on the task name
            {
                $set: updatedTask
            }
        );

    console.log(response);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        console.log('Error updating task:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
};

const deleteTask = async (req, res) => {
    const name = req.params.name;
    const db = mongodb.getDb().db();
    try {
        const response = await db.collection('task').deleteOne({
            name: name
        });
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
    getSingle,
    deleteTask
};