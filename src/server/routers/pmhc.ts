import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '~/server/prisma'

const defaultPmhcSelect = Prisma.validator<Prisma.PMHCSelect>()({
  complex_code: true,
  sequence: true,
  epitope_id_by_iedb: true,
  link_epitope_id_by_iedb: true,
  structure_type: true,
  mhc_allele: true,
  source_organism: true,
  source_protein: true,
  epitope_position: true,
  immunological_background: true,
  reference: true,
  link_para_source_protein: true,
  link_para_reference: true,
  peptide_lenght: true,
})

export const pmhcRouter = router({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        filters: z
          .object({
            mhcAllele: z.string().array().optional(),
            immunologicalBackground: z.string().array().optional(),
            structureType: z.string().array().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      const { query, filters } = input
      const items = await prisma.pMHC.findMany({
        select: defaultPmhcSelect,
        where: {
          OR: [
            { sequence: { contains: query } },
            { source_organism: { contains: query } },
            { source_protein: { contains: query } },
            { mhc_allele_id: { contains: query } },
            { peptide_lenght: { contains: query } },
          ],
          AND: [
            { mhc_allele_id: { in: filters?.mhcAllele } },
            {
              immunological_background_id: {
                in: filters?.immunologicalBackground,
              },
            },
            { structure_type_id: { in: filters?.structureType } },
          ],
        },
      })
      return {
        items,
      }
    }),
})
