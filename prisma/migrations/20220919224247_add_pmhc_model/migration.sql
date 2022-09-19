-- CreateTable
CREATE TABLE "PMHC" (
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
    "structure_source" TEXT,
    "link_para_structure_type" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
