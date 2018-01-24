var path = require('path');
var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploading  = multer ({
  dest : path.resolve(__dirname + "../public/uploads/"),
  limits: { fileSize: 1000000, files : 1 }
})

console.log(uploading);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', uploading.array(), function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  console.log(req.files);

  res.send(200, 'xxx');
})

module.exports = router;
