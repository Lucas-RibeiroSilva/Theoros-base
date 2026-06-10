/*
  Warnings:

  - You are about to drop the column `name` on the `TraitRestriction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[traitId,restrictedId]` on the table `TraitRestriction` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `attribute` on the `ExpertiseRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `operator` on the `ExpertiseRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `attribute` on the `MagicRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `operator` on the `MagicRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `operator` to the `RaceModifier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator` to the `TraitModifier` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `attribute` on the `TraitModifier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `attribute` on the `TraitRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `operator` on the `TraitRequirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `restrictedId` to the `TraitRestriction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Attributes" AS ENUM ('ST', 'DX', 'IQ', 'HT', 'PV', 'PER', 'PF');

-- CreateEnum
CREATE TYPE "ComparisonOperators" AS ENUM ('GT', 'GTE', 'LT', 'LTE', 'EQ');

-- CreateEnum
CREATE TYPE "MathOperators" AS ENUM ('ADD', 'SUB', 'MUL', 'DIV');

-- DropForeignKey
ALTER TABLE "TraitRestriction" DROP CONSTRAINT "TraitRestriction_traitId_fkey";

-- AlterTable
ALTER TABLE "ExpertiseRequirement" DROP COLUMN "attribute",
ADD COLUMN     "attribute" "Attributes" NOT NULL,
DROP COLUMN "operator",
ADD COLUMN     "operator" "ComparisonOperators" NOT NULL;

-- AlterTable
ALTER TABLE "MagicRequirement" DROP COLUMN "attribute",
ADD COLUMN     "attribute" "Attributes" NOT NULL,
DROP COLUMN "operator",
ADD COLUMN     "operator" "ComparisonOperators" NOT NULL;

-- AlterTable
ALTER TABLE "RaceModifier" ADD COLUMN     "operator" "MathOperators" NOT NULL;

-- AlterTable
ALTER TABLE "TraitModifier" ADD COLUMN     "operator" "MathOperators" NOT NULL,
DROP COLUMN "attribute",
ADD COLUMN     "attribute" "Attributes" NOT NULL;

-- AlterTable
ALTER TABLE "TraitRequirement" DROP COLUMN "attribute",
ADD COLUMN     "attribute" "Attributes" NOT NULL,
DROP COLUMN "operator",
ADD COLUMN     "operator" "ComparisonOperators" NOT NULL;

-- AlterTable
ALTER TABLE "TraitRestriction" DROP COLUMN "name",
ADD COLUMN     "restrictedId" TEXT NOT NULL,
ALTER COLUMN "traitId" SET DATA TYPE TEXT,
ALTER COLUMN "display" DROP NOT NULL,
ALTER COLUMN "display" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE INDEX "TraitRestriction_restrictedId_idx" ON "TraitRestriction"("restrictedId");

-- CreateIndex
CREATE UNIQUE INDEX "TraitRestriction_traitId_restrictedId_key" ON "TraitRestriction"("traitId", "restrictedId");

-- AddForeignKey
ALTER TABLE "TraitRestriction" ADD CONSTRAINT "TraitRestriction_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Traits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraitRestriction" ADD CONSTRAINT "TraitRestriction_restrictedId_fkey" FOREIGN KEY ("restrictedId") REFERENCES "Traits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
