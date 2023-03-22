import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { inferProcedureOutput } from '@trpc/server'
import NextLink from 'next/link'

import type { AppRouter } from '~/server/routers/_app'

import { useCloudinary } from './Cloudinary'

function DataItem({
  label,
  value,
  link,
}: {
  label: string
  value: string
  link?: string | null
}) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'start', md: 'center' }}
      gap={{ base: 0, md: 2 }}
    >
      <Box w="36">
        <Heading size="xs" textTransform="uppercase">
          {label}
        </Heading>
      </Box>
      {link ? (
        <NextLink href={link.trim()} passHref legacyBehavior>
          <Link
            isExternal
            display="inline-flex"
            gap={1}
            alignItems="center"
            target="_blank"
          >
            {value} <ExternalLinkIcon />
          </Link>
        </NextLink>
      ) : (
        <Text>{value}</Text>
      )}
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
        alt=""
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={pmhcImage.toURL()}
      />
      <Stack flex="1">
        <CardBody>
          <Flex direction="column" gap={{ base: 2, md: 0 }}>
            <DataItem
              label="Sequence"
              value={hit.sequence}
              link={hit.link_epitope_id_by_iedb}
            />
            <DataItem label="peptide lenght" value={hit.peptide_lenght} />
            <DataItem
              label="structure type"
              value={hit.structure_type.id}
              link={hit.link_para_structure_type}
            />
            <DataItem
              label="immunological background"
              value={hit.immunological_background.id}
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
                href={`/pdb/${hit.complex_code}.pdb`}
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
      {/* <List alignItems="center" display="flex" flexDir="column">
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
