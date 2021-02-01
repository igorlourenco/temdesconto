import React from 'react'
import { useAuth } from '../library/auth'
import { Button } from '@chakra-ui/react'
import fetcher from '../utilitaries/fetcher'
import useSWR from 'swr'

const App = () => {
  const auth = useAuth()

  const {
    user,
    signInWithGoogle,
    signOut
  } = auth

  const { data } = useSWR(user ? ['/api/store', user.token] : null, fetcher)

  if (!user) {
    return (
      <Button colorScheme={'teal'} onClick={signInWithGoogle}>
        Quer cadastrar sua loja? Faça Login.
      </Button>
    )
  }

  if (data && data.store) {
    return (
      <>
        <Button as={'a'} href={'/dashboard'}>ver sua loja</Button>
        <Button onClick={signOut}>sair</Button>
      </>
    )
  }

  return (
    <>
      <Button as={'a'} href={'/cadastrar-loja'}>Cadastre seu estabelecimento</Button>
      <Button onClick={signOut}>sair</Button>
    </>
  )
}

export default App
