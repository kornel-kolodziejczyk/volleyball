import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl-PL">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="drawer"></div>
          <div id="overlay"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
