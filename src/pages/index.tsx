import React from 'react'
import { useAuth } from '../library/auth'
import { Button, Stack } from '@chakra-ui/react'
import fetcher from '../utilitaries/fetcher'
import useSWR from 'swr'
import Header from '../landing-page/Header'
import Home from '../landing-page/Home'

const App = () => {
  const auth = useAuth()

  const {
    user,
    signInWithGoogle,
    signOut
  } = auth

  const { data } = useSWR(user ? ['/api/store', user.token] : null, fetcher)

  // if (!user) {
  //   return (
  //       <>
  //         <Header/>
  //
  //       </>
  //   )
  // }
  //
  // if (data && data.store) {
  //   return (
  //     <>
  //       <Header/>
  //       <Button as={'a'} href={'/dashboard'}>ver sua loja</Button>
  //       <Button onClick={signOut}>sair</Button>
  //     </>
  //   )
  // }

  return (
    <>
      <Header/>
      <Stack marginTop={8}>
        <Home/>
      </Stack>
    </>
  )
}

export default App
