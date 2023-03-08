import { Prisma } from '@prisma/client'

import { prisma } from '~/server/prisma'

import { publicProcedure, router } from '../trpc'

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
