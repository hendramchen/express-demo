# express-demo
basic nodejs and CRUD with comment information
it contain:
- CRUD
- midleware example
- config to store environment variables
- debug package
- etc

## how to run this app
usually we can run the node app by running this command
`node index.js`
but since we use nodemon package, then we should run with this command
`nodemon index.js`
in this app I add config password, so the full command to run this app is:
```
export app_password=12345
export NODE_ENV=development
export DEBUG=app:startup
nodemon index.js
```