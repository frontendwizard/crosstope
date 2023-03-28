import { Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { PmhcHit } from '~/components/PmhcHit'

import type { RouterOutput } from '../utils/trpc'
import { DraftPmhcHit } from './DraftPmhcHit'

export function SearchResults({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  draft = false,
}: {
  data?: RouterOutput['pmhc']['search']['items']
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetching: boolean
  draft?: boolean
}) {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })
  if (!data) return null
  return (
    <Flex w="full" gap="4" flexDir="column">
      {data.map((pmhc, i) => {
        const key = `${pmhc.mhc_allele.id}-${pmhc.sequence}-${pmhc.source_organism}`
        if (i === data.length - 5) {
          if (draft) {
            return (
              <div ref={ref} key={key}>
                <DraftPmhcHit key={pmhc.complex_code} hit={pmhc} />
              </div>
            )
          }
          return (
            <div ref={ref} key={key}>
              <PmhcHit key={pmhc.complex_code} hit={pmhc} />
            </div>
          )
        }
        if (draft) {
          return <DraftPmhcHit key={key} hit={pmhc} />
        }
        return <PmhcHit key={key} hit={pmhc} />
      })}
    </Flex>
  )
}
