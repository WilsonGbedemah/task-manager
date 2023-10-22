/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        name: 'required|string',
        email: 'required|email',
        roles: 'required|array',
        'roles.*': 'string',
        password: 'required|string|min:6',
        permissions: 'required|array',
        'permissions.*': 'string',
        title: 'required|string',
        tasks: 'required|array',
        'tasks.*': 'string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


const saveTask = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        description: 'required|string',
        dueDate: ['required', {
            date: {
                format: 'YYYY-MM-DD'
            }
        }],
        priority: ['required', 'string', {
            in: ['Low', 'Medium', 'High']
        }],
        status: ['required', 'string', {
            in: ['Not Started', 'In Progress', 'Completed']
        }],
        assignedUser: 'required|integer',
        notes: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};
module.exports = {
    saveUser,
    saveTask
}