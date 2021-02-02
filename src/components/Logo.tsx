import React from 'react'
import { Image, ImageProps } from '@chakra-ui/react'

const Logo = (props: ImageProps) => {
  return (
      <Image src={'/logonome.svg'} {...props}/>
  )
}

export default Logo
