import React from 'react'
import { Button } from '@chakra-ui/react'
import { ButtonProps } from '@chakra-ui/button'

const GradientButton = (props: ButtonProps) => {
  return (
      <Button
          variant="solid"
          size="md"
          padding={5}
          borderRadius={0}
          color="#333"
          fontWeight="bold"
          textAlign="center"
          fontFamily="Yusei Magic"
          textTransform={'uppercase'}
          bgGradient="linear-gradient(60deg, orange.500 0%, yellow.400 100%)"
          _hover={{
            bgGradient: 'linear-gradient(20deg, #DD6B20 0%, #F6AD55 100%)'
          }}
          {...props}
      >
        {props.children}
      </Button>
  )
}

export default GradientButton
