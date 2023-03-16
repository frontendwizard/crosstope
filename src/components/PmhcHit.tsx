import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { inferProcedureOutput } from '@trpc/server'

import type { AppRouter } from '~/server/routers/_app'

import { useCloudinary } from './Cloudinary'

export const PmhcHit = ({
  hit,
}: {
  hit: inferProcedureOutput<AppRouter['pmhc']['search']>['items'][number]
}) => {
  const cloudinary = useCloudinary()
  const pmhcImage = cloudinary.image(`crosstope/${hit.complex_code}_V5`)
  return (
    <Card variant="outline" direction="row" overflow="hidden">
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={pmhcImage.toURL()}
      />
      <Stack>
        <CardBody>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Sequence
            </Heading>
            <Text>{hit.sequence}</Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Source Organism
            </Heading>
            <Text>{hit.source_organism}</Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Source Protein
            </Heading>
            <Text>{hit.source_protein}</Text>
          </Box>
        </CardBody>
      </Stack>
      {/* <List alignItems="center" display="flex" flexDir="column">
        <ListItem>
          <Text fontWeight="bold">source protein:</Text>
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
        <ListItem>
          <Button
            leftIcon={<DownloadIcon />}
            as="a"
            href={`/pdb/${hit.complex_code}.pdb`}
            download
          >
            Download PDB file
          </Button>
        </ListItem>
      </List> */}
    </Card>
  )
}
