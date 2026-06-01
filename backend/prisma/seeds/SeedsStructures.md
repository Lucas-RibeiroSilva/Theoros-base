# SEEDS STRUCTURES

## Estruturas base das seeds do sistema

Documentação responsável pelas estruturas utilizadas nas seeds do banco de dados.

---

# Vantagens

```json
[
  {
    "id": "boa_audicao",

    "nome": "Boa Audição",

    "tipos": {
      "mental": false,
      "sobrenatural": false,
      "fisica": true,
      "social": false,
      "exotica": false
    },

    "custo": {
      "base": 15,
      "variavel": false,
      "valorVariavel": 0,
      "display": "15 pontos"
    },

    "nivel": {
      "permite": false,
      "atual": 0,
      "maximo": 0
    },

    "descricao": {
      "breve": "Audição acima do normal.",

      "completa":
        "O personagem possui uma audição extremamente aguçada."
    },

    "formula": {
      "valor": "",
      "descricao": ""
    },

    "requisitos": [],

    "bloqueios": [
      "surdo"
    ],

    "modificadores": [],

    "efeitos": [
      {
        "tipo": "bonus",
        "alvo": "audicao",
        "valor": 4
      }
    ]
  }
]
```

---

# Desvantagens

```json
[
  {
    "id": "surdo",

    "nome": "Surdo",

    "tipos": {
      "mental": false,
      "sobrenatural": false,
      "fisica": true,
      "social": false,
      "exotica": false
    },

    "custo": {
      "base": -20,
      "variavel": false,
      "valorVariavel": 0,
      "display": "-20 pontos"
    },

    "nivel": {
      "permite": false,
      "atual": 0,
      "maximo": 0
    },

    "descricao": {
      "breve": "O personagem não possui audição.",

      "completa":
        "O personagem é completamente incapaz de ouvir."
    },

    "formula": {
      "valor": "",
      "descricao": ""
    },

    "requisitos": [],

    "bloqueios": [
      "boa_audicao"
    ],

    "modificadores": [],

    "efeitos": [
      {
        "tipo": "penalidade",
        "alvo": "audicao",
        "valor": -999
      }
    ]
  }
]
```

---

# Ampliações

```json
[
  {
    "id": "acompanhamento",

    "nome": "Acompanhamento",

    "tipos": {
      "ataque": false,
      "efeito": true
    },

    "custo": {
      "base": 0,
      "variavel": true,
      "valorVariavel": 20,
      "display": "+20%"
    },

    "nivel": {
      "permite": false,
      "atual": 0,
      "maximo": 0
    },

    "descricao": {
      "breve": "O efeito continua acompanhando o alvo.",

      "completa":
        "A habilidade acompanha continuamente o alvo após ser ativada."
    },

    "formula": {
      "valor": "",
      "descricao": ""
    },

    "requisitos": [],

    "bloqueios": [],

    "modificadores": [],

    "efeitos": []
  }
]
```

---

# Perícias

```json
[
  {
    "id": "acrobacia",

    "nome": "Acrobacia",

    "dificuldade": {
      "facil": false,
      "media": false,
      "dificil": true,
      "muitoDificil": false
    },

    "atributo": {
      "DX": true,
      "IQ": false,
      "HT": false,
      "Will": false,
      "Per": false
    },

    "especializacao": false,

    "custo": {
      "base": 0,
      "variavel": true,
      "valorVariavel": 0,
      "display": "Variável"
    },

    "nivel": {
      "permite": true,
      "atual": 0,
      "maximo": 99
    },

    "descricao": {
      "breve": "Capacidade de realizar movimentos complexos.",

      "completa":
        "Permite executar saltos, rolamentos e manobras acrobáticas."
    },

    "formula": {
      "valor": "DX - 6",
      "descricao": "Baseada em Destreza."
    },

    "requisitos": [],

    "bloqueios": [],

    "modificadores": [
      {
        "atributo": "DX",
        "valor": -6
      }
    ],

    "efeitos": []
  }
]
```

---

# Técnicas

```json
[
  {
    "id": "arquearia_montada",

    "nome": "Arquearia Montada",

    "dificuldade": {
      "facil": false,
      "media": false,
      "dificil": true
    },

    "custo": {
      "base": 0,
      "variavel": true,
      "valorVariavel": 0,
      "display": "Variável"
    },

    "nivel": {
      "permite": true,
      "atual": 0,
      "maximo": 99
    },

    "descricao": {
      "breve": "Uso de arco enquanto montado.",

      "completa":
        "Permite utilizar arquearia de forma eficiente enquanto cavalga."
    },

    "formula": {
      "valor": "Arco - 4",
      "descricao": "Baseada na perícia Arco."
    },

    "requisitos": [
      "arco"
    ],

    "bloqueios": [],

    "modificadores": [
      {
        "pericia": "arco",
        "valor": -4
      }
    ],

    "efeitos": []
  }
]
```

---

# Mágicas

