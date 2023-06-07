import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { createRef } from 'react'

import { ImmunologicalBackgroundFilter } from '~/components/filters/ImmunologicalBackgroundFilter'
import { MHCAlleleFilter } from '~/components/filters/MhcAlleleFilter'
import { StructureTypeFilter } from '~/components/filters/StructureTypeFilter'

export function FiltersDrawer({
  mhcAlleleFilters,
  setMhcAlleleFilters,
  structureTypeFilters,
  setStructureTypeFilters,
  immunologicalBackgroundFilters,
  setImmunologicalBackgroundFilters,
}: {
  mhcAlleleFilters: string[]
  setMhcAlleleFilters: (value: string[]) => void
  structureTypeFilters: string[]
  setStructureTypeFilters: (value: string[]) => void
  immunologicalBackgroundFilters: string[]
  setImmunologicalBackgroundFilters: (value: string[]) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = createRef<HTMLButtonElement>()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody py="8">
            <MHCAlleleFilter
              value={mhcAlleleFilters}
              onChange={setMhcAlleleFilters}
            />
            <Divider my="4" />
            <StructureTypeFilter
              value={structureTypeFilters}
              onChange={setStructureTypeFilters}
            />
            <Divider my="4" />
            <ImmunologicalBackgroundFilter
              value={immunologicalBackgroundFilters}
              onChange={setImmunologicalBackgroundFilters}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
