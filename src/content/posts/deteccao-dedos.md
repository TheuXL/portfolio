---
title: "Detecção e rastreamento de dedos com visão computacional"
date: "2024-04-26"
category: "Visão computacional"
description: "Python, OpenCV e MediaPipe em tempo real — arquitetura, desafios e próximos passos."
video: "blog/video/Gravando 2025-04-06  principal 30seg.mp4"
readingTime: "10 min"
---

## Introdução

A visão computacional evolui rápido e viabiliza desde automação até experiências mais acessíveis. Este artigo resume um projeto em que detectei e rastreiei dedos em tempo real, identificando quais estão levantados e a qual mão pertencem.

## Tecnologias utilizadas

- **Python** — ecossistema forte para IA e visão.
- **OpenCV** — captura, exibição e manipulação de imagens em tempo real.
- **MediaPipe Hands** — detecção precisa das mãos e dos 21 landmarks.
- **NumPy** — processamento eficiente de coordenadas e imagens.
- **Tkinter** — interface simples para configuração inicial.

## Lógica e arquitetura

### Detecção de mãos

O módulo Hands do MediaPipe detecta até duas mãos simultaneamente. Cada mão tem 21 landmarks; o sistema classifica lateralidade (esquerda/direita).

### Detecção de dedos

- **Polegar:** depende da orientação da mão (na direita, “levantado” quando aponta para a esquerda; na esquerda, o inverso).
- **Demais dedos:** comparar a ponta com a junta média no eixo Y para inferir se está estendido.

## Desafios técnicos

Iluminação variável, ruído na webcam e oclusões parciais exigiram suavização temporal e validações extras nos landmarks para reduzir flicker entre frames.

## Futuro: visão computacional e LLMs

Combinar gestos com modelos de linguagem abre caminho para interfaces multimodais — comandos naturais + feedback visual em tempo real — mantendo latência e privacidade como prioridades de arquitetura.

## Conclusão

O projeto mostra como bibliotecas maduras (OpenCV + MediaPipe) permitem prototipar sistemas de gestos com boa precisão. O próximo nível envolve empacotamento, testes em hardware variado e cenários de uso reais (acessibilidade, controle remoto, protótipos educacionais).
