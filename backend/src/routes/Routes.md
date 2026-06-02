# ROUTES
## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `routes` é responsável pelas rotas da API.

Cada arquivo define:

* endpoints;
* autenticação;
* validações;
* regras de negócio;
* respostas do backend.

---

# Estrutura

```txt
routes/
└── auth.js
```

---

# auth.js

Responsável por:

* login;
* registro;
* autenticação JWT;
* middleware de autenticação;
* sessão visitante.

---

# Tecnologias utilizadas

* Express Router
* JWT
* bcrypt
* Prisma ORM

---

# Router

```js
const router = Router()
```

Permite organizar rotas separadamente do servidor principal.

---

# Prisma Client

```js
const prisma = new PrismaClient()
```

Responsável pela comunicação com o banco de dados.

Permite:

* criar usuários;
* buscar registros;
* atualizar dados;
* deletar informações.

---

# authMiddleware

Middleware responsável por proteger rotas privadas.

---

# Funcionamento

```txt
Frontend envia token
        ↓
Authorization: Bearer TOKEN
        ↓
Backend verifica JWT
        ↓
Token válido?
    ├── Sim → continua
    └── Não → erro 401
```

---

# guest-session

```js
POST /guest-session
```

Cria um token temporário para visitantes.

---

# Objetivo

Permitir:

* sessões temporárias;
* controle de cache;
* expiração automática;
* persistência limitada.

---

# Registro

```js
POST /register
```

Responsável por criar novos usuários.

---

# Fluxo

```txt
Recebe dados
    ↓
Verifica duplicidade
    ↓
Criptografa senha
    ↓
Cria usuário
    ↓
Gera JWT
    ↓
Retorna token
```

---

# bcrypt

```js
bcrypt.hash(password, 10)
```

Transforma a senha em hash criptografado.

O número `10` representa o custo computacional do algoritmo.

---

# JWT

```js
jwt.sign()
```

Cria um token autenticado.

O token funciona como:

* credencial;
* sessão;
* identificação do usuário.

---

# Login

```js
POST /login
```

Responsável por autenticar usuários existentes.

---

# Fluxo

```txt
Recebe email e senha
        ↓
Busca usuário
        ↓
Compara senha
        ↓
Gera JWT
        ↓
Retorna token
```

---

# Rota protegida

```js
GET /home
```

Exemplo de rota privada.

Só pode ser acessada com token válido.

---

# Estrutura JWT

```txt
HEADER
PAYLOAD
SIGNATURE
```

---

# Informações armazenadas no token

```js
{
  id,
  username
}
```

---

# Segurança

O backend utiliza:

* hash de senha;
* JWT assinado;
* middleware de autenticação;
* validações básicas;
* expiração automática de token.

---

# Fluxo completo de autenticação

```txt
Usuário faz login
        ↓
Backend gera JWT
        ↓
Frontend salva token
        ↓
Frontend envia token
        ↓
authMiddleware valida
        ↓
Acesso liberado
```
