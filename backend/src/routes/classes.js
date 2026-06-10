import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /classes — lista todas as classes
router.get("/", async (req, res) => {
  try {
    const classes = await prisma.classes.findMany();
    return res.json(classes);
  } catch (error) {
    console.error("Erro ao buscar classes:", error);
    return res.status(500).json({ error: "Erro ao buscar classes." });
  }
});

export { router as classRoutes };