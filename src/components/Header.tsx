import React from 'react'
import { Box, Heading, Stack, Link, IconButton, useDisclosure, StackProps } from '@chakra-ui/react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import LoginButton from './LoginButton'

interface MenuItemProps {
  label: string,
  link: string
}

const navigation = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Sobre',
    link: '#sobre'
  },
  {
    label: 'Nossos Serviços',
    link: '#nossos-servicos'
  }
]

const MenuItem = (props: MenuItemProps) => {
  return (
      <Link textTransform={'uppercase'} href={props.link} textAlign="center" fontWeight="bold">
        {props.label}
      </Link>
  )
}

const MenuContainer = (props: StackProps) => {
  return (
      <Stack
          spacing={5}
          justifyContent="flex-end"
          alignItems="center"
          p={4}
          marginRight={12}
          width={'100%'}
          z-index={-9999}
          position={'relative'}
          boxShadow="2xl"
          {...props}
      >
        {props.children}
      </Stack>
  )
}

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <Stack justifyContent={'flex-end'}>
        <MenuContainer display={{ md: !isOpen ? 'none' : 'block' }}>
          <Stack alignItems={'flex-end'}>
            <IconButton
                backgroundColor={'transparent'}
                _hover={{ backgroundColor: 'transparent' }}
                color={'#020E35'}
                size={'lg'}
                display={{ md: !isOpen ? 'none' : 'inherit' }}
                icon={isOpen ? <Box size={32} as={HiX}/> : <Box size={32} as={HiMenuAlt3}/>}
                aria-label={'Open Menu'}
                onClick={isOpen ? onClose : onOpen}
            />
          </Stack>
        </MenuContainer>
        <MenuContainer isInline display={{ base: 'none', md: 'flex' }}>
          {
            navigation.map((item: MenuItemProps, index) => (
                <MenuItem key={index} label={item.label} link={item.link}/>
            ))
          }
          <LoginButton>Entre em Contato</LoginButton>
        </MenuContainer>

        {isOpen
          ? (
                <Box pb={4}>
                  <MenuContainer>
                    {
                      navigation.map((item: MenuItemProps, index) => (
                          <MenuItem key={index} label={item.label} link={item.link}/>
                      ))
                    }
                    <LoginButton>Entre em Contato</LoginButton>
                  </MenuContainer>
                </Box>
            )
          : null}
      </Stack>
  )
}

const Header = () => {
  return (
      <Stack
          spacing={0}
          justifyContent="flex-start"
          isInline
      >
        <Heading marginLeft={22} marginTop={5} zIndex={3} position={'absolute'} width={'50%'}>TemDesconto.club</Heading>
        <Stack spacing={0} width={'100%'}>
          <Menu/>
        </Stack>
      </Stack>
  )
}

export default Header
