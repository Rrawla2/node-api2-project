const express = require("express");
const expressRouter = require("../express-router");

const server = express();

server.use(express.json());
server.use('/api/posts', expressRouter);

server.get('/', (req, res) => {
    res.send('Receiving Posts')
})

module.exports = server;