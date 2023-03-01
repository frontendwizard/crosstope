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
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'react-use'
import { ImmunologicalBackgroundFilter } from '~/components/filters/ImmunologicalBackgroundFilter'
import { MHCAlleleFilter } from '~/components/filters/MhcAlleleFilter'
import { StructureTypeFilter } from '~/components/filters/StructureTypeFilter'
import { PmhcHit } from '~/components/PmhcHit'
import { RouterOutput, trpc } from '../utils/trpc'

function SearchResults({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: {
  data?: RouterOutput['pmhc']['search']['items']
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetching: boolean
}) {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })
  if (!data) return null
  return (
    <Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
        {data.map((pmhc, i) => {
          const key = `${pmhc.mhc_allele.id}-${pmhc.sequence}-${pmhc.source_organism}`
          if (i === data.length - 5) {
            return (
              <div ref={ref} key={key}>
                <PmhcHit key={pmhc.complex_code} hit={pmhc} />
              </div>
            )
          }
          return <PmhcHit key={key} hit={pmhc} />
        })}
      </SimpleGrid>
    </Flex>
  )
}

const IndexPage: NextPage = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [mhcAlleleFilters, setMhcAlleleFilters] = useState<string[]>([])
  const [structureTypeFilters, setStructureTypeFilters] = useState<string[]>([])
  const [immunologicalBackgroundFilters, setImmunologicalBackgroundFilters] =
    useState<string[]>([])
  const pmhcQuery = trpc.pmhc.search.useInfiniteQuery(
    {
      limit: 10,
      query: debouncedQuery,
      filters: {
        mhcAllele: mhcAlleleFilters,
        structureType: structureTypeFilters,
        immunologicalBackground: immunologicalBackgroundFilters,
      },
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )

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
          <SearchResults
            data={pmhcQuery.data?.pages.flatMap((page) => page.items)}
            fetchNextPage={pmhcQuery.fetchNextPage}
            hasNextPage={pmhcQuery.hasNextPage}
            isFetching={pmhcQuery.isFetching}
          />
        </Flex>
      </Stack>
    </Container>
  )
}

export default IndexPage
