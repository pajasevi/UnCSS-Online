const { send, json } = require("micro");
const uncss = require("uncss");
const serializeError = require("serialize-error");
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

module.exports = async (req, res) => {
  const data = await json(req, { limit: "14mb" });

  try {
    if (!data.inputHtml) throw new Error("Cannot process empty HTML");
    if (!data.inputCss) throw new Error("Cannot process empty CSS");

    const html = data.inputHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    uncss(
      html,
      {
        raw: data.inputCss,
        banner: false,
        ignoreSheets: [/./]
      },
      (error, output) => {
        Sentry.captureException(error);

        send(res, error ? 400 : 200, {
          outputCss: output,
          error: serializeError(error)
        });
      }
    );
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);

    send(res, 400, {
      error: serializeError(error)
    });
  }
};
