// Introduce express framework
const express = require('express');
// Create blog management page routing
const other = express.Router();

other.get('/', require('./other/main'));

// Upload file with rich text editor
other.post('/public/uploads/content', require('./other/editor'));

module.exports = other;