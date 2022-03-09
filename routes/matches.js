const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');

router.get('/update', (req, res) => {
    res.sendFile(path.resolve('static/views/update.html'))
});

router.post('/update', (req, res) => {
    
});

module.exports = router;