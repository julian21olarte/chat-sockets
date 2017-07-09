'use strict';

var express = require('express');
var router = express.Router();


router.post('/', (req, res, next) => {
  console.log('si llega');
  res.send(req.session.nickname);

});



module.exports = router;
