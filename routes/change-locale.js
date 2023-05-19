var express = require('express');
var router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;
  
  res.cookie('locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 *4
  });

  res.redirect(req.get('referer'));

})

module.exports = router;