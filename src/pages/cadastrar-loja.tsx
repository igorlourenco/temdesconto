import React, { useRef, useState } from 'react'
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

  const inputUploader = useRef(null)

  const [phoneIsWhatsapp, setPhoneIsWhatsapp] = useState(true)
  const [haveAnotherNumberWhatsapp, setHaveAnotherNumberWhatsapp] = useState(false)

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
    if (storeData.whatsapp === '') {
      storeData.whatsapp = storeData.phone
    }

    const newStore = {
      owner: user.name,
      ownerId: user.uid,
      email: user.email,
      logo: storeData.logo,
      createdAt: new Date().toISOString(),
      ...storeData
    }

    console.log(newStore)

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

  const handleUploadLogo = () => {
    inputUploader.current.click()
  }

  return (
      <Stack minHeight={'100vh'} justifyContent={'center'} alignItems="center" spacing={5} padding={10}>
        <Stack maxWidth={'879px'} width={['90vw', '90vw', '70vw', '70vw']} spacing={8} as={'form'}
               onSubmit={handleSubmit(handleCreateStore)}>
          <Heading size={'md'} fontWeight={'bold'}>
            {`Olá, ${user.name} vamos prosseguir com o cadastro do seu
            estabelecimento. É grátis!`}
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
            <Input borderColor={'orange.500'} name={'storeName'} ref={register({ required: 'Required' })}/>
          </FormControl>
          <FormControl>
            <FormLabel color={'teal.900'}>Em qual das categorias abaixo seu estabelecimento melhor se encaixa?</FormLabel>
            <Select placeholder={'Selecione uma categoria'} borderColor={'orange.500'} name={'category'} ref={register({ required: 'Required' })}>
              {
                businessCategories.map((businessCategory, index) => (
                  <option key={index} value={businessCategory.value}>{businessCategory.label}</option>
                ))
              }
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Por meio de que telefone seus clientes podem entrar em contato?</FormLabel>
            <Input borderColor={'orange.500'} name={'phone'} ref={register({ required: 'Required' })}/>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb={'0'}>
              Esse telefone é WhatsApp?
            </FormLabel>
            <Switch size="sm"
                    colorScheme="orange"
                    defaultChecked={phoneIsWhatsapp}
                    onChange={() => setPhoneIsWhatsapp(!phoneIsWhatsapp)}
            />
          </FormControl>
          <FormControl display={phoneIsWhatsapp ? 'none' : 'flex'} alignItems="center">
            <FormLabel mb={'0'}>
              Você tem outro número, que seja WhatsApp?
            </FormLabel>
            <Switch size="sm"
                    colorScheme="orange"
                    defaultChecked={haveAnotherNumberWhatsapp}
                    onChange={() => setHaveAnotherNumberWhatsapp(!haveAnotherNumberWhatsapp)}
            />
          </FormControl>
          <FormControl display={haveAnotherNumberWhatsapp ? 'block' : 'none'}>
            <FormLabel>Qual é seu WhatsApp?</FormLabel>
            <Input borderColor={'orange.500'} name={'whatsapp'} ref={register({ required: false })}/>
          </FormControl>
          <FormControl>
            <Button variant={'outline'} colorScheme="orange" onClick={handleUploadLogo}>
              Faça upload da logo do seu estabelecimento
            </Button>
            <Input style={ { display: 'none' } } type={'file'} name={'logo'} ref={
              (event) => {
                register(event, { required: 'Required' })
                inputUploader.current = event
              }
            }/>
            <FormHelperText>Pro visual ficar legal, recomendamos que a imagem tenha tamanho de 500x500 pixels</FormHelperText>
            <FormHelperText><Link href={'https://www.canva.com/'} isExternal>Não tem logo? Crie uma grátis.</Link></FormHelperText>
          </FormControl>
          <Button colorScheme={'orange'} type={'submit'}>Finalizar cadastro</Button>
        </Stack>
      </Stack>
  )
}

export default NewStore
