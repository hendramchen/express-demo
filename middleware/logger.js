// example middleware function
// middleware function is require 3 parameters: request, response, next
function log(req, res, next) {
  console.log('logging...');
  next(); 
  // next is used to run the next middleware function
  // like authentication middleware, or run the route handler (app.get(req, res))
}

module.exports = log;