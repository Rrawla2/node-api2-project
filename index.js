const server = require('./api/posts')
const port = 6000

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
})