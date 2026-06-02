/*
  Warnings:

  - You are about to drop the column `custoBase` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `custoDisplay` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `custoVariavel` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `descricaoBreve` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `descricaoCompleta` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `exotica` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `fisica` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `formulaDescricao` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `formulaValor` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `mental` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `nivelAtual` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `nivelMaximo` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `permiteNivel` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenatural` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `valorVariavel` on the `Advantage` table. All the data in the column will be lost.
  - You are about to drop the column `custoBase` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `custoDisplay` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `custoVariavel` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `descricaoBreve` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `descricaoCompleta` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `exotica` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `fisica` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `formulaDescricao` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `formulaValor` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `mental` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `nivelAtual` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `nivelMaximo` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `permiteNivel` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenatural` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `Disadvantage` table. All the data in the column will be lost.
  - You are about to drop the column `valorVariavel` on the `Disadvantage` table. All the data in the column will be lost.
  - Added the required column `custo` to the `Advantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Advantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formula` to the `Advantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `Advantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipos` to the `Advantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custo` to the `Disadvantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Disadvantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formula` to the `Disadvantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `Disadvantage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipos` to the `Disadvantage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advantage" DROP COLUMN "custoBase",
DROP COLUMN "custoDisplay",
DROP COLUMN "custoVariavel",
DROP COLUMN "descricaoBreve",
DROP COLUMN "descricaoCompleta",
DROP COLUMN "exotica",
DROP COLUMN "fisica",
DROP COLUMN "formulaDescricao",
DROP COLUMN "formulaValor",
DROP COLUMN "mental",
DROP COLUMN "nivelAtual",
DROP COLUMN "nivelMaximo",
DROP COLUMN "permiteNivel",
DROP COLUMN "sobrenatural",
DROP COLUMN "social",
DROP COLUMN "valorVariavel",
ADD COLUMN     "custo" JSONB NOT NULL,
ADD COLUMN     "descricao" JSONB NOT NULL,
ADD COLUMN     "formula" JSONB NOT NULL,
ADD COLUMN     "nivel" JSONB NOT NULL,
ADD COLUMN     "tipos" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Disadvantage" DROP COLUMN "custoBase",
DROP COLUMN "custoDisplay",
DROP COLUMN "custoVariavel",
DROP COLUMN "descricaoBreve",
DROP COLUMN "descricaoCompleta",
DROP COLUMN "exotica",
DROP COLUMN "fisica",
DROP COLUMN "formulaDescricao",
DROP COLUMN "formulaValor",
DROP COLUMN "mental",
DROP COLUMN "nivelAtual",
DROP COLUMN "nivelMaximo",
DROP COLUMN "permiteNivel",
DROP COLUMN "sobrenatural",
DROP COLUMN "social",
DROP COLUMN "valorVariavel",
ADD COLUMN     "custo" JSONB NOT NULL,
ADD COLUMN     "descricao" JSONB NOT NULL,
ADD COLUMN     "formula" JSONB NOT NULL,
ADD COLUMN     "nivel" JSONB NOT NULL,
ADD COLUMN     "tipos" JSONB NOT NULL;
