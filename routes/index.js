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

  const name = uuid.v1();

  fs.writeFileSync('temp/' + name + '.html', req.body.inputHtml);
  fs.writeFileSync('temp/' + name + '.css', req.body.inputCss);

  uncss(['temp/' + name + '.html'], {
    stylesheets: [name + '.css'],
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

    fs.unlink('temp/' + name + '.html');
    fs.unlink('temp/' + name + '.css');
  });
});

module.exports = router;
