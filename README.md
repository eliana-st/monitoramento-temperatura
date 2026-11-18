# Monitoramento IoT

Projeto didático para monitoramento de sensores de temperatura.


## Objetivo

Desenvolver uma aplicação para simular leituras de sensores.

## Tecnologias

- Javascript
- Nodes.js
- Git


## Estrutura

monitoramento-temperatura/
├── package.json
├── src/
│   ├── sensor.js          # simulação e publicação (publisher)
│   ├── painel.js          # inscrição e processamento (subscriber)
│   ├── temperatura.js     # funções de leitura/validação
│   └── config.js          # broker, tópico e intervalos
└── README.md              # instalação, execução e evidências