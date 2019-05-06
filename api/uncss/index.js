const express = require('express');
const helmet = require('helmet');
const assert = require('assert');
const uncss = require('uncss');
const multer  = require('multer');

const upload = multer();

const app = express();

app.use(helmet());

app.post('*', upload.array(), (req, res) => {
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

module.exports = app;
