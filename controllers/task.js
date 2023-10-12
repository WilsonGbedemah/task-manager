/* eslint-disable no-undef */
const mongodb = require('../db/connect');
//const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('task').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// const getSingle = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb.getDb().db().collection('task').find({
//         _id: userId
//     });
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//     });
// };

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

// const updateContact = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     // be aware of updateOne if you only want to update specific fields
//     const contact = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         favoriteColor: req.body.favoriteColor,
//         birthday: req.body.birthday
//     };
//     //console.log('Data received for updateContact:', contact);
//     const response = await mongodb
//         .getDb()
//         .db()
//         .collection('contacts')
//         .replaceOne({
//             _id: userId
//         }, contact);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         console.log('Error creating contact:', response.error);
//         res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//     }
// };

// const deleteContact = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb.getDb().db().collection('contacts').deleteOne({
//         _id: userId
//     }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//     }
// };

module.exports = {
    getAll,
    createTask,
};