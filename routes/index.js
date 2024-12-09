const express = require('express');
const {handleNewShortURL} = require('../controllers');
const router = express.Router();

router.use('/',handleNewShortURL);

module.exports = router;