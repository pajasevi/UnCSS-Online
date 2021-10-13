import { NextPage } from "next";
import React, { FormEvent, useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import axios from "axios";

const apiUrl = "/api/uncss";

const Homepage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [clipboardMessage, setClipboardMessage] = useState<string | null>(null);
  const [outputCss, setOutputCss] = useState<string>("");

  const clipboardButton = React.useRef<HTMLButtonElement>();
  const inputHtml = React.useRef<HTMLTextAreaElement>();
  const inputCss = React.useRef<HTMLTextAreaElement>();

  useEffect(() => {
    const clipboard = new ClipboardJS(clipboardButton.current);

    clipboard.on("success", () => {
      setClipboardMessage("Copied to your clipboard");
    });
    clipboard.on("error", () => {
      setClipboardMessage("Press Command+C to copy");
    });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      inputHtml: inputHtml.current.value,
      inputCss: inputCss.current.value,
    };

    try {
      if (!data.inputHtml) throw new Error("Cannot process empty HTML");
      if (!data.inputCss) throw new Error("Cannot process empty CSS");

      const response = await axios.post<{ outputCss: string }>(apiUrl, data);

      setOutputCss(response.data.outputCss);
      setError(null);
    } catch (error) {
      if (error?.response?.data?.error) {
        setError(Error(error.response.data.error));
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <header className="header">
        <h1>UnCSS Online!</h1>
        <p>
          <strong>Simply UnCSS your styles online!</strong>
        </p>
        <a href="https://github.com/pajasevi/UnCSS-Online" className="github-corner" aria-hidden="true">
          <svg
            width="64"
            height="64"
            viewBox="0 0 250 250"
            style={{
              fill: "#9b4dca",
              color: "#fff",
              position: "absolute",
              zIndex: 200,
              top: 0,
              border: 0,
              left: 0,
              transform: "scale(-1, 1)",
            }}
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style={{ transformOrigin: "130px 106px" }}
              className="octo-arm"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            />
          </svg>
        </a>
      </header>
      <main className="container">
        <h3>Usage:</h3>
        <ul>
          <li>Copy&amp;paste your HTML and CSS into boxes below</li>
          <li>Click button</li>
          <li>Wait for magic to happen</li>
          <li>
            Unused CSS{" "}
            <a href="https://www.youtube.com/watch?v=DgS4DD0CgHs" rel="noopener" target="_blank">
              is gone
            </a>
            , take the rest and use it!
          </li>
        </ul>

        {error && (
          <div className="error">
            <h5 className="error-name">{error.name}</h5>
            <div className="error-message">{error.message}</div>
          </div>
        )}

        <form id="uncss-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <label htmlFor="inputHtml">Your HTML</label>
              <textarea placeholder="Insert your HTML here" rows={20} name="inputHtml" id="inputHtml" ref={inputHtml} />
            </div>
            <div className="column">
              <label htmlFor="inputCss">Your CSS</label>
              <textarea placeholder="Insert your CSS here" rows={20} name="inputCss" id="inputCss" ref={inputCss} />
            </div>
          </div>
          <div className="text-center">
            <button
              id="submitButton"
              className={`button button-large ${loading ? "button-loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              UnCSS my styles
            </button>
          </div>
        </form>
        <div className="row">
          <div className="column column-80 column-offset-10">
            <label htmlFor="outputCss">Your shortened CSS</label>
            <textarea
              placeholder="Take your shortened CSS and use it!"
              rows={20}
              name="outputCss"
              id="outputCss"
              readOnly
              value={outputCss}
            />
          </div>
        </div>
        <div className="row">
          <div className="column text-center">
            <button
              className="button js-clipboard"
              data-clipboard-action="copy"
              data-clipboard-target="#outputCss"
              ref={clipboardButton}
            >
              Copy to clipboard
            </button>
            {clipboardMessage && <p id="js-clipboard-message">{clipboardMessage}</p>}
          </div>
        </div>

        <h3>Advanced usage</h3>
        <p>
          For advanced options please consider adding UnCSS to your devstack -{" "}
          <a href="https://github.com/ben-eb/gulp-uncss">Gulp</a>,{" "}
          <a href="https://github.com/addyosmani/grunt-uncss">Grunt</a>,{" "}
          <a href="https://github.com/RyanZim/postcss-uncss">PostCSS</a>.
        </p>

        <h3>What is this good for?</h3>
        <p>
          Do you have static 404 or 500 page, bundled styles for the whole site and you need only couple of CSS for
          these static pages to work? Well, here you have the tool for that. You're welcome.
        </p>
      </main>
      <footer className="footer clearfix">
        <div className="container">
          <span className="float-left">
            <a href="https://github.com/pajasevi/UnCSS-Online" rel="noreferrer noopener" target="_blank">
              Github
            </a>{" "}
            |{" "}
            <a href="https://github.com/uncss/uncss" rel="noreferrer noopener" target="_blank">
              UnCSS
            </a>
          </span>
          <span className="float-right">
            Made with &hearts; by{" "}
            <a href="https://twitter.com/pajasevi" rel="noreferrer noopener" target="_blank">
              @pajasevi
            </a>
          </span>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Homepage;
