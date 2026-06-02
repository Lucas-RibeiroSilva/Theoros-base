# PAGES

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `pages` é responsável pelas páginas principais do site.

Cada arquivo representa uma rota da aplicação.

---

# Estrutura

```txt id="p4ajtr"
pages/
├── errors/
│
├── create.jsx
├── documentation.jsx
├── home.jsx
├── profile.jsx
└── searchCards.jsx
```

---

# Objetivo

Separar as páginas em uma pasta dedicada ajuda a:

* organizar o projeto;
* facilitar manutenção;
* melhorar escalabilidade;
* separar páginas de componentes reutilizáveis.

---

# home.jsx

Página inicial do site.

Responsável por:

* recepcionar usuários;
* apresentar o sistema;
* acesso ao login;
* navegação inicial;
* entrada para criação de fichas.

---

# create.jsx

Página de criação de fichas.

Responsável por:

* criação de personagens;
* edição;
* gerenciamento das sections;
* atributos;
* modificadores;
* especializações;
* características.

---

# profile.jsx

Página de perfil do usuário.

Responsável por:

* informações da conta;
* dados do usuário;
* futuras configurações;
* gerenciamento pessoal.

---

# searchCards.jsx

Página responsável pela busca de fichas.

Objetivo:

* pesquisar personagens;
* filtrar fichas;
* localizar criações públicas;
* sistema de busca do banco de dados.

---

# documentation.jsx

Página de documentação do sistema.

Responsável por:

* referências utilizadas;
* créditos;
* fontes;
* bibliotecas;
* tecnologias;
* documentação pública do projeto.

---

# Pasta errors

```txt id="0hrqkg"
pages/errors/
```

Pasta responsável pelas páginas de erro do sistema.

Essas páginas aparecem quando ocorre algum problema durante a navegação.

---

# Objetivo da pasta errors

Melhorar:

* experiência do usuário;
* feedback visual;
* identificação de problemas;
* personalização dos erros do sistema.

---

# Exemplo: Error 404

Caso o usuário tente acessar uma rota inexistente:

```txt id="n5p1ic"
Error 404:
Não foi possível encontrar essa página.
```

A página pode exibir:

* mensagem personalizada;
* ilustração temática;
* botão para voltar;
* ambientação RPG.

---

# Exemplo visual

```txt id="ybjlwm"
⚔ Um aventureiro se perdeu pelo reino...
```

---

# Outros erros planejados

A pasta também poderá conter páginas para:

* servidor em manutenção;
* backend offline;
* erro 500;
* sistema indisponível;
* falha de autenticação;
* perda de conexão;
* permissões inválidas.

---

# Objetivo visual

Os erros serão adaptados para o universo do projeto.

Exemplos:

* aventureiros perdidos;
* pergaminhos corrompidos;
* castelos fechados;
* portais instáveis.

---

# Organização arquitetural

```txt id="mwjlwm"
pages/
    ↓
Rotas do sistema
    ↓
Cada arquivo = uma página
```

---

# Diferença entre pages e components

## pages

Representam:

* telas completas;
* rotas;
* páginas do sistema.

---

## components

Representam:

* partes reutilizáveis;
* elementos menores;
* blocos compartilhados.

---

# Exemplo

```txt id="2dcnl6"
pages/
└── home.jsx

components/
└── Header.jsx
```

---

# Arquitetura atual

O sistema foi planejado para crescer de forma modular.

Novas páginas poderão ser adicionadas facilmente mantendo:

* organização;
* escalabilidade;
* separação de responsabilidades.
