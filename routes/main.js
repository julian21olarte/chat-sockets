'use strict';

var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  /*console.log('entra al get');
  if(!req.session.nickname) {
    console.log('no hay session');
    res.redirect('/login');
  }
  else {
    console.log('si hay session');
    res.render('partials/main', {'nickname': req.session.nickname}); 
  }
  */

  res.render('partials/main');
});






router.post('/', (req, res, next) => {
  console.log('entra al post');
  req.session.nickname = req.query.nickname;
  res.send(req.session.nickname);

});



module.exports = router;
