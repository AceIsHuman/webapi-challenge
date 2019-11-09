const express = require('express');
const projectRoute = require('./routes/projectRoute');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRoute);

module.exports = server;