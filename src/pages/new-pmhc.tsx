import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  FormState,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from 'react-hook-form'
import { PMHC } from '@prisma/client'

type FormValues = Omit<PMHC, 'complex_code'>

function TextInput({
  register,
  formState,
  fieldKey,
  label,
  rules,
  helperText,
  inputProps,
}: {
  register: UseFormRegister<FormValues>
  formState: FormState<FormValues>
  fieldKey: keyof FormValues
  label: string
  rules: RegisterOptions<FormValues>
  helperText?: string
  inputProps?: React.ComponentProps<typeof Input>
}) {
  return (
    <FormControl isInvalid={Boolean(formState.errors[fieldKey])}>
      <FormLabel>{label}</FormLabel>
      <Input autoFocus {...register(fieldKey, rules)} {...inputProps} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {formState.errors[fieldKey] && formState.errors[fieldKey]?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

const NewPmhcPage: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      structure_type_id: 'Model (D1-EM-D2)',
    },
  })
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <Container maxW="container.lg" as="main">
      <Link href="/">
        <IconButton aria-label="back to home page" icon={<ArrowLeftIcon />} />
      </Link>
      <Stack spacing="8">
        <Heading>Register new PMHC</Heading>
        <form onSubmit={onSubmit}>
          <Stack spacing="6" pb="10">
            <SimpleGrid columns={2} spacing="4">
              <TextInput
                register={register}
                formState={formState}
                fieldKey="sequence"
                label="Sequence"
                rules={{ required: 'Sequence is required' }}
                helperText="e.g. YRLACNCVED"
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="epitope_id_by_iedb"
                label="Epitope id by iedb"
                rules={{ required: 'Epitope id is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="link_epitope_id_by_iedb"
                label="IEDB link"
                rules={{ required: 'Link to epitope id on iedb is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="structure_type_id"
                label="Structure Type"
                rules={{ required: 'Structure type is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="link_para_structure_type"
                label="Link to Structure Type"
                rules={{ required: 'Link to structure type is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="structure_source"
                label="Source Structure"
                rules={{ required: 'Source structure is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="mhc_allele_id"
                label="MHC Allele id"
                rules={{ required: 'MHC Allele is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="source_organism"
                label="Source Organism"
                rules={{ required: 'Source organism is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="immunological_background_id"
                label="Immunological Background"
                rules={{ required: 'Immunological background is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="source_protein"
                label="Source Protein"
                rules={{ required: 'Source Protein is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="link_para_source_protein"
                label="Link to Source Protein"
                rules={{ required: 'Link to Source Protein is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="reference"
                label="Reference"
                rules={{ required: 'Reference is required' }}
              />
              <TextInput
                register={register}
                formState={formState}
                fieldKey="link_para_reference"
                label="Reference Link"
                rules={{ required: 'Reference Link is required' }}
              />
            </SimpleGrid>
            <Button
              variant="solid"
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}

export default NewPmhcPage
