const express = require('express');
const projectRoute = require('./routes/projectRoute');
const actionsRoute = require('./routes/actionRoute');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRoute);
server.use('/api/actions', actionsRoute);

module.exports = server;