import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
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

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <Flex alignItems="center" gap="2">
      <Heading size="xs" textTransform="uppercase">
        {label}
      </Heading>
      <Text>{value}</Text>
    </Flex>
  )
}

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
          <DataItem label="Sequence" value={hit.sequence} />
          <DataItem label="Source Organism" value={hit.source_organism} />
          <DataItem label="Source Protein" value={hit.source_protein} />
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
