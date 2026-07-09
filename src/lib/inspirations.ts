export type InspirationSceneId =
  | "newton-apple"
  | "iron-man"
  | "alan-turing"
  | "stephen-hawking"
  | "elon-musk"
  | "steve-jobs"
  | "clean-energy";

export const INSPIRATION_LABELS: Record<InspirationSceneId, string> = {
  "newton-apple": "Newton e a maçã",
  "iron-man": "Homem de Ferro",
  "alan-turing": "Alan Turing / Enigma",
  "stephen-hawking": "Stephen Hawking",
  "elon-musk": "Elon Musk",
  "steve-jobs": "Steve Jobs",
  "clean-energy": "Energia limpa",
};

export const INSPIRATION_ICONS: Record<InspirationSceneId, string | null> = {
  "newton-apple":
    "https://img.icons8.com/plasticine/100/isaac-newton.png",
  "iron-man": null,
  "alan-turing":
    "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-artificial-automation-technology-soft-fill-soft-fill-juicy-fish-2.png",
  "stephen-hawking":
    "https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/external-black-hole-space-vitaliy-gorbachev-fill-vitaly-gorbachev.png",
  "elon-musk": "https://img.icons8.com/badges/48/elon-musk.png",
  "steve-jobs": "https://img.icons8.com/ios/50/steve-jobs.png",
  "clean-energy":
    "https://img.icons8.com/ios-filled/50/sustainable-energy.png",
};

export const INSPIRATION_QUOTES: Record<InspirationSceneId, string> = {
  "newton-apple":
    "O toque sutil da gravidade derrubou o fruto na terra para que a mente humana pudesse alcançar as estrelas.",
  "iron-man":
    "A verdadeira armadura não é de metal — é a coragem de transformar ideias em realidade.",
  "alan-turing":
    "Decifrar o Enigma foi o primeiro passo da computação — transformar lógica em máquina.",
  "stephen-hawking":
    "Somos todos viajantes do tempo, caminhando juntos para o futuro. Mas precisamos trabalhar juntos para transformar esse futuro em um lugar que de fato desejamos visitar. Seja forte, seja determinado, supere as expectativas. Isso pode ser feito.",
  "elon-musk":
    "A persistência é muito importante. Você não deve desistir, a menos que seja forçado a desistir.",
  "steve-jobs":
    "As pessoas não sabem o que querem até que você mostre a elas.",
  "clean-energy":
    "Prender a luz do dia para iluminar a noite, sem deixar o amanhã no escuro.",
};

export const NEWTON_HOVER_QUOTE = INSPIRATION_QUOTES["newton-apple"];
