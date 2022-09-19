/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PMHC` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PMHC` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PMHC" (
    "complex_code" TEXT NOT NULL PRIMARY KEY,
    "sequence" TEXT NOT NULL,
    "epitope_id_by_iedb" TEXT NOT NULL,
    "link_epitope_id_by_iedb" TEXT NOT NULL,
    "structure_type" TEXT NOT NULL,
    "mhc_allele" TEXT NOT NULL,
    "source_organism" TEXT NOT NULL,
    "epitope_position" TEXT NOT NULL,
    "immunological_background" TEXT NOT NULL,
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
    "link_para_structure_type" TEXT
);
INSERT INTO "new_PMHC" ("complex_code", "deposition", "epitope_id_by_iedb", "epitope_position", "id_sequence", "immunological_background", "link_epitope_id_by_iedb", "link_para_reference", "link_para_source_protein", "link_para_structure_type", "mhc_allele", "peptide_lenght", "reference", "release", "sequence", "source_organism", "source_protein", "structure_source", "structure_type") SELECT "complex_code", "deposition", "epitope_id_by_iedb", "epitope_position", "id_sequence", "immunological_background", "link_epitope_id_by_iedb", "link_para_reference", "link_para_source_protein", "link_para_structure_type", "mhc_allele", "peptide_lenght", "reference", "release", "sequence", "source_organism", "source_protein", "structure_source", "structure_type" FROM "PMHC";
DROP TABLE "PMHC";
ALTER TABLE "new_PMHC" RENAME TO "PMHC";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
