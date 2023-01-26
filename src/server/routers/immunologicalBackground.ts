import { Prisma } from '@prisma/client'
import { router, publicProcedure } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultImmunologicalBackgroundSelect =
  Prisma.validator<Prisma.ImmunologicalBackgroundSelect>()({
    id: true,
    _count: { select: { pmhcs: true } },
  })

export const immunologicalBackgroundRouter = router({
  list: publicProcedure.query(async ({}) => {
    const items = await prisma.immunologicalBackground.findMany({
      select: defaultImmunologicalBackgroundSelect,
    })
    return {
      items,
    }
  }),
})
