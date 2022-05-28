// Section 5: Express - Advanced Topics
// debug package is same like console.log
// but we can controlle them by running this command in terminal:
// export DEBUG=app:startup or DEBUG=app:startup nodemon index.js
const debug = require('debug')('app:startup'); // app:startup is the example to label the debug message
// Section 5: Express - Advanced Topics
// Config is used store environment variables for different environments
const config = require('config');
const Joi = require('joi'); // Section 4: Building RESTful API's Using Express
const logger = require('./logger');
const express = require('express');
const app = express(); // Section 4: Building RESTful API's Using Express
// this code is use to parse the body of the request to be json
app.use(express.json()); // express.json() is a middleware function
// static middleware function is use to read pure by accessing in url
// by accessing: localhost:3000/public/readme.txt
// public is the folder name
app.use(express.static('public'));

// this is how to define environment variable
// by running this command in terminal: export NODE_ENV=development
// or by running this command in terminal: export NODE_ENV=production
const env = process.env.NODE_ENV;
console.log('env', env);
// why we need to define the environment variable?
// because we have different configuration for development and production
// we can avoid console log in production
// example:
if (app.get('env') === 'development') {
    // example custom middleware function
    app.use(logger);
    debug('call debug to replace console.log()');
}

// Section 5: Express - Advanced Topics
// Configuration
// Why we need to configuration file?
// to store our environment variable, 
// so we no need to write condition like this: if (app.get('env') === 'development') 
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// mail.password is defined in custom-environment-variables.json
// it will set like this "password": "app_password"
// app_password we can set in terminal: export app_password=your_password
console.log('Mail Password: ' + config.get('mail.password'));

// ============================
// Section 4: Building RESTful API's Using Express
// ============================
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts', (req, res) => {
    res.send(req.query);
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});


// create a new course
app.post('/api/courses', (req, res) => {
    const { value, error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: value.name
    };
    courses.push(course);
    res.send(course);
});
// update a course
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

// delete a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });