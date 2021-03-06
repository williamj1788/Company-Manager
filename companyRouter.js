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
        dataBase.companies[companyIndex].customers.splice(parseInt(req.query.customer),1);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))

        
    })
});

router.put('/customers', (req,res,next) => {
    fs.readFile('companies.json', (err,content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let customer = {
            id: parseInt(req.body.id),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: parseInt(req.body.age),
            spent: parseInt(req.body.spent),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].customers.splice(parseInt(req.body.id),1, customer);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))


    })
})

router.get('/products', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/product.html'));
});

router.post('/products', (req,res,next) => {
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let product = {
            id: company.products.length,
            name: req.body.name,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].products.push(product);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company));
    });
});

router.delete('/products', (req,res,next) => {
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);
        
        let company = dataBase.companies.filter((company) => {
            if(company.username === req.query.username){
                return company;
            }
        })[0];

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].products.splice(parseInt(req.query.product),1);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))

        
    })
});

router.put('/products', (req,res,next) => {
    fs.readFile('companies.json', (err,content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let product = {
            id: parseInt(req.body.id),
            name: req.body.name,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].products.splice(parseInt(req.body.id),1, product);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))


    })
})

router.get('/stores', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/store.html'));
});

router.post('/stores', (req,res,next) => {
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let store = {
            id: company.stores.length,
            name: req.body.name,
            revenue: parseInt(req.body.revenue),
            expense: parseInt(req.body.expense),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].stores.push(store);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company));
    });
});

router.delete('/stores', (req,res,next) => {
    fs.readFile('companies.json', (err, content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);
        
        let company = dataBase.companies.filter((company) => {
            if(company.username === req.query.username){
                return company;
            }
        })[0];

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].stores.splice(parseInt(req.query.store),1);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))
        
    })
});

router.put('/stores', (req,res,next) => {
    fs.readFile('companies.json', (err,content) => {
        if(err) throw err;
        let dataBase = JSON.parse(content);

        let company = dataBase.companies.filter((company) => {
            if(company.username === req.body.username){
                return company;
            }
        })[0];

        let store = {
            id: parseInt(req.body.id),
            name: req.body.name,
            revenue: parseInt(req.body.revenue),
            expense: parseInt(req.body.expense),
        }

        let companyIndex = dataBase.companies.indexOf(company);
        dataBase.companies[companyIndex].stores.splice(parseInt(req.body.id),1, store);
        fs.writeFile('companies.json', JSON.stringify(dataBase,null,2), err => {
            if(err) throw err;
        })
        res.send(JSON.stringify(company))


    })
})

module.exports = router;