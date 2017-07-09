'use strict';

var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {

  res.render('partials/main');
});






router.post('/', (req, res, next) => {
  console.log('entra al post');
  req.session.nickname = req.query.nickname;
  res.send(req.session.nickname);

});



module.exports = router;
