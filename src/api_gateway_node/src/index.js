const bodyParser = require('body-parser');
const helmet     = require('helmet');
const express    = require('express');
const cors       = require('cors');
const logger     = require('morgan');
const httpCode   = require('http-status');
const services   = require('./services');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

services(app);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = httpCode.NOT_FOUND;
  next(error);
});

app.use((error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || httpCode.INTERNAL_SERVER_ERROR);
  res.send(res.locals.error);
});