```json
[
  {
    "id": "acelerar",

    "nome": "Acelerar",

    "dificuldade": {
      "facil": false,
      "media": false,
      "dificil": true,
      "muitoDificil": false
    },

    "elemento": {
      "controleDeCorpo": true,
      "comunicacaoEmpatia": false,
      "reconhecimento": false,
      "luzTrevas": false,
      "controleMente": false,
      "metamagicas": false,
      "deslocamento": false,
      "necromancia": false,
      "protecaoAviso": false,
      "fogo": false,
      "ar": false,
      "cura": false,
      "portal": false,
      "agua": false,
      "terra": false
    },

    "tipo": {
      "comum": true,
      "informacao": false,
      "encantamento": false,
      "projetil": false,
      "bloqueio": false,
      "especial": false,
      "area": false
    },

    "duracao": 60,

    "operacao": 3,

    "custo": {
      "base": 2,
      "variavel": false,
      "valorVariavel": 0,
      "display": "2 FP"
    },

    "custoManutencao" : {
      "base" : 0,
      "mantida" : false
    },

    "nivel": {
      "permite": true,
      "atual": 0,
      "maximo": 99
    },

    "descricao": {
      "breve": "Aumenta a velocidade do alvo.",

      "completa":
        "A magia acelera temporariamente os movimentos do alvo."
    },

    "formula": {
      "valor": "",
      "descricao": ""
    },

    "requisitos": [
      {
        "habilidade": "aptidao_magica",
        "nivel": 1
      }
    ],

    "bloqueios": [],

    "modificadores": [],

    "efeitos": [
      {
        "tipo": "bonus",
        "alvo": "movimento",
        "valor": 2
      }
    ]
  }
]
```


# EXPLICAÇÃO DAS ESTRUTURAS

## Seeds do sistema

Documentação explicando a função de cada estrutura utilizada nas seeds.

---

# Vantagens

As vantagens representam:

* bônus;
* talentos;
* habilidades especiais;
* capacidades acima do normal.

Elas normalmente:

* custam pontos;
* melhoram atributos;
* concedem bônus;
* liberam habilidades.

---

# Exemplos de vantagens

* Boa Audição
* Reflexos em Combate
* Aptidão Mágica
* Memória Eidética
* Ambidestria

---

# Objetivo das vantagens

Permitir:

* personalização do personagem;
* bônus automáticos;
* construção de builds;
* habilidades únicas.

---

# Desvantagens

As desvantagens representam:

* limitações;
* problemas;
* fraquezas;
* condições negativas.

Elas normalmente:

* devolvem pontos;
* adicionam penalidades;
* dificultam ações;
* criam desafios narrativos.

---

# Exemplos de desvantagens

* Surdo
* Cego
* Covarde
* Impulsivo
* Fobia

---

# Objetivo das desvantagens

Permitir:

* equilíbrio de pontos;
* profundidade narrativa;
* personalização;
* compensações de build.

---

# Ampliações

Ampliações são modificadores positivos aplicados em:

* vantagens;
* poderes;
* habilidades;
* mágias.

Elas:

* aumentam poder;
* aumentam alcance;
* melhoram efeitos;
* aumentam custo.

---

# Exemplos de ampliações

* Acompanhamento
* Área de Efeito
* Alcance Ampliado
* Efeito Persistente

---

# Objetivo das ampliações

Permitir:

* customização avançada;
* habilidades únicas;
* poderes mais fortes;
* efeitos especiais.

---

# Limitações

Limitações são modificadores negativos aplicados em:

* vantagens;
* poderes;
* habilidades;
* mágias.

Elas:

* reduzem custo;
* adicionam restrições;
* criam fraquezas.

---

# Exemplos de limitações

* Somente à Noite
* Gesto Necessário
* Requer Concentração
* Alcance Reduzido

---

# Objetivo das limitações

Permitir:

* balanceamento;
* builds especializadas;
* redução de custo;
* personalização mecânica.

---

# Perícias

Perícias representam:

* conhecimentos;
* treinamentos;
* capacidades aprendidas.

Elas normalmente:

* utilizam atributos;
* possuem dificuldade;
* evoluem por pontos.

---

# Exemplos de perícias

* Acrobacia
* Medicina
* Furtividade
* Espadas
* Sobrevivência

---

# Objetivo das perícias

Permitir:

* ações especializadas;
* progressão do personagem;
* diferenciação entre personagens;
* cálculos automáticos.

---

# Técnicas

Técnicas representam:

* especializações;
* refinamentos;
* versões avançadas de perícias.

Elas:

* reduzem penalidades;
* especializam ações;
* melhoram movimentos específicos.

---

# Exemplos de técnicas

* Arquearia Montada
* Golpe Preciso
* Saque Rápido
* Contra-Ataque

---

# Objetivo das técnicas

Permitir:

* especialização avançada;
* builds refinadas;
* estilos de combate únicos.

---

# Mágicas

Mágicas representam:

* feitiços;
* encantamentos;
* poderes mágicos.

Elas normalmente possuem:

* elemento;
* custo;
* duração;
* tempo de conjuração;
* requisitos.

---

# Exemplos de mágicas

* Acelerar
* Bola de Fogo
* Cura
* Invisibilidade
* Teleporte

---

# Objetivo das mágicas

Permitir:

* sistema mágico;
* combate mágico;
* efeitos especiais;
* suporte;
* utilidade narrativa.

---

# Relação entre sistemas

```txt id="pw62nq"
Vantagens
↓
Podem liberar mágicas

Perícias
↓
Podem liberar técnicas

Ampliações
↓
Melhoram habilidades

Limitações
↓
Reduzem custo e adicionam restrições

Desvantagens
↓
Geram pontos extras e penalidades
```

---

# Objetivo final

Criar um sistema:

* modular;
* expansível;
* automatizado;
* escalável;
* fácil de balancear;
* fácil de manter.
