import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /types — lista todos os tipos
router.get("/", async (req, res) => {
  try {
    const types = await prisma.types.findMany();
    return res.json(types);
  } catch (error) {
    console.error("Erro ao buscar tipos:", error);
    return res.status(500).json({ error: "Erro ao buscar tipos." });
  }
});

export { router as typeRoutes };