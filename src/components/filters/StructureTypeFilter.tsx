import { useEffect } from 'react'
import { Text, Checkbox, Tag, Box } from '@chakra-ui/react'
import { trpc } from '../../utils/trpc'

export const StructureTypeFilter = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const structureTypeQuery = trpc.structureType.list.useQuery()
  useEffect(() => {
    if (structureTypeQuery.data) {
      onChange(
        structureTypeQuery.data.items.map((structureType) => structureType.id),
      )
    }
  }, [structureTypeQuery.data, onChange])

  return (
    <Box>
      <Text fontWeight="bold">Structure Type</Text>
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
    </Box>
  )
}
