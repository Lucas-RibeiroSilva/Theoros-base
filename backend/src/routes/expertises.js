import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const expertiseInclude = {
  difficulties: { include: { difficulty: true } },
  requirements: true,
};

// GET /expertises — lista todas as perícias
router.get("/", async (req, res) => {
  try {
    const expertises = await prisma.expertises.findMany({
      include: expertiseInclude,
    });

    return res.json(expertises);
  } catch (error) {
    console.error("Erro ao buscar perícias:", error);
    return res.status(500).json({ error: "Erro ao buscar perícias." });
  }
});

// GET /expertises/:id — busca uma perícia por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expertise = await prisma.expertises.findUnique({
      where: { id },
      include: expertiseInclude,
    });

    if (!expertise) {
      return res.status(404).json({ error: "Perícia não encontrada." });
    }

    return res.json(expertise);
  } catch (error) {
    console.error("Erro ao buscar perícia:", error);
    return res.status(500).json({ error: "Erro ao buscar perícia." });
  }
});

export { router as expertiseRoutes };