import { Container, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'

import { SearchResults } from '~/components/SearchResults'
import { trpc } from '~/utils/trpc'

const DraftsPage: NextPage = () => {
  const pmhcQuery = trpc.pmhc.search.useInfiniteQuery(
    {
      query: '',
      filters: { published: false },
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )
  return (
    <Container maxW="container.lg" as="main" py="10">
      <Heading mb="8">Drafts</Heading>
      <SearchResults
        data={pmhcQuery.data?.pages.flatMap((page) => page.items)}
        fetchNextPage={pmhcQuery.fetchNextPage}
        hasNextPage={pmhcQuery.hasNextPage}
        isFetching={pmhcQuery.isFetching}
        draft
      />
    </Container>
  )
}

export default DraftsPage