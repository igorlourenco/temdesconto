import React from 'react'
import Head from 'next/head'

const App = () => {
  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
          <title>TemDesconto - Apresentação</title>

          <style type="text/css">
            {'html{ margin: 0; height: 100%; overflow: hidden;  padding: 15px} iframe{ position: absolute; left:0; right:0; bottom:0; top:0; border:0; } '}
          </style>
        </Head>
          <iframe width="100%" height="100%" frameBorder="0"
                  src="/temdesconto.html"/>

      </>
  )
}

export default App
