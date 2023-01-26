import { Prisma } from '@prisma/client'
import { router, publicProcedure } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultAlleleSelect = Prisma.validator<Prisma.MHCAlleleSelect>()({
  id: true,
  _count: { select: { pmhcs: true } },
})

export const mhcAlleleRouter = router({
  list: publicProcedure.query(async ({}) => {
    const items = await prisma.mHCAllele.findMany({
      select: defaultAlleleSelect,
    })
    return {
      items,
    }
  }),
})
