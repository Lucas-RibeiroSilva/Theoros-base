import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Include padrão para traits (evita repetição)
const traitInclude = {
  types: {
    include: { types: true },
  },
  requirements: true,
  restricts: true,
  blockedBy: true,
  modifiers: true,
  effects: true,
};

// ────────────────────────────── VANTAGENS ───────────────────────────────────────

// GET /traits/advantages — lista todas as vantagens
router.get("/advantages", async (req, res) => {
  try {
    const advantages = await prisma.traits.findMany({
      where: { isAdvantage: true },
      include: traitInclude,
    });

    return res.json(advantages);
  } catch (error) {
    console.error("Erro ao buscar vantagens:", error);
    return res.status(500).json({ error: "Erro ao buscar vantagens." });
  }
});

// GET /traits/advantages/:id — busca uma vantagem por ID
router.get("/advantages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const advantage = await prisma.traits.findFirst({
      where: { id, isAdvantage: true },
      include: traitInclude,
    });

    if (!advantage) {
      return res.status(404).json({ error: "Vantagem não encontrada." });
    }

    return res.json(advantage);
  } catch (error) {
    console.error("Erro ao buscar vantagem:", error);
    return res.status(500).json({ error: "Erro ao buscar vantagem." });
  }
});

// ────────────────────────────── DESVANTAGENS ────────────────────────────────────

// GET /traits/disadvantages — lista todas as desvantagens
router.get("/disadvantages", async (req, res) => {
  try {
    const disadvantages = await prisma.traits.findMany({
      where: { isAdvantage: false },
      include: traitInclude,
    });

    return res.json(disadvantages);
  } catch (error) {
    console.error("Erro ao buscar desvantagens:", error);
    return res.status(500).json({ error: "Erro ao buscar desvantagens." });
  }
});

// GET /traits/disadvantages/:id — busca uma desvantagem por ID
router.get("/disadvantages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const disadvantage = await prisma.traits.findFirst({
      where: { id, isAdvantage: false },
      include: traitInclude,
    });

    if (!disadvantage) {
      return res.status(404).json({ error: "Desvantagem não encontrada." });
    }

    return res.json(disadvantage);
  } catch (error) {
    console.error("Erro ao buscar desvantagem:", error);
    return res.status(500).json({ error: "Erro ao buscar desvantagem." });
  }
});

export { router as traitRoutes };
