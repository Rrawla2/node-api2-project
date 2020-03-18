const express = require("express");
const expressRouter = require("../express-router");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', expressRouter);

server.get('/', (req, res) => {
    const query = req.query
    console.log("query:", query)
    res.status(200).json(query)
    // res.send('Receiving Posts')
})

module.exports = server;