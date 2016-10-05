var express = require('express');
var router = express.Router();
var uncss = require('uncss');
var fs = require('fs');
var multer  = require('multer');
var upload = multer();
var uuid = require('node-uuid');

/* GET home page. */

// TODO temporary fix of https://github.com/giakki/uncss/pull/259
function removeBanner(uncssedCss) {
  return uncssedCss.split("\n").slice(1).join("\n");
}

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

  var name = uuid.v1();

  fs.writeFileSync('temp/' + name + '.html', req.body.inputHtml);
  fs.writeFileSync('temp/' + name + '.css', req.body.inputCss);

  uncss(['temp/' + name + '.html'], {
    stylesheets: [name + '.css'],
    javascriptEnabled: false
  }, function(error, output) {
    if (req.body.type === 'fetch') {
      res.json({
        outputCss: removeBanner(output),
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
