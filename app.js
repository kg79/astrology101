const express = require('express');
const app = express();

const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.end('fuck yeah')
})

app.listen(port)