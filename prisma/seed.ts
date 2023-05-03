/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse/sync'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  type RawData = {
    sequence: string
    epitope_id_by_iedb: string
    link_epitope_id_by_iedb: string
    complex_code: string
    deposition: string
    release: string
    last_modification: string
    structure_type: string
    mhc_allele: string
    source_protein: string
    source_organism: string
    epitope_position: string
    immunological_background: string
    reference: string
    link_para_source_protein: string
    link_para_reference: string
    id_sequence: string
    structure_source: string
    peptide_lenght: string
    link_para_structure_type: string
  }

  // read csv file
  console.log('start reading csv file')
  const input = fs.readFileSync('./prisma/dbo.sequence.csv')
  const records: RawData[] = parse(input, { columns: true })

  for (const result of records) {
    console.log(`inserting mhc_allele: ${result.mhc_allele}`)
    await prisma.mHCAllele.upsert({
      where: { id: result.mhc_allele },
      create: { id: result.mhc_allele },
      update: {},
    })
    console.log(`inserting structure_type: ${result.structure_type}`)
    await prisma.structureType.upsert({
      where: { id: result.structure_type },
      create: { id: result.structure_type },
      update: {},
    })
    console.log(
      `inserting immunological_background: ${result.immunological_background}`,
    )
    await prisma.immunologicalBackground.upsert({
      where: { id: result.immunological_background },
      create: { id: result.immunological_background },
      update: {},
    })
    console.log(`inserting pmhc: ${result.sequence}`)
    await prisma.pMHC.upsert({
      where: {
        sequence_source_organism_mhc_allele_id: {
          sequence: result.sequence,
          source_organism: result.source_organism,
          mhc_allele_id: result.mhc_allele,
        },
      },
      create: {
        ...result,
        mhc_allele_id: result.mhc_allele,
        mhc_allele: undefined,
        structure_type_id: result.structure_type,
        structure_type: undefined,
        immunological_background_id: result.immunological_background,
        immunological_background: undefined,
      },
      update: {},
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
