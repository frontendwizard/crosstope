import { Box, Checkbox, Tag, Text } from '@chakra-ui/react'

import { trpc } from '../../utils/trpc'

export const MHCAlleleFilter = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const mhcAlleleQuery = trpc.mhcAllele.list.useQuery()

  return (
    <Box>
      <Text fontWeight="bold">MHC Allele</Text>
      {mhcAlleleQuery.data?.items.map((allele) => (
        <Checkbox
          key={allele.id}
          isChecked={value.includes(allele.id)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, allele.id])
            } else {
              onChange(value.filter((id) => id !== allele.id))
            }
          }}
          fontSize="sm"
        >
          {allele.id} <Tag>{allele._count.pmhcs}</Tag>
        </Checkbox>
      ))}
    </Box>
  )
}
