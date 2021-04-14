'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Obtener puerto
const port = process.env.PORT || 3000;

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Content-Type', 'text/plain');
    next();
});

// Import Routes
var appRoutes = require('./routes/app');
var mail = require('./routes/mail');

app.listen(port, () => {
    console.log('Express Server Puerto: ' + port + ' : \x1b[32m%s\x1b[0m', 'Online');
});

// Routes
app.use('/api/mail', mail);

app.use('/api', appRoutes);