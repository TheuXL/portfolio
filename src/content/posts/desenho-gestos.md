---
title: "Desenho e anotações com gestos: interação em tempo real"
date: "2024-04-15"
category: "Visão computacional"
description: "PyAutoGUI, MediaPipe e OpenCV para desenhar na tela apenas com gestos."
video: "blog/video/Gravando 2025-04-15 dedo desenho 2 principal.mp4"
readingTime: "8 min"
---

## Introdução

Anotar ou apagar sobre a tela em uma videochamada ou apresentação, só com movimentos da mão — sem mouse nem caneta física. Este projeto explora essa interação com visão computacional.

## Como funciona

1. **PyAutoGUI** captura a tela de forma contínua.
2. **MediaPipe Hands** detecta a mão e os 21 landmarks por frame.
3. Um gesto de **mão fechada** funciona como “modo seguro”, evitando traços acidentais.
4. O **dedo indicador** define um cursor virtual com suavização para reduzir tremores.

### Lápis e borracha

- OpenCV desenha traços em uma camada separada para o lápis.
- A borracha altera uma máscara, revelando o fundo original.
- Botões virtuais na tela alternam ferramentas sem clique físico.

## Tecnologias utilizadas

| Ferramenta | Papel |
| ---------- | ----- |
| Python | Base da lógica e integração |
| OpenCV | Manipulação de imagem e camadas |
| MediaPipe | Detecção robusta das mãos |
| PyAutoGUI | Captura contínua da tela |
| NumPy | Operações rápidas em buffers de imagem |

## Impacto e futuro

Interfaces mais naturais, ganhos de acessibilidade e colaboração remota são tendências claras. Projetos assim funcionam como laboratório para políticas de privacidade (captura de tela), performance e ergonomia.

## Conclusão

É mais que um “desenho na tela”: é um estudo de como gestos podem substituir parte da interação tradicional sem sacrificar controle fino — próximo passo é refinar UX, latência e cenários de uso (educação, LIVE ops, suporte remoto).
