const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const masterchefRouter = require('./masterchef-router');

const app = express();
const fileServerMiddleware = express.static('public');

app.use(bodyParser.json());  // JSON parser
app.use(bodyParser.urlencoded({ extended: true })); // url-encoded parser
app.use(cookieParser());

app.use('/', fileServerMiddleware);
app.use('/', masterchefRouter); //all REST API's

app.listen(3000, function () {
    console.log('App started on port 3000');});