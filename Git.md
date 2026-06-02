# Guia de Comandos do Git

Este arquivo documenta os atalhos e boas práticas de uso do Git neste repositório.

## Clonar repositorio:

Basta digitar no terminal:

```bash
git clone https://github.com/Lucas-RibeiroSilva/Theoros-base.git
```

## Atalho para Sincronização (`git sync`)

Para facilitar o envio das suas alterações para o GitHub, criei um atalho personalizado chamado `git sync`. Ele automatiza os comandos `add`, `commit` e `push`.

### Como usar:

```bash
git sync "Sua mensagem de commit aqui"

```
## Configuração do atalho:

```bash

git config --global alias.sync '!f() { git add . && git commit -m "${1:-Atualização automática}" && git push; }; f'