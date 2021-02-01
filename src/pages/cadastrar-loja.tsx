import React from 'react'
import { useAuth } from '../library/auth'
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input, Link, Select, Stack, Switch, Text } from '@chakra-ui/react'
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
      logo: storeData.logo,
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
      <Stack minHeight={'100vh'} justifyContent={'center'} alignItems="center" spacing={5} padding={10}>
        <Stack maxWidth={'879px'} width={['90vw', '90vw', '70vw', '70vw']} spacing={8} as={'form'}
               onSubmit={handleSubmit(handleCreateStore)}>
          <Heading size={'md'} fontWeight={'bold'}>Olá, {user.name} vamos prosseguir com o cadastro do seu
            estabelecimento?
            É grátis!
          </Heading>
          <Stack alignItems={'flex-start'}>
            <Text fontWeight={'bold'}>
              {`O email relacionado à sua conta é "${user.email}".`} &nbsp;&nbsp;
            </Text>
            <Button colorScheme="orange" variant="link" size={'xs'} onClick={signOut}>
              Desejo trocar o email da minha conta.
            </Button>
          </Stack>
          <FormControl>
            <FormLabel>Qual é o nome do seu estabelecimento?</FormLabel>
            <Input name={'storeName'} ref={register({ required: 'Required' })}/>
          </FormControl>
          <FormControl>
            <FormLabel>Por meio de que telefone seus clientes podem entrar em contato?</FormLabel>
            <Input name={'phone'} ref={register({ required: 'Required' })}/>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb={'0'}>
              Esse telefone é WhatsApp?
            </FormLabel>
            <Switch id="email-alerts" size="sm" colorScheme="orange"/>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb={'0'}>
              Você tem outro número, que seja WhatsApp?
            </FormLabel>
            <Switch id="email-alerts" size="sm" colorScheme="orange" defaultChecked={true}/>
          </FormControl>
          <FormControl>
            <FormLabel>Faça upload da logo do seu estabelecimento</FormLabel>
            <Input type={'file'} name={'logo'} ref={register({ required: 'Required' })}/>
            <FormHelperText>Pro visual ficar legal, recomendamos que a imagem tenha tamanho de 500x500 pixels</FormHelperText>
            <FormHelperText><Link href={'https://www.canva.com/'} isExternal>Não tem logo? Crie uma grátis.</Link></FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel color={'teal.900'}>Em qual das categorias abaixo seu estabelecimento melhor se encaixa?</FormLabel>
            <Select name={'category'} ref={register({ required: 'Required' })}>
              {
                businessCategories.map((businessCategory, index) => (
                    <option key={index} value={businessCategory.value}>{businessCategory.label}</option>
                ))
              }
            </Select>
          </FormControl>
          <Button colorScheme={'orange'} type={'submit'}>Finalizar cadastro</Button>
        </Stack>
      </Stack>
  )
}

export default NewStore
