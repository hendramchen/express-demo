// Section 5: Express - Advanced Topics
// debug package is same like console.log
// but we can controlle them by running this command in terminal:
// export DEBUG=app:startup or DEBUG=app:startup nodemon index.js
const debug = require('debug')('app:startup'); // app:startup is the example to label the debug message
// Section 5: Express - Advanced Topics
// Config is used store environment variables for different environments
const config = require('config');

const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const express = require('express');
const app = express(); // Section 4: Building RESTful API's Using Express
// this code is use to parse the body of the request to be json
app.use(express.json()); // express.json() is a middleware function
// static middleware function is use to read pure by accessing in url
// by accessing: localhost:3000/public/readme.txt
// public is the folder name
app.use(express.static('public'));
// get router courses
app.use('/api/courses', courses);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts', (req, res) => {
    res.send(req.query);
});

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

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });