-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PMHC" (
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

    CONSTRAINT "PMHC_pkey" PRIMARY KEY ("complex_code")
);

-- CreateTable
CREATE TABLE "StructureType" (
    "id" TEXT NOT NULL,

    CONSTRAINT "StructureType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImmunologicalBackground" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ImmunologicalBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MHCAllele" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MHCAllele_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PMHC" ADD CONSTRAINT "PMHC_immunological_background_id_fkey" FOREIGN KEY ("immunological_background_id") REFERENCES "ImmunologicalBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMHC" ADD CONSTRAINT "PMHC_mhc_allele_id_fkey" FOREIGN KEY ("mhc_allele_id") REFERENCES "MHCAllele"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMHC" ADD CONSTRAINT "PMHC_structure_type_id_fkey" FOREIGN KEY ("structure_type_id") REFERENCES "StructureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
