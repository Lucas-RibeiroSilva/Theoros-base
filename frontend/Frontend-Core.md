# FRONTEND CORE

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

Documentação dos arquivos centrais do frontend.

Responsáveis por:

* inicialização React;
* roteamento;
* controle global;
* sessão;
* modais globais;
* estrutura principal da aplicação.

---

# Estrutura

```txt
src/
├── main.jsx
├── App.jsx
│
├── pages/
├── components/
├── services/
└── styles/
```

---

# main.jsx

Arquivo principal do React.

Responsável por:

* iniciar a aplicação;
* renderizar o React;
* habilitar roteamento;
* conectar o App ao DOM.

---

# Código

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

---

# createRoot

```js
createRoot(document.getElementById("root"))
```

Conecta o React ao elemento HTML principal:

```html
<div id="root"></div>
```

Sem isso:

* o React não aparece na tela.

---

# StrictMode

```jsx
<StrictMode>
```

Ferramenta do React para desenvolvimento.

Ajuda a detectar:

* problemas;
* práticas inseguras;
* ciclos incorretos;
* efeitos colaterais.

Só funciona em desenvolvimento.

---

# BrowserRouter

```jsx
<BrowserRouter>
```

Responsável pelo sistema de rotas do React Router.

Permite:

* múltiplas páginas;
* navegação SPA;
* URLs dinâmicas;
* navegação sem reload.

---

# App.jsx

Componente principal da aplicação.

Responsável por:

* rotas;
* sessão global;
* logout global;
* modal de expiração;
* gerenciamento de autenticação.

---

# Rotas

```jsx
<Routes>
  <Route path="/" />
  <Route path="/create" />
</Routes>
```

Define as páginas do sistema.

---

# Como criar uma rota

```jsx
<Route
  path="/create"
  element={<Create />}
/>
```

---

## path

Define a URL da página.

Exemplo:

```txt
/create
```

---

## element

Define qual componente será renderizado na rota.

---

# Rotas públicas

Rotas públicas podem ser acessadas por qualquer usuário.

Exemplo:

```jsx
<Route
  path="/"
  element={<Home />}
/>
```

---

# Rotas protegidas

Rotas protegidas exigem autenticação.

O projeto utiliza o componente:

```jsx
<ProtectedRoute>
```

para impedir acesso sem login.

---

## Exemplo

```jsx
<Route
  path="/create"
  element={
    <ProtectedRoute>
      <Create />
    </ProtectedRoute>
  }
/>
```

---

# Funcionamento

```txt
Usuário acessa rota
        ↓
ProtectedRoute verifica token
        ↓
Token existe?
    ├── Sim → libera acesso
    └── Não → redireciona
```

---

# Home

```jsx
<Route path="/" element={<Home />} />
```

Página inicial da aplicação.

---

# Create

```jsx
<Route path="/create" element={<Create />} />
```

Página de criação de fichas.

---

# SessionManager

```jsx
<SessionManager>
```

Componente responsável pelo gerenciamento global de sessão.

Controla:

* JWT;
* sessão visitante;
* expiração;
* logout automático;
* timers globais.

---

# Modal global

```jsx
const [showExpiredModal, setShowExpiredModal]
```

Estado global utilizado para exibir:

* aviso de sessão expirada;
* timeout automático;
* logout por expiração.

---

# Logout global

```js
const handleLogout = ()
```

Responsável por:

* remover tokens;
* limpar sessão;
* redirecionar usuário;
* abrir modal de expiração.

---

# Tokens removidos

```js
localStorage.removeItem("token")
localStorage.removeItem("username")
localStorage.removeItem("guest_token")
```

---

# Fluxo do logout automático

```txt
Token expira
      ↓
SessionManager detecta
      ↓
handleLogout(true)
      ↓
Modal aparece
      ↓
Usuário retorna para Home
```

---

# useNavigate

```js
const navigate = useNavigate()
```

Permite navegação programática.

Exemplo:

```js
navigate("/")
```

---

# Estrutura arquitetural

```txt
main.jsx
    ↓
BrowserRouter
    ↓
App.jsx
    ↓
SessionManager
    ↓
Routes
    ↓
Pages
```

---

# Organização de estilos

O projeto utiliza CSS separado por responsabilidade:

```txt
styles/
├── pages/
├── components/
└── modals/
```

---

# Sobre App.css e index.css

Os arquivos padrão do Vite:

```txt
App.css
index.css
```

podem ser removidos caso:

* não estejam sendo utilizados;
* todos os estilos estejam modularizados.

Isso melhora:

* organização;
* manutenção;
* escalabilidade;
* separação de responsabilidades.

---

# Arquitetura atual

O frontend foi estruturado utilizando:

* React;
* React Router;
* gerenciamento global simples;
* SessionManager;
* componentes reutilizáveis;
* separação por páginas e componentes.

---

# Fluxo geral do frontend

```txt
Usuário entra
      ↓
main.jsx inicia React
      ↓
BrowserRouter controla rotas
      ↓
App.jsx carrega estrutura
      ↓
SessionManager valida sessão
      ↓
Página é renderizada
```
