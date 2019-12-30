import React from "react";
import App from "next/app";
import Head from "next/head";

import "normalize.css/normalize.css";
import "milligram/dist/milligram.min.css";

import "../main.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>UnCSS Online!</title>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
