const { send, json } = require('micro');
const uncss = require('uncss');
const serializeError = require('serialize-error');

module.exports = async (req, res) => {
  const data = await json(req);

  try {
    if (!data.inputHtml) throw new Error('Cannot process empty HTML');
    if (!data.inputCss) throw new Error('Cannot process empty CSS');

    const html = data.inputHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    uncss(html, {
      raw: data.inputCss,
      banner: false,
      ignoreSheets: [/./]
    }, (error, output) => {
      send(res, error ? 400 : 200,{
        outputCss: output,
        error: error
      });
    });
  } catch (error) {
    console.error(error);

    send(res,400,{
      error: serializeError(error)
    });
  }
};
