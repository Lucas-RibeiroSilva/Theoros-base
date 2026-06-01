-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "mental" BOOLEAN NOT NULL,
    "sobrenatural" BOOLEAN NOT NULL,
    "fisica" BOOLEAN NOT NULL,
    "social" BOOLEAN NOT NULL,
    "exotica" BOOLEAN NOT NULL,
    "custoBase" INTEGER NOT NULL,
    "custoVariavel" BOOLEAN NOT NULL,
    "valorVariavel" INTEGER NOT NULL,
    "custoDisplay" TEXT NOT NULL,
    "permiteNivel" BOOLEAN NOT NULL,
    "nivelAtual" INTEGER NOT NULL,
    "nivelMaximo" INTEGER NOT NULL,
    "descricaoBreve" TEXT NOT NULL,
    "descricaoCompleta" TEXT NOT NULL,
    "formulaValor" TEXT NOT NULL,
    "formulaDescricao" TEXT NOT NULL,
    "requisitos" JSONB NOT NULL,
    "bloqueios" JSONB NOT NULL,
    "modificadores" JSONB NOT NULL,
    "efeitos" JSONB NOT NULL,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disadvantage" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "mental" BOOLEAN NOT NULL,
    "sobrenatural" BOOLEAN NOT NULL,
    "fisica" BOOLEAN NOT NULL,
    "social" BOOLEAN NOT NULL,
    "exotica" BOOLEAN NOT NULL,
    "custoBase" INTEGER NOT NULL,
    "custoVariavel" BOOLEAN NOT NULL,
    "valorVariavel" INTEGER NOT NULL,
    "custoDisplay" TEXT NOT NULL,
    "permiteNivel" BOOLEAN NOT NULL,
    "nivelAtual" INTEGER NOT NULL,
    "nivelMaximo" INTEGER NOT NULL,
    "descricaoBreve" TEXT NOT NULL,
    "descricaoCompleta" TEXT NOT NULL,
    "formulaValor" TEXT NOT NULL,
    "formulaDescricao" TEXT NOT NULL,
    "requisitos" JSONB NOT NULL,
    "bloqueios" JSONB NOT NULL,
    "modificadores" JSONB NOT NULL,
    "efeitos" JSONB NOT NULL,

    CONSTRAINT "Disadvantage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Advantage_nome_idx" ON "Advantage"("nome");

-- CreateIndex
CREATE INDEX "Disadvantage_nome_idx" ON "Disadvantage"("nome");
