const express = require('express');
const router = express.Router();
const uncss = require('uncss');
const fs = require('fs');
const multer  = require('multer');
const upload = multer();
const uuid = require('node-uuid');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'UnCSS Online!',
    description: 'Simply UnCSS your styles online!'
  });
});

router.get('/uncss', function(req, res) {
  res.redirect('/');
});

router.post('/uncss', upload.array(), function(req, res) {
  uncss(req.body.inputHtml, {
    raw: req.body.inputCss,
    javascriptEnabled: false,
    banner: false
  }, function(error, output) {
    if (req.body.type === 'fetch') {
      res.json({
        outputCss: output,
        error: error
      });
    }
    else {
      res.render('index', {
        title: 'UnCSS Online!',
        description: 'Simply UnCSS your styles online!',
        inputHtml: req.body.inputHtml,
        inputCss: req.body.inputCss,
        outputCss: output,
        error: {
          name: error.name,
          message: error.reason + '; Line:' + (error.line -1) + '; Column:' + error.column
        }
      });
    }
  });
});

module.exports = router;
