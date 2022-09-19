import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { t } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultPmhcSelect = Prisma.validator<Prisma.PMHCSelect>()({
  complex_code: true,
  sequence: true,
  epitope_id_by_iedb: true,
  link_epitope_id_by_iedb: true,
  structure_type: true,
  mhc_allele: true,
  source_organism: true,
  epitope_position: true,
  immunological_background: true,
  reference: true,
  link_para_source_protein: true,
  link_para_reference: true,
  peptide_lenght: true,
})

export const pmhcRouter = t.router({
  search: t.procedure
    .input(z.object({ sequence: z.string() }))
    .query(async ({ input }) => {
      const { sequence } = input
      const items = await prisma.pMHC.findMany({
        select: defaultPmhcSelect,
        where: {
          sequence: {
            contains: sequence,
          },
        },
      })
      return {
        items,
      }
    }),
})
