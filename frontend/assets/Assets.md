# ASSETS

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `assets` é responsável pelos arquivos estáticos utilizados no frontend.

Ela centraliza recursos visuais e sonoros do sistema.

---

# Objetivo

Organizar arquivos estáticos ajuda a:

* manter o projeto limpo;
* separar mídia da lógica;
* facilitar manutenção;
* melhorar escalabilidade;
* reutilizar recursos visuais.

---

# Estrutura

```txt id="hivjga"
assets/
├── icons/
├── images/
└── sounds/
```

---

# icons

```txt id="w00lcn"
assets/icons/
```

Pasta responsável pelos ícones utilizados no sistema.

---

# Exemplos

Pode armazenar:

* ícones SVG;
* ícones PNG;
* símbolos;
* pequenos elementos visuais;
* logos;
* botões personalizados.

---

# Uso dos ícones

Os ícones podem ser utilizados em:

* menus;
* botões;
* painéis;
* popups;
* modais;
* navegação;
* indicadores visuais.

---

# images

```txt id="76l20d"
assets/images/
```

Pasta responsável pelas imagens do sistema.

---

# Exemplos

Pode armazenar:

* wallpapers;
* backgrounds;
* ilustrações;
* banners;
* artes do sistema;
* imagens de personagens;
* imagens temáticas.

---

# Objetivo visual

As imagens ajudam na:

* ambientação RPG;
* identidade visual;
* experiência do usuário;
* imersão do sistema.

---

# sounds

```txt id="eqbxca"
assets/sounds/
```

Pasta responsável pelos sons e efeitos sonoros.

---

# Exemplos

Pode armazenar:

* efeitos sonoros;
* sons de interface;
* música ambiente;
* feedback sonoro;
* alertas;
* notificações.

---

# Possíveis usos

Os sons poderão ser utilizados em:

* abertura de popups;
* notificações;
* ações importantes;
* ambientação;
* menus;
* eventos especiais.

---

# Organização recomendada

Conforme o projeto crescer, cada pasta poderá possuir subdivisões.

Exemplo:

```txt id="xq9yxq"
assets/
├── icons/
│   ├── ui/
│   ├── menu/
│   └── status/
│
├── images/
│   ├── backgrounds/
│   ├── characters/
│   └── illustrations/
│
└── sounds/
    ├── ui/
    ├── combat/
    └── ambient/
```

---

# Objetivo arquitetural

A pasta `assets` foi criada para centralizar todos os recursos visuais e sonoros da aplicação.

Isso melhora:

* organização;
* padronização;
* reutilização;
* manutenção futura.

---

# Fluxo geral

```txt id="85g9m4"
assets
    ↓
components
    ↓
pages
    ↓
interface renderizada
```

---

# Arquitetura atual

O frontend foi estruturado para permitir:

* expansão visual;
* personalização;
* ambientação RPG;
* reutilização de recursos;
* crescimento modular.
