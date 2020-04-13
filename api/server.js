const express = require('express');

// Imports
const GetRouter = require('../endpoints/get-router.js');
const PostRouter = require('../endpoints/post-router');
const ManipulationRouter = require('../endpoints/manipRouter');

const db = require('../data/db-config.js');

const server = express();

server.use(express.json());

// Endpoints
server.use('/api/get', GetRouter);
server.use('/api/post', PostRouter);
server.use('/api/manip', ManipulationRouter);

module.exports = server;