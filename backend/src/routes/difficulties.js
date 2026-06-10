import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /difficulties — lista todas as dificuldades
router.get("/", async (req, res) => {
  try {
    const difficulties = await prisma.difficulties.findMany();
    return res.json(difficulties);
  } catch (error) {
    console.error("Erro ao buscar dificuldades:", error);
    return res.status(500).json({ error: "Erro ao buscar dificuldades." });
  }
});

export { router as difficultyRoutes };