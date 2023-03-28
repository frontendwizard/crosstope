import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { z } from 'zod'

import { prisma } from '~/server/prisma'

import { publicProcedure, router } from '../trpc'

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
  link_para_structure_type: true,
  link_para_imagem: true,
  link_para_pdb_file: true,
  peptide_lenght: true,
})

export const pmhcRouter = router({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        filters: z.object({
          mhcAllele: z.string().array().optional(),
          immunologicalBackground: z.string().array().optional(),
          structureType: z.string().array().optional(),
          published: z.boolean().optional().default(true),
        }),
        limit: z.number().min(1).max(100).optional(),
        cursor: z
          .object({
            sequence_source_organism_mhc_allele_id: z.object({
              sequence: z.string(),
              source_organism: z.string(),
              mhc_allele_id: z.string(),
            }),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      const { query, filters, cursor } = input
      const limit = input.limit ?? 50

      const andFilters = []
      if (input.filters?.mhcAllele?.length) {
        andFilters.push({ mhc_allele_id: { in: filters?.mhcAllele } })
      }
      if (input.filters?.immunologicalBackground?.length) {
        andFilters.push({
          immunological_background_id: {
            in: filters?.immunologicalBackground,
          },
        })
      }
      if (input.filters?.structureType?.length) {
        andFilters.push({ structure_type_id: { in: filters?.structureType } })
      }
      andFilters.push({ published: input.filters.published })
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
          AND: andFilters,
        },
        cursor,
        take: limit + 1,
        orderBy: { sequence: 'asc' },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()!
        nextCursor = {
          sequence_source_organism_mhc_allele_id: {
            sequence: nextItem.sequence,
            source_organism: nextItem.source_organism,
            mhc_allele_id: nextItem.mhc_allele.id,
          },
        }
      }

      return { items, nextCursor }
    }),
  add: publicProcedure
    .input(
      z.object({
        sequence: z.string(),
        epitope_position: z.string(),
        epitope_id_by_iedb: z.string(),
        link_epitope_id_by_iedb: z.string().url(),
        structure_type_id: z.string(),
        link_para_structure_type: z.string().url(),
        source_protein: z.string(),
        link_para_source_protein: z.string().url(),
        structure_source: z.string(),
        reference: z.string(),
        link_para_reference: z.string().url(),
        mhc_allele_id: z.string(),
        source_organism: z.string(),
        immunological_background_id: z.string().url(),
        link_para_imagem: z.string().url(),
        link_para_pdb_file: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.immunologicalBackground.upsert({
        where: { id: input.immunological_background_id },
        create: { id: input.immunological_background_id },
        update: {},
      })
      await prisma.mHCAllele.upsert({
        where: { id: input.mhc_allele_id },
        create: { id: input.mhc_allele_id },
        update: {},
      })
      await prisma.structureType.upsert({
        where: { id: input.structure_type_id },
        create: { id: input.structure_type_id },
        update: {},
      })
      const item = await prisma.pMHC.create({
        select: defaultPmhcSelect,
        data: {
          ...input,
          complex_code: randomUUID(),
          peptide_lenght: input.sequence.length.toString(),
          published: false,
        },
      })
      return { item }
    }),
  publish: publicProcedure
    .input(
      z.object({
        sequence: z.string(),
        source_organism: z.string(),
        mhc_allele_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const item = await prisma.pMHC.update({
        select: defaultPmhcSelect,
        where: {
          sequence_source_organism_mhc_allele_id: {
            sequence: input.sequence,
            source_organism: input.source_organism,
            mhc_allele_id: input.mhc_allele_id,
          },
        },
        data: { published: true },
      })
      return { item }
    }),
  delete: publicProcedure
    .input(
      z.object({
        sequence: z.string(),
        source_organism: z.string(),
        mhc_allele_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const item = await prisma.pMHC.delete({
        select: defaultPmhcSelect,
        where: {
          sequence_source_organism_mhc_allele_id: {
            sequence: input.sequence,
            source_organism: input.source_organism,
            mhc_allele_id: input.mhc_allele_id,
          },
        },
      })
      return { item }
    }),
  update: publicProcedure
    .input(
      z.object({
        sequence: z.string(),
        source_organism: z.string(),
        mhc_allele_id: z.string(),
        epitope_position: z.string(),
        epitope_id_by_iedb: z.string(),
        link_epitope_id_by_iedb: z.string().url(),
        structure_type_id: z.string(),
        link_para_structure_type: z.string().url(),
        source_protein: z.string(),
        link_para_source_protein: z.string().url(),
        structure_source: z.string(),
        reference: z.string(),
        link_para_reference: z.string().url(),
        immunological_background_id: z.string().url(),
        link_para_imagem: z.string().url(),
        link_para_pdb_file: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.immunologicalBackground.upsert({
        where: { id: input.immunological_background_id },
        create: { id: input.immunological_background_id },
        update: {},
      })
      await prisma.mHCAllele.upsert({
        where: { id: input.mhc_allele_id },
        create: { id: input.mhc_allele_id },
        update: {},
      })
      await prisma.structureType.upsert({
        where: { id: input.structure_type_id },
        create: { id: input.structure_type_id },
        update: {},
      })
      const item = await prisma.pMHC.update({
        select: defaultPmhcSelect,
        where: {
          sequence_source_organism_mhc_allele_id: {
            sequence: input.sequence,
            source_organism: input.source_organism,
            mhc_allele_id: input.mhc_allele_id,
          },
        },
        data: {
          ...input,
          peptide_lenght: input.sequence.length.toString(),
        },
      })
      return { item }
    }),
})
