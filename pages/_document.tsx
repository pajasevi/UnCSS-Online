import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <meta name="description" content="Simply UnCSS your styles online!" />
          <meta name="theme-color" content="#9b4dca" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="UnCSS Online!" />
          <meta property="og:description" content="Simply UnCSS your styles online!" />
          <meta property="og:url" content="http://uncss-online.com" />
          <meta property="og:image" content="http://uncss-online.com/static/img/sharing.png" />

          <meta name="twitter:site" content="@pajasevi" />
          <meta name="twitter:title" content="UnCSS Online!" />
          <meta name="twitter:description" content="Simply UnCSS your styles online!" />
          <meta name="twitter:url" content="http://uncss-online.com" />
          <meta name="twitter:image" content="http://uncss-online.com/static/img/sharing.png" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic&display=swap"
          />
          <link rel="icon" href="/static/img/favicon.ico" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
         (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-81909941-1', 'auto');
          ga('send', 'pageview');
      `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
