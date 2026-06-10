import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const techniqueInclude = {
  difficulties: { include: { difficulty: true } },
};

// GET /techniques — lista todas as técnicas
router.get("/", async (req, res) => {
  try {
    const techniques = await prisma.techniques.findMany({
      include: techniqueInclude,
    });

    return res.json(techniques);
  } catch (error) {
    console.error("Erro ao buscar técnicas:", error);
    return res.status(500).json({ error: "Erro ao buscar técnicas." });
  }
});

// GET /techniques/:id — busca uma técnica por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const technique = await prisma.techniques.findUnique({
      where: { id },
      include: techniqueInclude,
    });

    if (!technique) {
      return res.status(404).json({ error: "Técnica não encontrada." });
    }

    return res.json(technique);
  } catch (error) {
    console.error("Erro ao buscar técnica:", error);
    return res.status(500).json({ error: "Erro ao buscar técnica." });
  }
});

export { router as techniqueRoutes };