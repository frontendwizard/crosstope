import { Prisma } from '@prisma/client'
import { router, publicProcedure } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultStructureTypeSelect =
  Prisma.validator<Prisma.StructureTypeSelect>()({
    id: true,
    _count: { select: { pmhcs: true } },
  })

export const structureTypeRouter = router({
  list: publicProcedure.query(async ({}) => {
    const items = await prisma.structureType.findMany({
      select: defaultStructureTypeSelect,
    })
    return {
      items,
    }
  }),
})
