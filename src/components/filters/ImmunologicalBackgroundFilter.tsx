import { Box, Checkbox, Tag, Text } from '@chakra-ui/react'

import { trpc } from '../../utils/trpc'

export const ImmunologicalBackgroundFilter = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const immunologicalBackgroundQuery =
    trpc.immunologicalBackground.list.useQuery()

  return (
    <Box>
      <Text fontWeight="bold">Immunological Background</Text>
      {immunologicalBackgroundQuery.data?.items.map(
        (immunologicalBackground) => (
          <Checkbox
            key={immunologicalBackground.id}
            isChecked={value.includes(immunologicalBackground.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, immunologicalBackground.id])
              } else {
                onChange(
                  value.filter((id) => id !== immunologicalBackground.id),
                )
              }
            }}
          >
            {immunologicalBackground.id}{' '}
            <Tag>{immunologicalBackground._count.pmhcs}</Tag>
          </Checkbox>
        ),
      )}
    </Box>
  )
}
