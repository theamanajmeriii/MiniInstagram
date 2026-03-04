var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Root working');
});

// Health check endpoint
router.get('/health', function(req, res) {
  res.json({ status: 'ok' });
});

module.exports = router;
