const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8083;
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');


app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;

const url = process.env.theMongo || process.env.MONGODB_URI;

const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/partial', (req, res) => {
    res.render('partial');
})

app.post('/signUp', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("nouns");
        bcrypt.hash(req.body.password, 5, function(err, hash) {
            dbo.collection("people").insertOne({
                username:req.body.username,
                birth:req.body.birthday,
                pass:hash,
                tropical:req.body.tropical,
                chinese:req.body.chinese,
                element:req.body.element,
                picture:req.body.picture
            });
        });
        res.redirect('/')
      });
});

app.post('/logIn', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("nouns");
        dbo.collection("people").find({"username":`${req.body.username}`}).toArray((err, data) => {
            bcrypt.compare(req.body.password, data[0].pass, function(err, result) {
                if (result) {
                    res.render('astroLanding', {data:data});
                } else {
                    res.redirect('/');
                }
            });
        });
    });
});
// app.post('/logIn', (req, res) => {
//     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("nouns");
//         dbo.collection("people").find({"username":`${req.body.username}`}).toArray((err, data) => {
//                 res.render('astroLanding', {data:data});
//         });
//     });
// });



app.listen(port)