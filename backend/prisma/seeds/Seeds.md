# SEEDS

## Crtl + Shift + V para melhor visualização (Isso no VsCode)

Documentação responsável pelos seeds do banco de dados.

Os seeds serão utilizados para popular automaticamente o banco com os dados principais do sistema.

---

# Objetivo

Os seeds servirão para inserir:

* vantagens;
* desvantagens;
* perícias;
* ampliações;
* limitações;
* técnicas;
* mágias.

---

# O que é um Seed?

Seed é um arquivo responsável por popular o banco automaticamente.

Exemplo:

```bash
npx prisma db seed
```

Ao executar:

* o Prisma cria dados automáticos;
* insere conteúdo inicial;
* alimenta o banco;
* evita cadastro manual.

---

# Objetivo no Theoros

O sistema utilizará seeds para:

* automatizar conteúdo;
* facilitar manutenção;
* facilitar atualização;
* organizar regras;
* acelerar desenvolvimento;
* padronizar informações.

---

# Estrutura planejada

```txt
prisma/
├── schema.prisma
├── dev.db
└── seeds/
    ├── advantages.js
    ├── disadvantages.js
    ├── skills.js
    ├── enhancements.js
    ├── limitations.js
    ├── techniques.js
    └── spells.js
```

---

# Explicação dos arquivos

## advantages.js

Responsável pelas:

* vantagens;
* bônus;
* habilidades especiais.

---

## disadvantages.js

Responsável pelas:

* desvantagens;
* penalidades;
* limitações negativas.

---

## skills.js

Responsável pelas:

* perícias;
* habilidades treinadas;
* conhecimentos.

---

## enhancements.js

Responsável pelas:

* ampliações;
* melhorias;
* modificadores positivos.

---

## limitations.js

Responsável pelas:

* limitações;
* restrições;
* modificadores negativos.

---

## techniques.js

Responsável pelas:

* técnicas;
* especializações avançadas;
* aprimoramentos específicos.

---

## spells.js

Responsável pelas:

* mágias;
* feitiços;
* habilidades mágicas.

---

# Exemplo de Seed

```js
const advantages = [
  {
    internalId: "boa_audicao",
    name: "Boa Audição",
    cost: 15
  }
]
```

---

# Fluxo

```txt
Seeds
↓
Prisma
↓
Banco de dados
↓
API
↓
Frontend
↓
Usuário visualiza informações
```

---

# Vantagens dos Seeds

* automatização;
* organização;
* escalabilidade;
* facilidade de atualização;
* facilidade para testes;
* sincronização rápida;
* banco sempre consistente.

---

# Objetivo futuro

Permitir:

* milhares de registros;
* expansão modular;
* múltiplos sistemas RPG;
* sincronização automática;
* regras automatizadas;
* carregamento dinâmico de conteúdo.

---

# Arquitetura planejada

```txt
Seeds
↓
Prisma
↓
Banco de dados
↓
Backend
↓
Frontend
↓
Ficha do personagem
```

---

# Objetivo final

Criar um sistema capaz de:

* alimentar automaticamente o banco;
* manter regras organizadas;
* sincronizar sistemas;
* facilitar expansão futura;
* automatizar dados do RPG.
