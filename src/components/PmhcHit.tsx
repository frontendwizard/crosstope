import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { inferProcedureOutput } from '@trpc/server'
import Image from 'next/image'
import { AppRouter } from '~/server/routers/_app'

export const PmhcHit = ({
  hit,
}: {
  hit: inferProcedureOutput<AppRouter['pmhc']['search']>['items'][number]
}) => {
  return (
    <Box rounded="md" p="2" key={hit.complex_code}>
      <List alignItems="center" display="flex" flexDir="column">
        <ListItem>
          <Image
            src={`/images/${hit.complex_code}_V5.jpg`}
            width={210}
            height={150}
          />
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">sequence:</Text> {hit.sequence}
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">source organism:</Text>
          {hit.source_organism}
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">source protein:</Text>
          {hit.source_protein}
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">mhc allele:</Text> {hit.mhc_allele.id}
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">immunological background:</Text>
          {hit.immunological_background.id}
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">peptide lenght:</Text>
          {hit.peptide_lenght}
        </ListItem>
      </List>
    </Box>
  )
}
