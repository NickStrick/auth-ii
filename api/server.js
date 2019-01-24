require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./authRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan('short'));
server.use(express.json());

server.use('/api', authRouter);


module.exports = server;