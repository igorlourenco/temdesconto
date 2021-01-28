import React from 'react'
import { useAuth } from '../library/auth'
import { Button, Text } from '@chakra-ui/react'

const NewStore = () => {
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
    <>
      <Text>Responsável pelo estabelecimento: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </>
  )
}

export default NewStore
