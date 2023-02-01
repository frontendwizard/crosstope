import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { ImmunologicalBackgroundFilter } from '~/components/filters/ImmunologicalBackgroundFilter'
import { MHCAlleleFilter } from '~/components/filters/MhcAlleleFilter'
import { StructureTypeFilter } from '~/components/filters/StructureTypeFilter'
import { PmhcHit } from '~/components/PmhcHit'
import { trpc } from '../utils/trpc'

const IndexPage: NextPage = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [mhcAlleleFilters, setMhcAlleleFilters] = useState<string[]>([])
  const [structureTypeFilters, setStructureTypeFilters] = useState<string[]>([])
  const [immunologicalBackgroundFilters, setImmunologicalBackgroundFilters] =
    useState<string[]>([])
  const pmhcQuery = trpc.pmhc.search.useQuery({
    query: debouncedQuery,
    filters: {
      mhcAllele: mhcAlleleFilters,
      structureType: structureTypeFilters,
      immunologicalBackground: immunologicalBackgroundFilters,
    },
  })

  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    1000,
    [query],
  )

  return (
    <Container maxW="container.lg" as="main">
      <Box pos="absolute" top={0} right={0} p={4}>
        <Link href="/new-pmhc">
          <IconButton aria-label="add new pmhc allele" icon={<AddIcon />} />
        </Link>
      </Box>
      <Stack spacing="4" py="8">
        <Heading mb="4">Crosstope</Heading>
        <Input
          placeholder="Search"
          variant="filled"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Flex>
          <Stack w="40" flexShrink="0">
            <Text>Filters</Text>
            <Divider />
            <MHCAlleleFilter
              value={mhcAlleleFilters}
              onChange={setMhcAlleleFilters}
            />
            <Divider />
            <StructureTypeFilter
              value={structureTypeFilters}
              onChange={setStructureTypeFilters}
            />
            <Divider />
            <ImmunologicalBackgroundFilter
              value={immunologicalBackgroundFilters}
              onChange={setImmunologicalBackgroundFilters}
            />
          </Stack>
          <Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
              {pmhcQuery.data?.items.map((pmhc) => (
                <PmhcHit key={pmhc.complex_code} hit={pmhc} />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  )
}

export default IndexPage
