import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const router = Router();
// Instância do Prisma Client para interagir com o banco de dados (SQLite)
// O Prisma Client é gerado automaticamente com base no schema.prisma e nos modelos definidos lá. Ele fornece métodos para criar, ler, atualizar e deletar dados no banco de dados de forma fácil e segura.
const prisma = new PrismaClient();

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
    return (
      res.status(401).json({ error: "Token inválido ou expirado" }),
      console.log("🥚")
    );
  }
}

/*
──────────────────── SESSÃO VISITANTE ────────────────────
Cria um token temporário para visitantes
──────────────────────────────────────────────────────────
*/

router.post("/guest-session", (req, res) => {
  const guestToken = jwt.sign(
    {
      guest: true,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  return res.json({
    guestToken,
  });
});

// ────────────────────────────── REGISTRO ──────────────────────────────────────────

/*
──────────────────── Fluxo ────────────────────
Recebe os dados → Verifica se já existe →  Criptografa a senha → Salva no banco → Gera um token → Devolve pro frontend
───────────────────────────────────────────────
*/

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Verificações básicas
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const userExists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (userExists) {
    return res.status(409).json({ error: "E-mail ou usuário já cadastrado." });
  }

  /*
  bcrypt transforma a senha em um código irreversível.
  Mesmo que o banco vaze, ninguém consegue ler a senha original. 
  O número 10 é o custo do hashing, ou seja, quantas vezes o algoritmo vai rodar para gerar o hash. 
  Quanto maior, mais seguro, mas também mais lento. 
  */

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  /*
  JWT (token) é como um "crachá" que o usuário carrega. 
  Toda vez que fizer uma ação, apresenta esse crachá para provar quem é.
  */

  const token = jwt.sign(
    // O payload do token inclui o ID e o nome de usuário do usuário autenticado. Isso pode ser útil para identificar o usuário em futuras requisições.
    { id: user.id, username: user.username },
    // A chave secreta é usada para assinar o token e garantir que ele não seja falsificado. Mantenha essa chave segura e não a compartilhe publicamente.
    process.env.JWT_SECRET,
    // O token expira em 7 dias, ou seja, o usuário precisará fazer login novamente após esse período para obter um novo token.
    { expiresIn: "7d" },
  );

  return res.status(201).json({ token, username: user.username });
});

// ────────────────────────────── LOGIN ─────────────────────────────────────────────

/*
──────────────────── Fluxo ────────────────────
Recebe email e senha → Busca o usuário no banco → Compara a senha com o hash → Gera um token → Devolve pro frontend
───────────────────────────────────────────────
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return res.json({ token, username: user.username });
});

router.get("/home", authMiddleware, (req, res) => {
  return res.json({
    message: "Usuário autenticado",
    user: req.user,
  });
});

// ────────────────────────────── LISTA DE TODAS AS VANTAGENS ─────────────────────────────────────────────

/*
──────────────────── Fluxo ────────────────────
Recebe a requisição → Verifica o token → Busca todas as vantagens no banco → Devolve pro frontend
───────────────────────────────────────────────
*/

router.get("/advantages", async (req, res) => {
  try {
    const advantages = await prisma.advantage.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    res.json(advantages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar vantagens",
    });
  }
});

export { router as authRoutes };