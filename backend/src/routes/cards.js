import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "./auth.js";

const router = Router();
const prisma = new PrismaClient();

const cardInclude = {
  race: true,
  traits: { include: { trait: true } },
  limitations: { include: { limitation: true } },
  expertises: { include: { expertise: true } },
  expansions: { include: { expansion: true } },
  magics: { include: { magic: true } },
  techniques: { include: { technique: true } },
};

// GET /cards — lista todas as fichas (público)
router.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      include: cardInclude,
    });

    return res.json(cards);
  } catch (error) {
    console.error("Erro ao buscar fichas:", error);
    return res.status(500).json({ error: "Erro ao buscar fichas." });
  }
});

// GET /cards/:id — busca uma ficha por ID (público)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { id },
      include: cardInclude,
    });

    if (!card) {
      return res.status(404).json({ error: "Ficha não encontrada." });
    }

    return res.json(card);
  } catch (error) {
    console.error("Erro ao buscar ficha:", error);
    return res.status(500).json({ error: "Erro ao buscar ficha." });
  }
});

// POST /cards — cria uma nova ficha (requer autenticação)
router.post("/", authMiddleware, async (req, res) => {
  const {
    name, image, gender, height, age, raceId,
    strength, life, dexterity, intelligence,
    perception, willing, history, alignment,
  } = req.body;

  if (!name || strength == null || life == null || dexterity == null ||
      intelligence == null || perception == null || willing == null) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const card = await prisma.card.create({
      data: {
        userId: req.user.id,
        name, image, gender, height, age, raceId,
        strength, life, dexterity, intelligence,
        perception, willing, history, alignment,
      },
    });

    return res.status(201).json(card);
  } catch (error) {
    console.error("Erro ao criar ficha:", error);
    return res.status(500).json({ error: "Erro ao criar ficha." });
  }
});

// PUT /cards/:id — atualiza uma ficha (requer autenticação e ser dono)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({ where: { id } });

    if (!card) {
      return res.status(404).json({ error: "Ficha não encontrada." });
    }

    // Apenas o dono ou um admin pode editar
    if (card.userId !== req.user.id && !req.user.admin) {
      return res.status(403).json({ error: "Sem permissão para editar esta ficha." });
    }

    const updated = await prisma.card.update({
      where: { id },
      data: req.body,
    });

    return res.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar ficha:", error);
    return res.status(500).json({ error: "Erro ao atualizar ficha." });
  }
});

// DELETE /cards/:id — deleta uma ficha (requer autenticação e ser dono)
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({ where: { id } });

    if (!card) {
      return res.status(404).json({ error: "Ficha não encontrada." });
    }

    if (card.userId !== req.user.id && !req.user.admin) {
      return res.status(403).json({ error: "Sem permissão para deletar esta ficha." });
    }

    await prisma.card.delete({ where: { id } });

    return res.json({ message: "Ficha deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar ficha:", error);
    return res.status(500).json({ error: "Erro ao deletar ficha." });
  }
});

export { router as cardRoutes };