const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8082;

const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



app.get('/partial', (req, res) => {
    res.render('partial');
})

app.listen(port)