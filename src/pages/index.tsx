import {
  Box,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { trpc } from '../utils/trpc'

const IndexPage: NextPage = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [mhcAlleleFilters, setMhcAlleleFilters] = useState<string[]>([])
  const pmhcQuery = trpc.pmhc.search.useQuery(
    { query: debouncedQuery, filters: { mhcAllele: mhcAlleleFilters } },
    { enabled: query.length > 0 },
  )
  const mhcAlleleQuery = trpc.mhcAllele.list.useQuery()

  useEffect(() => {
    if (mhcAlleleQuery.data) {
      setMhcAlleleFilters(
        mhcAlleleQuery.data.items.map((mhcAllele) => mhcAllele.id),
      )
    }
  }, [mhcAlleleQuery.data])

  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    1000,
    [query],
  )

  return (
    <Container maxW="container.lg" as="main">
      <Stack spacing="4" py="8">
        <Heading mb="4">Crosstope</Heading>
        <Input
          placeholder="Search"
          variant="filled"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Flex>
          <Box w="40" flexShrink="0">
            <Text>Filters</Text>
            <Divider />
            <Text>MHC Allele</Text>
            {mhcAlleleQuery.data?.items.map((allele) => (
              <Checkbox
                key={allele.id}
                isChecked={mhcAlleleFilters.includes(allele.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setMhcAlleleFilters([...mhcAlleleFilters, allele.id])
                  } else {
                    setMhcAlleleFilters(
                      mhcAlleleFilters.filter((id) => id !== allele.id),
                    )
                  }
                }}
              >
                {allele.id} <Tag>{allele._count.PMHC}</Tag>
              </Checkbox>
            ))}
          </Box>
          <Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
              {pmhcQuery.data?.items.map((pmhc) => (
                <Box rounded="md" p="2" key={pmhc.complex_code}>
                  <List>
                    <ListItem>
                      <Image
                        src={`/images/${pmhc.complex_code}_V5.jpg`}
                        width={210}
                        height={150}
                      />
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">sequence:</Text> {pmhc.sequence}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">source organism:</Text>
                      {pmhc.source_organism}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">source protein:</Text>
                      {pmhc.source_protein}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">mhc allele:</Text>{' '}
                      {pmhc.mhc_allele.id}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">immunological background:</Text>
                      {pmhc.immunological_background}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">peptide lenght:</Text>
                      {pmhc.peptide_lenght}
                    </ListItem>
                  </List>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  )
}

export default IndexPage
