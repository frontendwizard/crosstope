-- DropForeignKey
ALTER TABLE "PMHC" DROP CONSTRAINT "PMHC_immunological_background_id_fkey";

-- AlterTable
ALTER TABLE "PMHC" ALTER COLUMN "epitope_id_by_iedb" DROP NOT NULL,
ALTER COLUMN "link_epitope_id_by_iedb" DROP NOT NULL,
ALTER COLUMN "epitope_position" DROP NOT NULL,
ALTER COLUMN "immunological_background_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PMHC" ADD CONSTRAINT "PMHC_immunological_background_id_fkey" FOREIGN KEY ("immunological_background_id") REFERENCES "ImmunologicalBackground"("id") ON DELETE SET NULL ON UPDATE CASCADE;
