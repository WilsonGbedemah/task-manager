/* eslint-disable no-undef */
// const Validator = require('validatorjs');

// const validator = async (body, rules, customMessages, callback) => {
//     const validation = new Validator(body, rules, customMessages);
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
//     validator.register('strict', value => passwordRegex.test(value), 'password must contain at least one uppercase letter, one lowercase letter and one number ')
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));

// };
// module.exports = validator;

const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;