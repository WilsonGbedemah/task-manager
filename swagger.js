/* eslint-disable no-undef */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Task Manager ",
        description: "Manages task of users"
    },
    // host: "https://task-manager-t3rr.onrender.com",
    // schemes: ['https']
    host: "localhost:8080",
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// //Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js');
// });