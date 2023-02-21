var express = require('express');
var router = express.Router();

const Anuncio = require("../models/Anuncio");

/* GET home page. */

router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
