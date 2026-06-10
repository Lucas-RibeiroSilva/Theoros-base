import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const magicInclude = {
  types: { include: { type: true } },
  classes: { include: { class: true } },
  requirements: true,
  effects: true,
};

// GET /magics — lista todas as magias
router.get("/", async (req, res) => {
  try {
    const magics = await prisma.magics.findMany({
      include: magicInclude,
    });

    return res.json(magics);
  } catch (error) {
    console.error("Erro ao buscar magias:", error);
    return res.status(500).json({ error: "Erro ao buscar magias." });
  }
});

// GET /magics/:id — busca uma magia por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const magic = await prisma.magics.findUnique({
      where: { id },
      include: magicInclude,
    });

    if (!magic) {
      return res.status(404).json({ error: "Magia não encontrada." });
    }

    return res.json(magic);
  } catch (error) {
    console.error("Erro ao buscar magia:", error);
    return res.status(500).json({ error: "Erro ao buscar magia." });
  }
});

export { router as magicRoutes };