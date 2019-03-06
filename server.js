const express = require('express');
const path = require('path');

var app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)})