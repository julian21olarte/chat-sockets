var express = require('express');
 router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('si llega al login mothefucap');
  res.render('partials/login', {'title': 'CHAT SOCKETS'});
});

module.exports = router;
