import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";

import "normalize.css/normalize.css";
import "milligram/dist/milligram.min.css";

import "../main.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>UnCSS Online!</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
