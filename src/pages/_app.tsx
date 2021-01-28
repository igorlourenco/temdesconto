import React from 'react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../library/auth'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../style/theme'

function MyApp ({
  Component,
  pageProps
}: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
