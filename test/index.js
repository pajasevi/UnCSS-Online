var env = process.env.NODE_ENV || 'test';

var request = require('supertest');
var assert = require('assert');
var cheerio = require('cheerio');
var app = require('../app');

function assertEmptyInput(input) {
  assert.equal(input.val(), '');
}

describe('index page', function() {
  it('respond with empty form', function(done) {
    request(app)
      .get('/')
      .expect(function(res) {
        var $ = cheerio.load(res.text);
        assertEmptyInput($('#inputHtml'));
        assertEmptyInput($('#inputCss'));
        assertEmptyInput($('#outputCss'));
      })
      .expect(200, done);
  });
});



describe('result page', function() {
  var inputHtml = "<html><body><div class='ryba'></div></body></html>";
  var inputCss = ".ryba {padding-top: 5px;}\n.titanic {float: none}";
  var expectedOutputCss = ".ryba {padding-top: 5px;}";

  it('respond with shortended CSS', function(done) {
    request(app)
      .post('/uncss')
      .field('inputHtml', inputHtml)
      .field('inputCss', inputCss)
      .field('type', 'fetch')
      .expect(function(res) {
        assert.equal(res.body.outputCss, expectedOutputCss);
      })
      .expect(200, done);
  });
});
