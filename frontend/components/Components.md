# COMPONENTS

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `components` é responsável pelos componentes reutilizáveis do sistema.

Os componentes representam partes menores da interface que podem ser reutilizadas em diferentes páginas.

---

# Objetivo

Separar componentes ajuda a:

* evitar repetição;
* modularizar o sistema;
* facilitar manutenção;
* melhorar organização;
* reutilizar interface e lógica.

---

# Estrutura

```txt
components/
├── cards/
│   ├── basic/
│   │   └── basic.jsx
│   │
│   ├── characteristics/
│   │   └── characteristics.jsx
│   │
│   ├── modifiers/
│   │   └── modifiers.jsx
│   │
│   ├── specializations/
│   │   └── specializations.jsx
│   │
│   └── pointsPainel.jsx
│
├── modals/
│   ├── expiredModal.jsx
│   └── loginModal.jsx
│
├── stores/
│   └── cardStore.js
│
├── completeSheet.jsx
├── header.jsx
├── loading.jsx
├── menu.jsx
├── protectedRoute.jsx
└── sessionManager.jsx
```

---

# Diferença entre pages e components

## pages

Representam:

* páginas completas;
* telas;
* rotas do sistema.

---

## components

Representam:

* partes reutilizáveis;
* blocos menores;
* elementos compartilhados.

---

# Pasta cards

```txt
components/cards/
```

Contém as sections principais da página `create.jsx`.

Cada card representa uma parte da criação da ficha do personagem.

---

# Organização dos cards

Cada card possui sua própria pasta.

Essa estrutura facilita:

* crescimento futuro;
* separação de lógica;
* modularização;
* manutenção;
* expansão individual de cada sistema.

---

# basic/basic.jsx

Section responsável pelas informações básicas do personagem.

---

# Funções principais

Permite:

* upload de imagem;
* preview da imagem;
* nome;
* gênero;
* idade;
* raça;
* altura;
* atributos;
* história;
* alinhamento.

---

# Preview de imagem

```js
URL.createObjectURL(file)
```

Cria uma URL temporária para mostrar a imagem antes do upload.

---

# Validação de inputs

O componente possui filtros básicos para:

* impedir números em nomes;
* impedir letras em atributos numéricos;
* limitar caracteres;
* validar dados simples.

---

# Organização da BasicSection

```txt
BasicSection
├── Informações básicas
├── Atributos
└── História
```

---

# characteristics/characteristics.jsx

Responsável pelas:

* vantagens;
* desvantagens.

---

# Funcionalidades planejadas

O sistema permitirá:

* busca;
* filtros;
* categorias;
* popup de detalhes;
* fórmulas;
* explicações;
* adição automática.

---

# Sistema de vantagens/desvantagens

Cada item terá:

* nome;
* descrição;
* custo;
* fórmula;
* requisitos;
* restrições.

---

# Popup de informações

Ao clicar no ícone:

```txt
ℹ
```

um popup exibirá:

* descrição completa;
* funcionamento;
* fórmula;
* explicação matemática.

---

# Adição de vantagens

O botão:

```txt
+
```

abrirá uma lista para adicionar vantagens ou desvantagens.

---

# Sistema de bloqueios

Planejamento futuro:

O sistema impedirá combinações inválidas.

Exemplo:

```txt
Desvantagem:
Surdo

↓

Bloqueia:

Vantagem:
Boa Audição
```

---

# modifiers/modifiers.jsx

Funcionará de forma semelhante ao `characteristics.jsx`.

---

# Objetivo

Gerenciar:

* ampliações;
* limitações;
* modificadores especiais.

---

# Funcionalidades planejadas

* filtros;
* busca;
* popup de detalhes;
* fórmulas;
* regras automáticas;
* cálculos dinâmicos.

---

# specializations/specializations.jsx

Responsável pelas:

* perícias;
* técnicas;
* mágias.

---

# Sistema planejado

Permitirá:

* pesquisa;
* filtros;
* especializações;
* popup informativo;
* gerenciamento automático.

---

# pointsPainel.jsx

Painel responsável pelos pontos do personagem.

---

# Objetivo

Mostrar:

* pontos disponíveis;
* gastos;
* bônus;
* penalidades;
* alterações automáticas.

---

# Funcionalidades planejadas

O painel terá:

## canto superior direito

```txt
✏ (Lápis)
```

Permite editar os pontos totais.

---

## canto superior esquerdo

```txt
ℹ
```

Abre um popup mostrando:

* origem dos gastos;
* bônus;
* modificações aplicadas.

---

# Exemplo

```txt
+20 = +2 ST
-20 = Desvantagem: Surdo
```

---

# Sistema GURPS

O sistema seguirá a lógica do GURPS:

```txt
+ = gasta pontos
- = adiciona pontos
```

---

# Pasta stores

```txt
components/stores/
```

Responsável pelo gerenciamento de estados e cálculos globais da ficha.

---

# cardStore.js

Arquivo responsável pelo gerenciamento automático dos dados da ficha.

---

# Objetivo

Centralizar:

* cálculos;
* regras;
* modificações;
* sincronização;
* atualização automática.

---

# Sistema automático

Quando uma vantagem for adicionada:

```txt
Vantagem:
+4 ST
```

o sistema automaticamente:

* altera atributos;
* recalcula pontos;
* atualiza painel;
* sincroniza sections.

---

# Futuro do sistema

O `cardStore.js` poderá controlar:

* estado global;
* cálculos avançados;
* regras automáticas;
* dependências;
* validações;
* conflitos entre vantagens.

---

# Pasta modals

```txt
components/modals/
```

Contém os modais reutilizáveis do sistema.

---

# expiredModal.jsx

Modal exibido quando:

* sessão expira;
* token vence;
* logout automático acontece.

---

# loginModal.jsx

Modal responsável pela autenticação do usuário.

Permite:

* login;
* acesso rápido;
* autenticação sem trocar de página.

---

# completeSheet.jsx

Componente responsável pela ficha completa do personagem.

Planejado para:

* visualização final;
* exportação;
* resumo completo;
* futuras funcionalidades PDF.

---

# header.jsx

Componente reutilizável do cabeçalho.

Responsável por:

* título do sistema;
* nome do usuário;
* logout;
* navegação superior.

---

# loading.jsx

Componente de carregamento da aplicação.

Utilizado para:

* carregamento de páginas;
* espera de dados;
* feedback visual.

---

# menu.jsx

Responsável pelo menu de navegação da aplicação.

Planejado para:

* navegação rápida;
* menu responsivo;
* atalhos;
* organização da interface.

---

# protectedRoute.jsx

Responsável por proteger rotas privadas.

Impede acesso sem login.

---

# sessionManager.jsx

Gerencia:

* sessão global;
* JWT;
* sessão visitante;
* logout automático;
* timers globais.

---

# Organização arquitetural

```txt
Pages
    ↓
Components
    ↓
Stores
    ↓
Services
    ↓
Backend
```

---

# Arquitetura planejada

O projeto foi estruturado para crescer de forma modular.

A ideia é permitir:

* novas regras;
* novos sistemas;
* expansão das fichas;
* automações complexas;
* integração total entre componentes.
