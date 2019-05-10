const { send, json } = require('micro');
const assert = require('assert');
const uncss = require('uncss');

module.exports = async (req, res) => {
  const data = await json(req);

  try {
    assert.ok(data.inputHtml, new Error('cannot process empty HTML'));
    assert.ok(data.inputCss, new Error('cannot process empty CSS'));

    const html = data.inputHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    uncss(html, {
      raw: data.inputCss,
      banner: false,
      ignoreSheets: [/./]
    }, (error, output) => {
      send(res, 200,{
        outputCss: output,
        error: error
      });
    });
  } catch (error) {
    console.error(error);

    send(res,400,{
      error: error
    });
  }
};
