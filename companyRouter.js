const express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/company.html'));
});
router.get('/customers', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/customer.html'));
});
router.get('/products', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/product.html'));
});
router.get('/stores', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/store.html'));
});

module.exports = router;