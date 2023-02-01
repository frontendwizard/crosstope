/*
  Warnings:

  - The primary key for the `PMHC` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PMHC" (
    "complex_code" TEXT NOT NULL,
    "sequence" TEXT NOT NULL,
    "epitope_id_by_iedb" TEXT NOT NULL,
    "link_epitope_id_by_iedb" TEXT NOT NULL,
    "structure_type_id" TEXT NOT NULL,
    "mhc_allele_id" TEXT NOT NULL,
    "source_organism" TEXT NOT NULL,
    "epitope_position" TEXT NOT NULL,
    "immunological_background_id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "link_para_source_protein" TEXT NOT NULL,
    "link_para_reference" TEXT NOT NULL,
    "peptide_lenght" TEXT NOT NULL,
    "id_sequence" TEXT,
    "source_protein" TEXT,
    "deposition" TEXT,
    "release" TEXT,
    "last_modification" TEXT,
    "structure_source" TEXT,
    "link_para_structure_type" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("sequence", "source_organism", "mhc_allele_id"),
    CONSTRAINT "PMHC_immunological_background_id_fkey" FOREIGN KEY ("immunological_background_id") REFERENCES "ImmunologicalBackground" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PMHC_mhc_allele_id_fkey" FOREIGN KEY ("mhc_allele_id") REFERENCES "MHCAllele" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PMHC_structure_type_id_fkey" FOREIGN KEY ("structure_type_id") REFERENCES "StructureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PMHC" ("complex_code", "deposition", "epitope_id_by_iedb", "epitope_position", "id_sequence", "immunological_background_id", "last_modification", "link_epitope_id_by_iedb", "link_para_reference", "link_para_source_protein", "link_para_structure_type", "mhc_allele_id", "peptide_lenght", "published", "reference", "release", "sequence", "source_organism", "source_protein", "structure_source", "structure_type_id") SELECT "complex_code", "deposition", "epitope_id_by_iedb", "epitope_position", "id_sequence", "immunological_background_id", "last_modification", "link_epitope_id_by_iedb", "link_para_reference", "link_para_source_protein", "link_para_structure_type", "mhc_allele_id", "peptide_lenght", "published", "reference", "release", "sequence", "source_organism", "source_protein", "structure_source", "structure_type_id" FROM "PMHC";
DROP TABLE "PMHC";
ALTER TABLE "new_PMHC" RENAME TO "PMHC";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
