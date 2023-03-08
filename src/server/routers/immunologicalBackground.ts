import { Prisma } from '@prisma/client'

import { prisma } from '~/server/prisma'

import { publicProcedure, router } from '../trpc'

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
