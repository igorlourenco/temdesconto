import { Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const ProblemToBeSolved = () => {
  return (
    <Stack spacing={4} flexDirection={['column-reverse', 'column-reverse', 'row', 'row']} alignItems={'center'} justifyContent={'center'} padding={5}>
      <Image
        width={['100%', '80%', '40%', '35%']}
        src={'/problem_to_be_solved_illustration.svg'}
        margin={5}
      />
      <Stack justifyContent={'space-around'}>
        <Heading>O que o TemDesconto resolve (ou melhora)?</Heading>
        <Text>
          - No cenário atual, muitos negócios (principalmente os físicos) sentem dificuldades em relação ao movimento de
          clientes; claramente, isso afeta diversas áreas do negócio, gerando resultados negativos;
          - Outro caso ocorre quando o cliente consome uma ou duas vezes no estabelecimento, mas não sente incentivo
          para
          ser fiel àquele negócio, indo consumir no concorrente na próxima vez que tem necessidade.
        </Text>
      </Stack>
    </Stack>
  )
}

export default ProblemToBeSolved
