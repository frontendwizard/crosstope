import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import { PMHC } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type FormValues = Omit<PMHC, 'complex_code'>

const NewPmhcPage: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <Container maxW="container.lg" as="main">
      <Link href="/">
        <IconButton
          as="a"
          aria-label="back to home page"
          icon={<ArrowLeftIcon />}
        />
      </Link>
      <Stack spacing="8">
        <Heading>Register new PMHC</Heading>
        <form onSubmit={onSubmit}>
          <Stack spacing="2">
            <FormControl>
              <FormLabel>Sequence</FormLabel>
              <Input {...register('sequence')} />
              <FormHelperText>e.g. YRLACNCVED</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Epitope id by iedb</FormLabel>
              <Input {...register('epitope_id_by_iedb')} />
            </FormControl>
            <FormControl>
              <FormLabel>IEDB link</FormLabel>
              <Input {...register('link_epitope_id_by_iedb')} />
            </FormControl>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}

export default NewPmhcPage
