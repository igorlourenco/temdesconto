import React from 'react'
import { Button } from '@chakra-ui/react'
import { ButtonProps } from '@chakra-ui/button'

const GradientButton = (props: ButtonProps) => {
  return (
      <Button
          variant="solid"
          size="md"
          padding={3}
          borderRadius={0}
          color="#fffafa"
          fontWeight="bold"
          letterSpacing={1.005}
          textAlign="center"
          fontFamily="Baloo Chettan 2"
          shadow={'md'}
          textTransform={'uppercase'}
          bgGradient="linear-gradient(60deg, orange.500 0%, orange.400 100%)"
          _hover={{
            bgGradient: 'linear-gradient(20deg, orange.500 0%, orange.400 100%)'
          }}
          {...props}
      >
        {props.children}
      </Button>
  )
}

export default GradientButton
