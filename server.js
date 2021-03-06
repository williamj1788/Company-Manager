const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var upload = multer();

var companyRouter = require('./companyRouter');

var app = express();

const PORT = 3000;

function addData(req,res,next){
    let database = res.locals.database;
    let data = null;
    if(res.locals.company){
        data = res.locals.company;
        database.companies.push(data);
    }
    fs.writeFile('companies.json',JSON.stringify(database,null,2), err =>{
        if(err) throw err;
    })
    res.status(201).send(data);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.none());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.get('/signup', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
})
app.post('/signup', (req, res, next) => {
    
    fs.readFile('companies.json', (err,content) => {
        if(err) throw err;
        let database = JSON.parse(content);
        let taken = false;
        database.companies.forEach(company => {
            if(req.body.username === company.username){
                taken = true;
                res.send();
            }
        });
        if(!taken){
            let newCompany = {
                username: req.body.username,
                password: req.body.password,
                customers: [],
                products: [],
                stores: []
            }
            res.locals.company = newCompany;
            res.locals.database = database;
            next();
        };
    });

},addData)

app.post('/login',(req, res, next) => {
    fs.readFile('companies.json', (err,content) => {
        if(err) throw err;
        let database = JSON.parse(content);
        let found = false;
        database.companies.forEach(company => {
            if(req.body.username === company.username && req.body.password === company.password){
                found = true;
                res.send(JSON.stringify(company));
            }
        });
        if(!found){
            res.status(210).send();
        }
    });
})
app.use('/company', companyRouter);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)})