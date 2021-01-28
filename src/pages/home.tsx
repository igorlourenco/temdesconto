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
        Quero cadastrar meu estabelecimento!
      </Button>
    )
  }

  return (
    <Button as={'a'} href={'/cadastrar-loja'}>Continar o cadastro ---3</Button>
  )
}

export default Home
