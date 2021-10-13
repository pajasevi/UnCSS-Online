import { NextApiHandler } from "next";
import uncss from "uncss";

const uncssPromise = (html: string, css: string): Promise<string> =>
  new Promise((resolve, reject) => {
    uncss(
      html,
      {
        raw: css,
        banner: false,
        ignoreSheets: [/./],
      },
      (error: Error, output: string) => {
        if (error) return reject(error);

        return resolve(output);
      }
    );
  });

type Response = { outputCss: string } | { error: string }

const handler: NextApiHandler<Response> = async (req, res) => {
  const data = req.body;

  try {
    if (!data.inputHtml) throw new Error("Cannot process empty HTML");
    if (!data.inputCss) throw new Error("Cannot process empty CSS");

    const html = data.inputHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    const result = await uncssPromise(html, data.inputCss);

    res.status(200).json({ outputCss: result });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  }
};

export default handler;
