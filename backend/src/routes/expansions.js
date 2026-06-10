import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const expansionInclude = {
  types: { include: { types: true } },
};

// GET /expansions — lista todas as ampliações
router.get("/", async (req, res) => {
  try {
    const expansions = await prisma.expansions.findMany({
      include: expansionInclude,
    });

    return res.json(expansions);
  } catch (error) {
    console.error("Erro ao buscar ampliações:", error);
    return res.status(500).json({ error: "Erro ao buscar ampliações." });
  }
});

// GET /expansions/:id — busca uma ampliação por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expansion = await prisma.expansions.findUnique({
      where: { id },
      include: expansionInclude,
    });

    if (!expansion) {
      return res.status(404).json({ error: "Ampliação não encontrada." });
    }

    return res.json(expansion);
  } catch (error) {
    console.error("Erro ao buscar ampliação:", error);
    return res.status(500).json({ error: "Erro ao buscar ampliação." });
  }
});

export { router as expansionRoutes };