import 'filepond/dist/filepond.min.css'

import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import type { inferProcedureInput } from '@trpc/server'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import type { TextInputProps } from '~/components/TextInput'
import { TextInput } from '~/components/TextInput'
import type { AppRouter } from '~/server/routers/_app'
import { trpc } from '~/utils/trpc'

type FormValues = inferProcedureInput<AppRouter['pmhc']['add']>

const fields: Pick<
  TextInputProps,
  'fieldKey' | 'label' | 'rules' | 'helperText'
>[] = [
  {
    fieldKey: 'sequence',
    label: 'Sequence',
    rules: { required: 'Sequence is required' },
    helperText: 'e.g. YRLACNCVED',
  },
  {
    fieldKey: 'epitope_id_by_iedb',
    label: 'Epitope id by iedb',
    rules: { required: 'Epitope id is required' },
  },
  {
    fieldKey: 'link_epitope_id_by_iedb',
    label: 'IEDB link',
    rules: { required: 'Link to epitope id on iedb is required' },
  },
  {
    fieldKey: 'epitope_position',
    label: 'Epitope Position',
    rules: { required: 'Epitope position is required' },
  },
  {
    fieldKey: 'structure_type_id',
    label: 'Structure Type',
    rules: { required: 'Structure type is required' },
  },
  {
    fieldKey: 'link_para_structure_type',
    label: 'Link to Structure Type',
    rules: { required: 'Link to structure type is required' },
  },
  {
    fieldKey: 'structure_source',
    label: 'Source Structure',
    rules: { required: 'Source structure is required' },
  },
  {
    fieldKey: 'mhc_allele_id',
    label: 'MHC Allele id',
    rules: { required: 'MHC Allele is required' },
  },
  {
    fieldKey: 'source_organism',
    label: 'Source Organism',
    rules: { required: 'Source organism is required' },
  },
  {
    fieldKey: 'immunological_background_id',
    label: 'Immunological Background',
    rules: { required: 'Immunological background is required' },
  },
  {
    fieldKey: 'source_protein',
    label: 'Source Protein',
    rules: { required: 'Source Protein is required' },
  },
  {
    fieldKey: 'link_para_source_protein',
    label: 'Link to Source Protein',
    rules: { required: 'Link to Source Protein is required' },
  },
  {
    fieldKey: 'reference',
    label: 'Reference',
    rules: { required: 'Reference is required' },
  },
  {
    fieldKey: 'link_para_reference',
    label: 'Reference Link',
    rules: { required: 'Reference Link is required' },
  },
  {
    fieldKey: 'link_para_imagem',
    label: 'Image Link',
    rules: { required: 'Image Link is required' },
  },
  {
    fieldKey: 'link_para_pdb_file',
    label: 'PDB file Link',
    rules: { required: 'PDB File Link is required' },
  },
]

export function PmhcForm() {
  const utils = trpc.useContext()
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {},
  })
  const router = useRouter()
  const addPMHC = trpc.pmhc.add.useMutation({
    async onSuccess() {
      await utils.pmhc.search.invalidate()
      router.back()
    },
  })
  const onSubmit = handleSubmit((data) => {
    addPMHC.mutateAsync(data)
  })

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
              {fields.map((field) => (
                <TextInput
                  key={field.fieldKey}
                  register={register}
                  formState={formState}
                  {...field}
                />
              ))}
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