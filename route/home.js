// Introduce express framework
const express = require('express');
// Create blog display page routing
const home = express.Router();

home.get('/', require('./home/index'));

// Blog front-end article details display page
home.get('/article', require('./home/article'));

// Create a comment function route
home.post('/comment', require('./home/comment'));
home.post('/commentNoUser', require('./home/commentNoUser'));

home.get('/list', require('./home/listmenu'));

module.exports = home;