require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cookieParse = require('cookie-parser');
const { join } = require('path');
const router = require('./routes/router');
const { clientError, serverError } = require('./controller/errors');

const app = express();

app.disabled('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParse());
app.use(express.static(join(__dirname, '..', 'public')));
app.set('port', process.env.PORT || 8000);
app.use('/api/v1/', router);
app.use(clientError);
app.use(serverError);

module.exports = app;
