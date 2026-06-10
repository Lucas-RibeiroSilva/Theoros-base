import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const limitationInclude = {
  types: {
    include: { types: true },
  },
};

// GET /limitations — lista todas as limitações
router.get("/", async (req, res) => {
  try {
    const limitations = await prisma.limitations.findMany({
      include: limitationInclude,
    });

    return res.json(limitations);
  } catch (error) {
    console.error("Erro ao buscar limitações:", error);
    return res.status(500).json({ error: "Erro ao buscar limitações." });
  }
});

// GET /limitations/:id — busca uma limitação por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const limitation = await prisma.limitations.findUnique({
      where: { id },
      include: limitationInclude,
    });

    if (!limitation) {
      return res.status(404).json({ error: "Limitação não encontrada." });
    }

    return res.json(limitation);
  } catch (error) {
    console.error("Erro ao buscar limitação:", error);
    return res.status(500).json({ error: "Erro ao buscar limitação." });
  }
});

export { router as limitationRoutes };