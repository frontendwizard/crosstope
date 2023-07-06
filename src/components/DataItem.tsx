import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export function DataItem({
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
