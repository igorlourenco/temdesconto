import React from 'react'
import { useAuth } from '../library/auth'
import { Button } from '@chakra-ui/react'

const Home = () => {
  const auth = useAuth()

  const {
    user,
    signInWithGoogle
  } = auth

  if (!user) {
    return (
      <Button colorScheme={'teal'} onClick={signInWithGoogle}>
        Quer cadastrar sua loja? Faça Login.
      </Button>
    )
  }

  return (
    <Button as={'a'} href={'/cadastrar-loja'}>Cadastre seu estabelecimento</Button>
  )
}

export default Home
