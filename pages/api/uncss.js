import uncss from "uncss";
import serializeError from "serialize-error";
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_BE_DSN });

export default (req, res) => {
  const data = req.body;

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

        res.status(error ? 400 : 200).json({
          outputCss: output,
          error: error ? serializeError(error) : undefined
        });
      }
    );
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);

    res.status(400).json({
      error: serializeError(error)
    });
  }
};
