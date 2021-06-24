// Introduce express framework
const express = require('express');
// Create blog management page routing
const admin = express.Router();

// Render the login page

admin.get('/login', require('./admin/loginPage'));

// Realize the login function
admin.post('/login', require('./admin/login'));

// Create user list route
admin.get('/user', require('./admin/userPage'));

// Realize the exit function
admin.get('/logout', require('./admin/logout'));

// Implement user edit page routing
admin.get('/user-edit', require('./admin/user-edit'));

// Create a route that implements user-added functions
admin.post('/user-edit', require('./admin/user-edit-fn'));

admin.post('/user-modify', require('./admin/user-modify'));

// Delete user function routing
admin.get('/user-delete', require('./admin/user-delete'));

// Article list page routing
admin.get('/article', require('./admin/article'));

// Post edit page routing
admin.get('/article-edit', require('./admin/article-edit'));

// Implement the article to add functional routing
admin.post('/article-add', require('./admin/article-add'));

admin.post('/article-modify', require('./admin/article-modify'));
admin.get('/article-delete', require('./admin/article-delete'));

admin.post('/ajax', require('./admin/ajax'));

module.exports = admin;