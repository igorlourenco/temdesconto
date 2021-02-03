import React from 'react'
import { useAuth } from '../library/auth'
import GradientButton from './GradientButton'
import { ButtonProps } from '@chakra-ui/button'

const LoginButton = (props: ButtonProps) => {
  const { signInWithGoogle } = useAuth()

  return (
      <GradientButton onClick={signInWithGoogle} {...props}>
        {props.children}
      </GradientButton>
  )
}

export default LoginButton
