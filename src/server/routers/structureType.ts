import { Prisma } from '@prisma/client'
import { t } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultStructureTypeSelect =
  Prisma.validator<Prisma.StructureTypeSelect>()({
    id: true,
    _count: { select: { pmhcs: true } },
  })

export const structureTypeRouter = t.router({
  list: t.procedure.query(async ({}) => {
    const items = await prisma.structureType.findMany({
      select: defaultStructureTypeSelect,
    })
    return {
      items,
    }
  }),
})
