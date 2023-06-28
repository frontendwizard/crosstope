import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import type { DefaultSession } from 'next-auth'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { FiltersDrawer } from '~/components/filters/Drawer'
import { SearchResults } from '~/components/SearchResults'

import { trpc } from '../utils/trpc'

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
  const { data: session } = useSession()

  return (
    <Container maxW="container.lg" as="main">
      <Flex
        flexDirection="row"
        justifyContent="flex-end"
        w="full"
        py={4}
        gap={4}
      >
        {session ? (
          <>
            {(
              session.user as DefaultSession['user'] & {
                role: 'admin' | 'user'
              }
            )?.role === 'admin' && (
              <Link href="/drafts">
                <Button variant="solid" colorScheme="blue">
                  Drafts
                </Button>
              </Link>
            )}
            <Link href="/new-pmhc">
              <IconButton aria-label="add new pmhc allele" icon={<AddIcon />} />
            </Link>
            <Button variant="solid" colorScheme="red" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button variant="solid" colorScheme="blue" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
      </Flex>
      <Stack spacing="4" py="8">
        <Heading mb="4">Crosstope</Heading>
        <Flex gap="4">
          <Input
            placeholder="Search"
            variant="filled"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiltersDrawer
            immunologicalBackgroundFilters={immunologicalBackgroundFilters}
            setImmunologicalBackgroundFilters={
              setImmunologicalBackgroundFilters
            }
            mhcAlleleFilters={mhcAlleleFilters}
            setMhcAlleleFilters={setMhcAlleleFilters}
            structureTypeFilters={structureTypeFilters}
            setStructureTypeFilters={setStructureTypeFilters}
          />
        </Flex>
        <Flex>
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
