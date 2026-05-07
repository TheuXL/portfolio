/**
 * Ordem das âncoras na navegação principal (portfolio).
 * Deve bater com os `id` das seções na home e com os links da Nav.
 */
export const NAV_SECTION_ANCHORS = [
  { id: "home", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "skills", label: "Habilidades" },
  { id: "projects", label: "Projetos" },
  { id: "experience", label: "Experiência" },
  { id: "education", label: "Formação" },
  { id: "resume", label: "Currículo" },
  { id: "certificates", label: "Certificados" },
  { id: "contact", label: "Contato" },
] as const;

export type NavSectionId = (typeof NAV_SECTION_ANCHORS)[number]["id"];
