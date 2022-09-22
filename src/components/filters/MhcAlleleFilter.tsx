import { Checkbox, Tag, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { trpc } from '../../utils/trpc'

export const MHCAlleleFilter = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const mhcAlleleQuery = trpc.mhcAllele.list.useQuery()
  useEffect(() => {
    if (mhcAlleleQuery.data) {
      onChange(mhcAlleleQuery.data.items.map((mhcAllele) => mhcAllele.id))
    }
  }, [mhcAlleleQuery.data, onChange])

  return (
    <>
      <Text>MHC Allele</Text>
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
        >
          {allele.id} <Tag>{allele._count.pmhcs}</Tag>
        </Checkbox>
      ))}
    </>
  )
}
