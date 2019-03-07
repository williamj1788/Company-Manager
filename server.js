const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var upload = multer();

var app = express();

const PORT = 3000;

// function checkData(req,res,next){
//     fs.readFile('companies.json',(err,content) => {
//         if(err) throw err;
//         let dataBase = JSON.parse(content);
//         let check = res.locals.callback(dataBase,data);
//         if(check === ''){
//             next();
//         }else{
//             res.send(check);
//         }
//     })
// }


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
app.post('/login', upload.none(),(req, res, next) => {
    console.log(req.body);
    res.redirect('/company');
})
app.get('/company', upload.none(),(req, res, next) => {
    console.log('served');
    res.sendFile(path.join(__dirname, 'public/company.html'));
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)})