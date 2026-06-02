# styles.md

# STYLES

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

A pasta `styles` é responsável por armazenar todos os arquivos CSS do frontend.

Os estilos foram separados de forma organizada para facilitar:

* manutenção;
* escalabilidade;
* reutilização;
* localização dos arquivos.

---

# Estrutura

```txt id="1h4vl4"
styles/
├── components/
├── modals/
├── pages/
├── popups/
└── sections/
```

---

# styles/components

Contém os estilos dos componentes reutilizáveis da aplicação.

Exemplos:

* header;
* botões;
* navegação;
* componentes globais.

---

# styles/modals

Contém os estilos exclusivos dos modais da aplicação.

Exemplos:

* login modal;
* expired modal;
* modais de autenticação.

---

# styles/popups

Contém os estilos dos popups do sistema.

Os popups são elementos flutuantes reutilizáveis utilizados para:

* detalhes;
* informações;
* vantagens;
* descrições;
* janelas auxiliares.

Exemplos:

* popupDetails;
* advantagensPopup;
* popups futuros.

---

# styles/pages

Contém os estilos específicos de cada página.

Exemplos:

* home;
* create;
* páginas futuras do sistema.

---

# styles/sections

Contém os estilos das sections principais da página `create.jsx`.

Essa pasta centraliza estilos reutilizados entre múltiplas sections.

---

# sectionsCreate.css

Arquivo de estilo global utilizado pelas 4 sections principais da tela de criação.

Responsável por padronizar:

* estrutura;
* espaçamento;
* alinhamento;
* responsividade;
* organização visual.

---

# Sections atuais

As sections compartilhadas atualmente são:

* BasicSection
* CharacteristicsSection
* ModifiersSection
* SpecializationsSection

---

# Organização utilizada

O projeto separa:

* lógica;
* estrutura;
* estilização;

para manter o código mais limpo e organizado.

---

# Objetivo da separação

Essa arquitetura ajuda a:

* evitar CSS gigante;
* reduzir conflitos;
* facilitar manutenção;
* melhorar leitura do projeto;
* acelerar desenvolvimento.

---

# Exemplo organizacional

```txt id="u1w3vn"
components/
└── Header.jsx

styles/components/
└── header.css
```

---

# Vantagens

* código mais modular;
* fácil localização;
* manutenção simplificada;
* maior escalabilidade;
* melhor separação de responsabilidades.
