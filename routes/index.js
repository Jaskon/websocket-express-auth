const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/health', (req, res) => {
  res.send('Works!');
});


/* GET home page */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;
