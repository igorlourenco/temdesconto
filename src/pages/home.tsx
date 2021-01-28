import React, { useState } from 'react'
import { useAuth } from '../library/auth'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface LogonData {
  email: string
  password: string
  confirmPassword: string
}

const Home = () => {
  const auth = useAuth()
  const {
    register,
    handleSubmit
  } = useForm()

  const createUser = async (data: LogonData) => {
    const {
      email,
      password
    } = data
    return await auth.signInWithEmail(email, password)
  }

  return (
    <Stack as={'form'} onSubmit={handleSubmit(createUser)}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name={'email'} ref={register({ required: 'Required' })}
               placeholder="Entre com o email de trabalho"/>
      </FormControl>
      <FormControl>
        <FormLabel>Sua senha</FormLabel>
        <Input name={'password'} type={'password'} ref={register({ required: 'Required' })}
               placeholder="********"/>
      </FormControl>
      <Button colorScheme={'teal'} type={'submit'}>
        Começar
      </Button>
    </Stack>
  )
}

export default Home
