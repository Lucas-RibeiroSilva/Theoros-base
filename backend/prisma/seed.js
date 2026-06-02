 /* eslint-env node */

import { PrismaClient } from "@prisma/client";

import advantages from "./seeds/advantagens.json" with { type: "json" };
import disadvantages from "./seeds/disadvantages.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // ───────────────── Advantages ─────────────────

  for (const item of advantages) {
    const formattedAdvantage = {
      id: item.id,
      nome: item.nome,

      tipos: item.tipos,
      custo: item.custo,
      nivel: item.nivel,
      descricao: item.descricao,
      formula: item.formula,

      requisitos: item.requisitos,
      bloqueios: item.bloqueios,
      modificadores: item.modificadores,
      efeitos: item.efeitos,
    };

    await prisma.advantage.upsert({
      where: { id: formattedAdvantage.id },
      update: formattedAdvantage,
      create: formattedAdvantage,
    });
  }

  // ─────────────── Disadvantages ───────────────

  for (const item of disadvantages) {
    const formattedDisadvantage = {
      id: item.id,
      nome: item.nome,

      tipos: item.tipos,
      custo: item.custo,
      nivel: item.nivel,
      descricao: item.descricao,
      formula: item.formula,

      requisitos: item.requisitos,
      bloqueios: item.bloqueios,
      modificadores: item.modificadores,
      efeitos: item.efeitos,
    };

    await prisma.disadvantage.upsert({
      where: { id: formattedDisadvantage.id },
      update: formattedDisadvantage,
      create: formattedDisadvantage,
    });
  }

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });