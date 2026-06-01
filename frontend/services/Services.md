# services.md

# SERVICES

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `services` é responsável pela comunicação do frontend com o backend.

Ela centraliza:

* requisições HTTP;
* autenticação;
* integração com API;
* controle de sessão;
* futuras integrações com banco de dados.

---

# Estrutura

```txt id="8f5n5r"
services/
├── api.js
├── apiFetch.js
└── guestSession.js
```

---

# api.js

Arquivo principal de comunicação com a API.

Responsável por:

* login;
* registro;
* sessão visitante;
* requisições HTTP do sistema.

---

# API_URL

```js id="6ct9ci"
const API_URL =
  import.meta.env.VITE_API_URL
  ?? "http://localhost:3333";
```

Define a URL base do backend.

Permite:

* alterar ambiente facilmente;
* utilizar `.env`;
* trocar entre produção e desenvolvimento.

---

# Registro

```js id="lns75l"
registerUser()
```

Responsável por criar usuários.

---

# Fluxo

```txt id="dnxw3k"
Frontend envia dados
        ↓
POST /auth/register
        ↓
Backend valida
        ↓
Usuário criado
        ↓
JWT retornado
```

---

# Login

```js id="3v9f88"
loginUser()
```

Responsável pela autenticação de usuários.

---

# Fluxo

```txt id="9nfrqy"
Usuário envia email e senha
        ↓
POST /auth/login
        ↓
Backend valida
        ↓
JWT retornado
```

---

# Sessão visitante

```js id="b6bl2j"
createGuestSession()
```

Responsável por criar sessões temporárias para visitantes.

---

# Objetivo

Permitir:

* uso do sistema sem login;
* controle de cache;
* sessão temporária;
* expiração automática.

---

# Fluxo da sessão visitante

```txt id="9dt5xv"
Usuário entra no site
        ↓
Frontend solicita guest session
        ↓
Backend gera JWT visitante
        ↓
Frontend salva guest_token
```

---

# fetch

O projeto utiliza:

```js id="3x6fr7"
fetch()
```

para realizar requisições HTTP.

---

# Headers JSON

```js id="8vop7w"
headers: {
  "Content-Type": "application/json"
}
```

Indicam ao backend que os dados enviados estão em formato JSON.

---

# Tratamento de erros

Todas as funções utilizam:

* try/catch;
* validação de response;
* retorno padronizado de erros.

---

# apiFetch.js

Arquivo reservado para futuras integrações avançadas da API.

Atualmente ainda não está sendo utilizado.

---

# Possível utilização futura

O arquivo poderá ser utilizado para:

* sistema global de fetch;
* interceptadores;
* cache;
* autenticação automática;
* integração com seeds;
* carregamento de dados do banco.

---

# Seeds futuras

Existe planejamento para utilização de:

* Prisma Seeds;
* alimentação automática do banco;
* dados iniciais do sistema.

Exemplos:

* vantagens;
* modificadores;
* especializações;
* características;
* conteúdo de RPG.

---

# guestSession.js

Arquivo auxiliar responsável pela sessão visitante.

---

# Função principal

```js id="eqjhnn"
createGuestSession()
```

Responsável por:

* solicitar token visitante;
* salvar guest_token;
* inicializar sessão temporária.

---

# LocalStorage

```js id="6br5ww"
localStorage.setItem(
  "guest_token",
  response.data.guestToken
)
```

Salva o token visitante localmente.

---

# Objetivo da separação

Separar serviços da interface ajuda a:

* manter código limpo;
* facilitar manutenção;
* reutilizar funções;
* evitar lógica duplicada.

---

# Fluxo arquitetural

```txt id="yw2m63"
Component
    ↓
Services
    ↓
API Backend
    ↓
Prisma
    ↓
SQLite
```

---

# Vantagens da arquitetura

* organização;
* reutilização;
* separação de responsabilidades;
* manutenção simplificada;
* escalabilidade futura.
