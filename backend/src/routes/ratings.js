import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "./auth.js";

const router = Router();
const prisma = new PrismaClient();

// GET /ratings/:cardId — busca as avaliações de uma ficha
router.get("/:cardId", async (req, res) => {
  const { cardId } = req.params;

  try {
    const ratings = await prisma.ratings.findMany({
      where: { cardId },
    });

    return res.json(ratings);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return res.status(500).json({ error: "Erro ao buscar avaliações." });
  }
});

// POST /ratings — cria ou atualiza uma avaliação (requer autenticação)
router.post("/", authMiddleware, async (req, res) => {
  const { cardId, score } = req.body;

  if (!cardId || score == null) {
    return res.status(400).json({ error: "cardId e score são obrigatórios." });
  }

  if (score < 1 || score > 5) {
    return res.status(400).json({ error: "Score deve ser entre 1 e 5." });
  }

  try {
    // Upsert: cria se não existir, atualiza se já existir
    const rating = await prisma.ratings.upsert({
      where: {
        userId_cardId: {
          userId: req.user.id,
          cardId,
        },
      },
      update: { score },
      create: {
        userId: req.user.id,
        cardId,
        score,
      },
    });

    // Recalcula a média da ficha
    const avg = await prisma.ratings.aggregate({
      where: { cardId },
      _avg: { score: true },
    });

    await prisma.card.update({
      where: { id: cardId },
      data: { ratingAverage: avg._avg.score },
    });

    return res.status(201).json(rating);
  } catch (error) {
    console.error("Erro ao avaliar ficha:", error);
    return res.status(500).json({ error: "Erro ao avaliar ficha." });
  }
});

export { router as ratingRoutes };