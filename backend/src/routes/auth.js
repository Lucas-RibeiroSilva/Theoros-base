import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = Router();
// Instância do Prisma Client para interagir com o banco PostgreSQL.
// O Prisma Client é gerado automaticamente com base no schema.prisma e nos modelos definidos lá. Ele fornece métodos para criar, ler, atualizar e deletar dados no banco de dados de forma fácil e segura.
const prisma = new PrismaClient();

// ────────────────────────────── MIDDLEWARE ──────────────────────────────────────

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

// ────────────────────────────── SESSÃO VISITANTE ────────────────────────────────

router.post("/guest-session", (req, res) => {
  const guestToken = jwt.sign({ guest: true }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.json({ guestToken });
});

// ────────────────────────────── REGISTRO ────────────────────────────────────────

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const userExists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (userExists) {
      return res
        .status(409)
        .json({ error: "E-mail ou usuário já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: user.id, username: user.username, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res
      .status(201)
      .json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// ────────────────────────────── LOGIN ───────────────────────────────────────────

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// ────────────────────────────── HOME (rota protegida de teste) ──────────────────

router.get("/home", authMiddleware, (req, res) => {
  return res.json({ message: "Usuário autenticado", user: req.user });
});

export { router as authRoutes };
