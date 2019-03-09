const express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();


router.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/company.html'));
});
router.get('/customers', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/customer.html'));
});
router.post('/customers', (req,res,next) => {
    console.log('hello');
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let customer = {
            id: company.customers.length,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: parseInt(req.body.age),
            spent: parseInt(req.body.spent),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].customers.push(customer);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company));
    });
});

router.delete('/customers', (req,res,next) => {
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);
        
        let company = dataBase.companies.filter((company) => {
            if(company.username === req.query.username){
                return company;
            }
        })[0];

        let companyIndex = dataBase.companies.indexOf(company);
        console.log(req.query.customer);
        dataBase.companies[companyIndex].customers.splice(parseInt(req.query.customer),1);
        console.log(dataBase.companies[companyIndex].customers);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))

        
    })
});

router.get('/products', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/product.html'));
});
router.get('/stores', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/store.html'));
});

module.exports = router;