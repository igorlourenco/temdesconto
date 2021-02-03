import React from 'react'
import { Stack } from '@chakra-ui/react'
import Header from '../landing-page/Header'
import Home from '../landing-page/Home'
import ProblemToBeSolved from '../landing-page/ProblemToBeSolved'

const App = () => {
  return (
    <>
      <Header/>
      <Stack marginTop={6} spacing={12}>
        <Home/>
        <ProblemToBeSolved/>
      </Stack>
    </>
  )
}

export default App
