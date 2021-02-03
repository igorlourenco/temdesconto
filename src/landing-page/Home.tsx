import React from 'react'
import {
  Stack,
  Image,
  Heading,
  Box,
  Link
} from '@chakra-ui/react'
import LoginButton from '../components/LoginButton'
import { BsArrowRightShort } from 'react-icons/bs'

const Home = () => (
  <Box justifySelf={'center'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <Stack
      spacing={-5}
      flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
      marginTop={15}
      justifyContent="space-around"
      alignItems="center"
      width={['100%', '100%', '90%', '85%']}
      p={5}
    >
      <Stack spacing={5} justifyContent="space-around" alignItems="flex-start">
        <Heading fontSize={[33, 39, 47, 57]} color={'#020E35'} fontFamily={'Baloo Chettan 2'}>
          Quer aumentar sua base de clientes e melhorar a relação com eles?
        </Heading>
        <Stack justifyContent="center" spacing={5}>
          <LoginButton rightIcon={<Box size={20} as={BsArrowRightShort}/>}>
            Sim! quero começar agora
          </LoginButton>
          <Link fontSize={'sm'}>Como funciona o TemDesconto? 🤔</Link>
        </Stack>
      </Stack>
      <Image
        height={'100%'}
        width={['100%', '100%', '50%', '50%']}
        src={'/home_illustration.svg'}
      />
    </Stack>
  </Box>
)

export default Home
