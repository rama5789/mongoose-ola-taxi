// global imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// local imports
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;

// connect to mongodb
if (process.env.NODE_ENV !== 'test') {
  // dev Database
  mongoose.connect('mongodb://localhost:27017/ola', {
    useNewUrlParser: true,
    useFindAndModify: false
  });
}

// parse json body
app.use(bodyParser.json());

// load all routes
routes(app);

// root route
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// catch all errors
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
