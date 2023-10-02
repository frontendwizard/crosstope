import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
} from '@chakra-ui/react'
import type { inferProcedureOutput } from '@trpc/server'
import NextLink from 'next/link'

import type { AppRouter } from '~/server/routers/_app'

import { DataItem } from './DataItem'

export const PmhcHit = ({
  hit,
}: {
  hit: inferProcedureOutput<AppRouter['pmhc']['search']>['items'][number]
}) => {
  return (
    <Card variant="outline" direction="row" overflow="hidden">
      <Image
        alt=""
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={`images/${hit.mhc_allele.id}_${hit.sequence}.jpg`}
        fallback={
          <Box w={{ base: '100%', sm: '200px' }} objectFit="cover" bg="white" />
        }
      />
      <Stack flex="1">
        <CardBody>
          <Flex direction="column" gap={{ base: 2, md: 0 }}>
            <DataItem
              label="Sequence"
              value={hit.sequence}
              link={hit.link_epitope_id_by_iedb}
            />
            <DataItem
              label="alele (peptide length)"
              value={hit.peptide_lenght}
            />
            <DataItem
              label="structure type"
              value={hit.structure_type.id}
              link={hit.link_para_structure_type}
            />
            {hit.source_protein && (
              <DataItem
                label="Source Protein"
                value={hit.source_protein}
                link={hit.link_para_source_protein}
              />
            )}
            <DataItem label="Source Organism" value={hit.source_organism} />
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'start', md: 'center' }}
              mt="4"
              gap="4"
            >
              <Button
                leftIcon={<DownloadIcon />}
                as="a"
                href={`/pdb/${hit.mhc_allele.id}_${hit.sequence}.pdb`}
                download
              >
                Download PDB file
              </Button>
              <NextLink
                href={hit.link_para_reference.trim()}
                passHref
                legacyBehavior
              >
                <Button as="a" variant="solid" target="_blank">
                  Go to reference <ExternalLinkIcon ml="1" />
                </Button>
              </NextLink>
            </Flex>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  )
}
