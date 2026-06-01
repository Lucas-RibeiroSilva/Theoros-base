# PRISMA
## Crtl + Shift + V para melhor visualização (Isso no VsCode)

Documentação responsável pelo banco de dados do projeto.

---

# Tecnologias utilizadas

* Prisma ORM
* SQLite

---

# Estrutura da pasta

```txt
prisma/
├── dev.db
└── schema.prisma
```

---

# dev.db

Arquivo físico do banco de dados SQLite.

Responsável por armazenar:

* usuários;
* tabelas;
* registros;
* relacionamentos;
* dados persistidos da aplicação.

O SQLite é um banco de dados local baseado em arquivo, ideal para:

* projetos pequenos;
* protótipos;
* desenvolvimento local;
* aplicações simples.

---

# schema.prisma

Arquivo principal do Prisma.

Responsável por:

* definir models;
* criar tabelas;
* configurar banco de dados;
* gerar o Prisma Client.

---

# Configuração do Prisma Client

```prisma
generator client {
  provider = "prisma-client-js"
}
```

O Prisma Client é gerado automaticamente com base no schema e fornece métodos para:

* criar;
* buscar;
* atualizar;
* deletar dados.

Exemplo:

```js
prisma.user.create()
prisma.user.findUnique()
prisma.user.findFirst()
```

---

# Configuração do banco de dados

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Define:

* o tipo do banco;
* a URL de conexão;
* o ambiente utilizado.

A variável `DATABASE_URL` fica no arquivo `.env`.

Exemplo:

```env
DATABASE_URL="file:./dev.db"
```

---

# Model User

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

Representa a tabela de usuários do sistema.

---

# Campos

## id

```prisma
id Int @id @default(autoincrement())
```

* chave primária;
* identificador único;
* valor incremental automático.

---

## username

```prisma
username String @unique
```

Nome do usuário.

O atributo `@unique` impede usuários duplicados.

---

## email

```prisma
email String @unique
```

Email do usuário.

Também possui restrição de unicidade.

---

## password

```prisma
password String
```

Armazena a senha criptografada utilizando bcrypt.

Nunca deve armazenar senhas puras.

---

## createdAt

```prisma
createdAt DateTime @default(now())
```

Data de criação automática do usuário.

O Prisma preenche o valor automaticamente ao criar o registro.

---

# Fluxo do Prisma no projeto

```txt
schema.prisma
      ↓
Prisma Generate
      ↓
Prisma Client
      ↓
Backend utiliza prisma.user
      ↓
Banco SQLite (dev.db)
```

---

# Comandos úteis

## Gerar Prisma Client

```bash
npx prisma generate
```

---

## Criar migration

```bash
npx prisma migrate dev
```

---

## Abrir Prisma Studio

```bash
npx prisma studio
```

Interface visual para visualizar e editar o banco.
