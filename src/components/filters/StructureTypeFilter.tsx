import { Box, Checkbox, Flex, Tag, Text } from '@chakra-ui/react'

import { trpc } from '../../utils/trpc'

export const StructureTypeFilter = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const structureTypeQuery = trpc.structureType.list.useQuery()

  return (
    <Flex direction="column" py="2" gap="2">
      <Text fontWeight="bold" mb="2">
        Structure Type
      </Text>
      {structureTypeQuery.data?.items.map((structureType) => (
        <Checkbox
          key={structureType.id}
          isChecked={value.includes(structureType.id)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, structureType.id])
            } else {
              onChange(value.filter((id) => id !== structureType.id))
            }
          }}
        >
          {structureType.id} <Tag>{structureType._count.pmhcs}</Tag>
        </Checkbox>
      ))}
    </Flex>
  )
}
