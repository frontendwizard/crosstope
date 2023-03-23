import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { createRef, useState } from 'react'
import { useDebounce } from 'react-use'

import { ImmunologicalBackgroundFilter } from '~/components/filters/ImmunologicalBackgroundFilter'
import { MHCAlleleFilter } from '~/components/filters/MhcAlleleFilter'
import { StructureTypeFilter } from '~/components/filters/StructureTypeFilter'
import { SearchResults } from '~/components/SearchResults'

import { trpc } from '../utils/trpc'

function FiltersDrawer({
  mhcAlleleFilters,
  setMhcAlleleFilters,
  structureTypeFilters,
  setStructureTypeFilters,
  immunologicalBackgroundFilters,
  setImmunologicalBackgroundFilters,
}: {
  mhcAlleleFilters: string[]
  setMhcAlleleFilters: (value: string[]) => void
  structureTypeFilters: string[]
  setStructureTypeFilters: (value: string[]) => void
  immunologicalBackgroundFilters: string[]
  setImmunologicalBackgroundFilters: (value: string[]) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = createRef<HTMLButtonElement>()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
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
