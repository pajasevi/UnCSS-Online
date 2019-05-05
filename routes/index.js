const express = require('express');
const assert = require('assert');
const router = express.Router();
const uncss = require('uncss');
const multer  = require('multer');
const upload = multer();

/* GET home page. */

router.get('/', (req, res) => {
  res.render('index', {
    title: 'UnCSS Online!',
    description: 'Simply UnCSS your styles online!'
  });
});

router.post('/api/uncss', upload.array(), (req, res) => {
  try {
    assert.ok(req.body.inputHtml, new Error('cannot process empty HTML'));
    assert.ok(req.body.inputCss, new Error('cannot process empty CSS'));

    const html = req.body.inputHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    uncss(html, {
      raw: req.body.inputCss,
      banner: false,
      ignoreSheets: [/./]
    }, (error, output) => {
      res.json({
        outputCss: output,
        error: error
      });
    });
  } catch (error) {
    console.error(error);

    res.json({
      error: error
    });
  }
});

module.exports = router;
