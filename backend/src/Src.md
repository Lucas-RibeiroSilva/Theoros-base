# SRC
## Crtl + Shift + V para melhor visualização (Isso no VsCode)


A pasta `src` contém todo o núcleo do backend da aplicação.

É nela que ficam:

* servidor;
* rotas;
* autenticação;
* middlewares;
* lógica principal da API.

---

# Estrutura

```txt
src/
├── routes/
│   └── auth.js
│
└── server.js
```

---

# server.js

Arquivo principal do backend.

Responsável por:

* iniciar o servidor;
* configurar middlewares;
* habilitar CORS;
* registrar rotas;
* definir porta da aplicação.

---

# Importações

```js
import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/auth.js'
```

---

## Express

Framework responsável pelo servidor HTTP.

Permite:

* criar rotas;
* receber requisições;
* enviar respostas;
* criar APIs REST.

---

## CORS

Middleware de segurança.

Permite comunicação entre:

* frontend;
* backend.

Sem ele, o navegador bloquearia requisições vindas de outra porta.

---

# Instância do servidor

```js
const app = express()
```

Cria a aplicação Express.

---

# Porta do servidor

```js
const PORT = process.env.PORT || 3333
```

Define:

* porta personalizada via `.env`;
* fallback para porta `3333`.

---

# Configuração do CORS

```js
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

Permite requisições do frontend Vite.

---

# JSON Middleware

```js
app.use(express.json())
```

Permite que o Express interprete:

* JSON;
* req.body.

Sem isso:

* `req.body` seria undefined.

---

# Rotas

```js
app.use('/auth', authRoutes)
```

Registra todas as rotas de autenticação.

Exemplo:

```txt
/auth/login
/auth/register
/auth/guest-session
```

---

# Inicialização do servidor

```js
app.listen(PORT, () => {})
```

Inicia o backend.

---

# Terminal personalizado

O projeto utiliza uma mensagem personalizada no terminal para:

* indicar que a API iniciou;
* exibir informações do backend;
* melhorar visualização durante desenvolvimento.

---

# Fluxo do backend

```txt
Frontend
    ↓
Express Server
    ↓
Routes
    ↓
Prisma
    ↓
SQLite
```
