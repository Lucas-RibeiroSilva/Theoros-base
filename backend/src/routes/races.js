import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const raceInclude = {
  modifiers: true,
};

// GET /races — lista todas as raças
router.get("/", async (req, res) => {
  try {
    const races = await prisma.races.findMany({
      include: raceInclude,
    });

    return res.json(races);
  } catch (error) {
    console.error("Erro ao buscar raças:", error);
    return res.status(500).json({ error: "Erro ao buscar raças." });
  }
});

// GET /races/:id — busca uma raça por ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const race = await prisma.races.findUnique({
      where: { id },
      include: raceInclude,
    });

    if (!race) {
      return res.status(404).json({ error: "Raça não encontrada." });
    }

    return res.json(race);
  } catch (error) {
    console.error("Erro ao buscar raça:", error);
    return res.status(500).json({ error: "Erro ao buscar raça." });
  }
});

export { router as raceRoutes };