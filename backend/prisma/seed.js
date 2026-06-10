import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const prisma = new PrismaClient();

// Resolve o caminho da pasta /data relativo a este arquivo
const __dirname = dirname(fileURLToPath(import.meta.url));
const data = (file) =>
  JSON.parse(readFileSync(join(__dirname, "seeds", file), "utf-8"));

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Iniciando seed...\n");

  // ══════════════════════════════════════════════════════
  // 1. TYPES
  // ══════════════════════════════════════════════════════
  console.log("❔ Inserindo tipos...");
  const typesJson = data("types.json");

  await prisma.types.createMany({ data: typesJson, skipDuplicates: true });

  const types = await prisma.types.findMany();
  const typeMap = new Map(types.map((t) => [t.name, t]));

  // ══════════════════════════════════════════════════════
  // 2. DIFFICULTIES
  // ══════════════════════════════════════════════════════
  console.log("😡 Inserindo dificuldades...");
  const difficultiesJson = data("difficulties.json");

  await prisma.difficulties.createMany({
    data: difficultiesJson,
    skipDuplicates: true,
  });

  const difficulties = await prisma.difficulties.findMany();
  const difficultyMap = new Map(difficulties.map((d) => [d.name, d]));

  // ══════════════════════════════════════════════════════
  // 3. CLASSES
  // ══════════════════════════════════════════════════════
  console.log("🛡 Inserindo classes...");
  const classesJson = data("classes.json");

  await prisma.classes.createMany({ data: classesJson, skipDuplicates: true });

  const classes = await prisma.classes.findMany();
  const classMap = new Map(classes.map((c) => [c.name, c]));

  // ══════════════════════════════════════════════════════
  // 4. RACES
  // ══════════════════════════════════════════════════════
  console.log("🧝‍ Inserindo raças...");
  const racesJson = data("races.json");

  for (const race of racesJson) {
    const { modifiers, ...raceData } = race;

    const created = await prisma.races.upsert({
      where: { name: raceData.name },
      update: raceData,
      create: raceData,
    });

    if (Array.isArray(modifiers) && modifiers.length > 0) {
      await prisma.raceModifier.deleteMany({ where: { raceId: created.id } });

      await prisma.raceModifier.createMany({
        data: modifiers.map((m) => ({ ...m, raceId: created.id })),
      });
    }
  }

  // ══════════════════════════════════════════════════════
  // 5. TRAITS (Vantagens e Desvantagens)
  // ══════════════════════════════════════════════════════
  console.log("🪪 Inserindo traits...");
  const traitsJson = data("traits.json");

  for (const trait of traitsJson) {
    const {
      types: traitTypes,
      requirements,
      restrictions,
      modifiers,
      effects,
      ...traitData
    } = trait;

    await prisma.traits.upsert({
      where: { id: traitData.id },
      update: traitData,
      create: traitData,
    });

    await prisma.traitType.deleteMany({ where: { traitId: traitData.id } });
    await prisma.traitRequirement.deleteMany({
      where: { traitId: traitData.id },
    });
    await prisma.traitModifier.deleteMany({ where: { traitId: traitData.id } });
    await prisma.traitEffect.deleteMany({ where: { traitId: traitData.id } });

    if (Array.isArray(traitTypes)) {
      for (const typeName of traitTypes) {
        const type = typeMap.get(typeName);
        if (!type) {
          console.warn(
            `  ⚠️  Tipo não encontrado: "${typeName}" (trait: ${traitData.id})`,
          );
          continue;
        }
        await prisma.traitType.create({
          data: { traitId: traitData.id, typeId: type.id },
        });
      }
    }

    if (Array.isArray(requirements)) {
      for (const req of requirements) {
        await prisma.traitRequirement.create({
          data: { traitId: traitData.id, ...req },
        });
      }
    }

    if (Array.isArray(modifiers)) {
      for (const mod of modifiers) {
        await prisma.traitModifier.create({
          data: { traitId: traitData.id, ...mod },
        });
      }
    }

    if (Array.isArray(effects)) {
      for (const effect of effects) {
        await prisma.traitEffect.create({
          data: { traitId: traitData.id, ...effect },
        });
      }
    }
  }

  // Restrictions em segundo passo — o trait alvo precisa existir
  console.log("🔐 Inserindo restrictions dos traits...");
  const traitIds = new Set(traitsJson.map((t) => t.id));

  for (const trait of traitsJson) {
    if (!Array.isArray(trait.restrictions) || trait.restrictions.length === 0)
      continue;

    await prisma.traitRestriction.deleteMany({ where: { traitId: trait.id } });

    for (const res of trait.restrictions) {
      if (!traitIds.has(res.restrictedId)) {
        console.warn(
          `  ⚠️  Restriction ignorada — trait alvo não existe: "${res.restrictedId}" (trait: ${trait.id})`,
        );
        continue;
      }
      await prisma.traitRestriction.create({
        data: {
          traitId: trait.id,
          restrictedId: res.restrictedId,
          display: res.display,
        },
      });
    }
  }

  // ══════════════════════════════════════════════════════
  // 6. LIMITATIONS
  // ══════════════════════════════════════════════════════
  console.log("🔒 Inserindo limitações...");
  const limitationsJson = data("limitations.json");

  for (const lim of limitationsJson) {
    const { types: limTypes, ...limData } = lim;

    await prisma.limitations.upsert({
      where: { id: limData.id },
      update: limData,
      create: limData,
    });

    await prisma.limitationsTypes.deleteMany({
      where: { limitationId: limData.id },
    });

    if (Array.isArray(limTypes)) {
      for (const typeName of limTypes) {
        const type = typeMap.get(typeName);
        if (!type) {
          console.warn(
            `  ⚠️  Tipo não encontrado: "${typeName}" (limitation: ${limData.id})`,
          );
          continue;
        }
        await prisma.limitationsTypes.create({
          data: { limitationId: limData.id, typeId: type.id },
        });
      }
    }
  }

  // ══════════════════════════════════════════════════════
  // 7. EXPERTISES
  // ══════════════════════════════════════════════════════
  console.log("🧪 Inserindo perícias...");
  const expertisesJson = data("expertises.json");

  for (const exp of expertisesJson) {
    const { difficulties: expDiffs, requirements, ...expData } = exp;

    await prisma.expertises.upsert({
      where: { id: expData.id },
      update: expData,
      create: expData,
    });

    await prisma.expertisesDifficulties.deleteMany({
      where: { expertiseId: expData.id },
    });
    await prisma.expertiseRequirement.deleteMany({
      where: { expertiseId: expData.id },
    });

    if (Array.isArray(expDiffs)) {
      for (const diffName of expDiffs) {
        const diff = difficultyMap.get(diffName);
        if (!diff) {
          console.warn(
            `  ⚠️  Dificuldade não encontrada: "${diffName}" (expertise: ${expData.id})`,
          );
          continue;
        }
        await prisma.expertisesDifficulties.create({
          data: { expertiseId: expData.id, difficultyId: diff.id },
        });
      }
    }

    if (Array.isArray(requirements)) {
      for (const req of requirements) {
        await prisma.expertiseRequirement.create({
          data: { expertiseId: expData.id, ...req },
        });
      }
    }
  }

  // ══════════════════════════════════════════════════════
  // 8. EXPANSIONS
  // ══════════════════════════════════════════════════════
  console.log("🔍 Inserindo ampliações...");
  const expansionsJson = data("expansions.json");

  for (const exp of expansionsJson) {
    const { types: expTypes, ...expData } = exp;

    await prisma.expansions.upsert({
      where: { id: expData.id },
      update: expData,
      create: expData,
    });

    await prisma.expansionsTypes.deleteMany({
      where: { expansionId: expData.id },
    });

    if (Array.isArray(expTypes)) {
      for (const typeName of expTypes) {
        const type = typeMap.get(typeName);
        if (!type) {
          console.warn(
            `  ⚠️  Tipo não encontrado: "${typeName}" (expansion: ${expData.id})`,
          );
          continue;
        }
        await prisma.expansionsTypes.create({
          data: { expansionId: expData.id, typeId: type.id },
        });
      }
    }
  }

  // ══════════════════════════════════════════════════════
  // 9. TECHNIQUES
  // ══════════════════════════════════════════════════════
  console.log("🥋 Inserindo técnicas...");
  const techniquesJson = data("techniques.json");

  for (const tech of techniquesJson) {
    const { difficulties: techDiffs, ...techData } = tech;

    await prisma.techniques.upsert({
      where: { id: techData.id },
      update: techData,
      create: techData,
    });

    await prisma.techniquesDifficulties.deleteMany({
      where: { techniqueId: techData.id },
    });

    if (Array.isArray(techDiffs)) {
      for (const diffName of techDiffs) {
        const diff = difficultyMap.get(diffName);
        if (!diff) {
          console.warn(
            `  ⚠️  Dificuldade não encontrada: "${diffName}" (technique: ${techData.id})`,
          );
          continue;
        }
        await prisma.techniquesDifficulties.create({
          data: { techniqueId: techData.id, difficultyId: diff.id },
        });
      }
    }
  }

  // ══════════════════════════════════════════════════════
  // 10. MAGICS
  // ══════════════════════════════════════════════════════
  console.log("🪄 Inserindo magias...");
  const magicsJson = data("magics.json");

  for (const magic of magicsJson) {
    const {
      types: magicTypes,
      classes: magicClasses,
      requirements,
      effects,
      ...magicData
    } = magic;

    await prisma.magics.upsert({
      where: { id: magicData.id },
      update: magicData,
      create: magicData,
    });

    await prisma.magicTypes.deleteMany({ where: { magicId: magicData.id } });
    await prisma.magicClass.deleteMany({ where: { magicId: magicData.id } });
    await prisma.magicRequirement.deleteMany({
      where: { magicId: magicData.id },
    });
    await prisma.magicEffect.deleteMany({ where: { magicId: magicData.id } });

    if (Array.isArray(magicTypes)) {
      for (const typeName of magicTypes) {
        const type = typeMap.get(typeName);
        if (!type) {
          console.warn(
            `  ⚠️  Tipo não encontrado: "${typeName}" (magic: ${magicData.id})`,
          );
          continue;
        }
        await prisma.magicTypes.create({
          data: { magicId: magicData.id, typeId: type.id },
        });
      }
    }

    if (Array.isArray(magicClasses)) {
      for (const className of magicClasses) {
        const cls = classMap.get(className);
        if (!cls) {
          console.warn(
            `  ⚠️  Classe não encontrada: "${className}" (magic: ${magicData.id})`,
          );
          continue;
        }
        await prisma.magicClass.create({
          data: { magicId: magicData.id, classId: cls.id },
        });
      }
    }

    if (Array.isArray(requirements)) {
      for (const req of requirements) {
        await prisma.magicRequirement.create({
          data: { magicId: magicData.id, ...req },
        });
      }
    }

    if (Array.isArray(effects)) {
      for (const effect of effects) {
        await prisma.magicEffect.create({
          data: { magicId: magicData.id, ...effect },
        });
      }
    }
  }

  console.log("\n🌳 Seed finalizado com sucesso!");
}

// ─────────────────────────────────────────────────────────────────────────────

main()
  .catch((e) => {
    console.error("🔥 Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
