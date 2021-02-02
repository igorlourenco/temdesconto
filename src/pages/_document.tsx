import React from 'react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render () {
    return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap"
                          rel="stylesheet"/>
                  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
    )
  }
}

export default MyDocument
