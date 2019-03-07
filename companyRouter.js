const express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname, 'public/company.html'));
});

module.exports = router;