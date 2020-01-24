const express = require('express')
const server = express();

server.use(express.json());

const usersRouter = require('./users/users-router.js');
server.use('/api/users', usersRouter)

const port = 4000;

server.listen(port, () => console.log(`Server listening on port ${port}`))