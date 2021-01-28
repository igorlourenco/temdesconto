import React from 'react'
import { useAuth } from '../library/auth'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface LogonData {
  email: string
  password: string
  confirmPassword: string
  businessType: string
  name: string
}

const Home = () => {
  const auth = useAuth()
  const {
    register,
    handleSubmit
  } = useForm()

  const createUser = async (data: LogonData) => {
    await auth.signInWithEmail(data)
    alert('cadastrado')
  }
  console.log(auth.user.token)
  return (
   <>
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
       <FormControl>
         <FormLabel>Nome da empresa</FormLabel>
         <Input name={'name'} type={'text'} ref={register({ required: 'Required' })}
                placeholder="minha empresa"/>
       </FormControl>
       <FormControl>
         <FormLabel>Tipo de negócio</FormLabel>
         <Input name={'businessType'} type={'text'} ref={register({ required: 'Required' })}
                placeholder="alimentação"/>
       </FormControl>
       <Button colorScheme={'teal'} type={'submit'}>
         Começar
       </Button>
     </Stack>
     {
       auth.user && (<Button onClick={auth.signOut}>sair</Button>)
     }
   </>
  )
}

export default Home
