import React from 'react'
import { useAuth } from '../library/auth'
import { Button, FormControl, FormLabel, Input, Select, Stack, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { businessCategories } from '../consts'
import { createStore } from '../library/database-client'
import { useRouter } from 'next/router'
import fetcher from '../utilitaries/fetcher'
import useSWR from 'swr'

const NewStore = () => {
  const router = useRouter()
  const auth = useAuth()
  const {
    register,
    handleSubmit
  } = useForm()

  const {
    user,
    signInWithGoogle,
    signOut
  } = auth

  const { data } = useSWR(user ? ['/api/store', user.token] : null, fetcher)

  const handleCreateStore = async (storeData) => {
    const newStore = {
      owner: user.name,
      ownerId: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      ...storeData
    }

    await createStore(newStore)
    await router.push('/dashboard')
  }

  if (data && data.store) {
    return (
      <>
        <Button as={'a'} href={'/dashboard'}>ver sua loja</Button>
        <Button onClick={signOut}>sair</Button>
      </>
    )
  }

  if (!user) {
    return (
      <Button colorScheme={'teal'} onClick={signInWithGoogle}>
        Quero cadastrar meu estabelecimento!
      </Button>
    )
  }

  return (
    <>
      <Text>Proprietário: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Stack as={'form'} onSubmit={handleSubmit(handleCreateStore)}>
        <FormControl>
          <FormLabel>Nome da loja</FormLabel>
          <Input name={'storeName'} ref={register({ required: 'Required' })}/>
        </FormControl>

        <FormControl>
          <FormLabel>Telefone</FormLabel>
          <Input name={'phone'} ref={register({ required: 'Required' })}/>
        </FormControl>
        <FormControl>
          <FormLabel color={'teal.900'}>Qual é a categoria da loja?</FormLabel>
          <Select name={'category'} ref={register({ required: 'Required' })}>
            {
              businessCategories.map((businessCategory, index) => (
                <option key={index} value={businessCategory.value}>{businessCategory.label}</option>
              ))
            }
          </Select>
        </FormControl>
        <Button type={'submit'}>Finalizar cadastro</Button>
      </Stack>
    </>
  )
}

export default NewStore
