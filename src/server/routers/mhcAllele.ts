import { Prisma } from '@prisma/client'
import { t } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultAlleleSelect = Prisma.validator<Prisma.MHCAlleleSelect>()({
  id: true,
  _count: { select: { PMHC: true } },
})

export const mhcAlleleRouter = t.router({
  list: t.procedure.query(async ({}) => {
    const items = await prisma.mHCAllele.findMany({
      select: defaultAlleleSelect,
    })
    return {
      items,
    }
  }),
})
