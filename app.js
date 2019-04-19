const http = require('http');
const port = process.env.PORT || 8080;

http.Server((req, res) => {
    res.end('this is a test')
}).listen(port)