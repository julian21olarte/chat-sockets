var express = require('express');
 router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('partials/login', {'title': 'CHAT SOCKETS'});
});

module.exports = router;
