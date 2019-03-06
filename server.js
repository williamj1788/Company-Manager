const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();

var app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.get('/signup', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
})
app.post('/login', upload.none(),(req, res, next) => {
    console.log(req.body);
    res.redirect('/company');
})
app.get('/company', upload.none(),(req, res, next) => {
    console.log('served');
    res.sendFile(path.join(__dirname, 'public/company.html'));
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)})