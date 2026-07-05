"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { buttonClass } from "@/components/ui/Button";
import { HeroBadgeCard } from "@/components/home/HeroBadgeCard";
import { HomeScrollEffects } from "@/components/home/HomeScrollEffects";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ProjectDialog } from "@/components/home/ProjectDialog";
import { CertificatesSection } from "@/components/home/CertificatesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { PROJECTS } from "@/lib/projects";
import { publicUrl } from "@/lib/paths";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items:
      "React, React Native, Flutter, Angular, Vue.js, JavaScript, TypeScript, HTML, CSS, Gluestack, Storybook, Design System".split(
        ", ",
      ),
  },
  {
    title: "Backend",
    items:
      "Node.js, Java, Spring, Spring Boot, Spring Security, Python, Django, Pandas, Spark".split(
        ", ",
      ),
  },
  {
    title: "Bancos de Dados",
    items: "SQL, PostgreSQL, MySQL, Oracle, MongoDB, DynamoDB".split(", "),
  },
  {
    title: "Cloud & DevOps",
    items:
      "AWS (EC2, S3, Lambda, RDS, VPC, Route 53, IAM, Athena, ECS, EKS, EBS), Azure, Azure DevOps, Google Cloud, Docker, CI/CD, Microserviços, Linux, Mensageria".split(
        ", ",
      ),
  },
  {
    title: "IA & Ferramentas",
    items:
      "OpenAI API, Whisper, OpenCV, LLMs (Gemini, DeepSeck, Llama, Llama-3.1-Nemotron-70B), Git, GitHub, Jest, SAP, Postman".split(
        ", ",
      ),
  },
  {
    title: "Metodologias & Práticas",
    items:
      "SOLID, TDD, Testes Unitários, .NET, Clean Code, Scrum, Kanban".split(
        ", ",
      ),
  },
  {
    title: "Segurança & Autenticação",
    items:
      "JWT, OAuth2, Azure AD B2C, Autenticação, Autorização, SSO".split(", "),
  },
];

const SOFT_SKILLS =
  "Comunicação, Adaptabilidade, Criatividade, Liderança, Trabalho em Equipe, Organização, Planejamento".split(
    ", ",
  );

const EXPERIENCE = [
  "CEO @ TheuXDev — Consultoria e desenvolvimento.",
  "Engenheiro de Software @ Grupo Youx — Projeto Inã (Full-Stack).",
  "Desenvolvedor Full-Stack — Desde 2021.",
  "Desenvolvedor Mobile — Atualmente.",
  "Assistente Administrativo (Aprendiz) @ JODIB — Suporte às rotinas administrativas (Set 2023 - Jan 2025, Salgueiro-PE).",
];

const EDUCATION = [
  "Engenharia de Software — Universidade Pitágoras Unopar Anhanguera (Cursando)",
  "Ciências Econômicas — Universidade Pitágoras Unopar Anhanguera (Cursando)",
];

const RESUME_DOWNLOADS = [
  {
    title: "Backend Developer",
    desc: "APIs robustas e arquiteturas escaláveis.",
    pdf: "curriculo/PDF/CURRÍCULO MATHEUS SANTOS BACKEND.pdf",
    docx: "curriculo/WORD/CURRÍCULO MATHEUS SANTOS BACKEND.docx",
  },
  {
    title: "Frontend Developer",
    desc: "Experiências interativas e responsivas.",
    pdf: "curriculo/PDF/CURRÍCULO MATHEUS SANTOS FRONTEND.pdf",
    docx: "curriculo/WORD/CURRÍCULO MATHEUS SANTOS FRONTEND.docx",
  },
  {
    title: "Fullstack Developer",
    desc: "Engenharia completa em todas as camadas.",
    pdf: "curriculo/PDF/CURRÍCULO MATHEUS SANTOS FULL.pdf",
    docx: "curriculo/WORD/CURRÍCULO MATHEUS SANTOS FULL.docx",
  },
  {
    title: "English Version",
    desc: "International profile.",
    pdf: "curriculo/PDF/CURRICULUM MATHEUS SANTOS EG.pdf",
    docx: "curriculo/WORD/CURRICULUM MATHEUS SANTOS EG.docx",
  },
];

export function HomePage() {
  const [projectKey, setProjectKey] = useState<string | null>(null);
  const activeProject =
    PROJECTS.find((p) => p.key === projectKey) ?? null;

  return (
    <>
      <HomeScrollEffects />
      <ProjectDialog
        project={activeProject}
        open={!!activeProject}
        onClose={() => setProjectKey(null)}
      />

      <section
        id="home"
        className="hero-mesh relative overflow-hidden border-b border-(--surface-30-border)"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div
            data-scroll-hero-zoom
            className="relative z-1 origin-top will-change-transform"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              TheuxDev · Software Engineer
            </p>
            <h1 className="mt-4 font-(family-name:--font-display-family) text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-[3.25rem]">
              Olá, eu sou o{" "}
              <span className="text-accent">Matheus Santos</span>
            </h1>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-muted">
              Full-stack · IA · Flutter · Node · React · Python · AWS
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Criando soluções inteligentes, escaláveis e impactantes com
              tecnologia de ponta. Constantemente em busca da excelência.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={buttonClass("primary")}>
                Ver projetos
              </a>
              <a href="#contact" className={buttonClass("secondary")}>
                Contato
              </a>
              <Link href="/blog" className={buttonClass("ghost")}>
                Blog
              </Link>
            </div>
          </div>

          <div className="relative z-1 flex justify-center lg:justify-end">
            <div
              data-scroll-badge
              className="relative w-full max-w-md origin-center will-change-transform"
            >
              <div className="absolute -inset-8 rounded-[40%] bg-linear-to-br from-accent/20 via-transparent to-transparent blur-3xl" />
              <HeroBadgeCard
                photoSrc={publicUrl("imagens/FOTO PROFICIONAL.jpeg")}
                photoAlt="Matheus Santos"
                name="Matheus Santos"
                role="Engenheiro de Software"
                company="TheuxDev"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        id="about"
        title="Sobre mim"
        description="Full-stack movido por curiosidade e inovação."
      >
        <div
          data-scroll-about-inner
          className="origin-top will-change-transform"
        >
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            Bem-vindo! Sou Matheus (TheuxDev), Engenheiro de Software Full-Stack
            movido pela curiosidade e pela busca incessante por inovação. Ao
            longo dos quase 4 anos de experiência, tenho focado na criação de
            projetos web e mobile que se destacam pela performance, usabilidade
            e robustez. O que realmente me fascina é o potencial da Inteligência
            Artificial, especialmente quando combinada com arquiteturas
            escaláveis como microserviços. Adoro mergulhar em desafios que exigem
            soluções criativas, aplicando meus conhecimentos para desenvolver
            sistemas inteligentes que otimizam processos, entendem nuances e
            entregam valor real aos usuários.
          </p>
        </div>
      </Section>

      <Section id="skills" title="Habilidades técnicas">
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <Card
              key={g.title}
              data-scroll-skills-card
              className="p-5 will-change-transform"
            >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {g.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-(--surface-30-border) bg-surface-60/80 px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
        </div>
        <div className="mt-10" data-scroll-skills-soft>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Soft skills
          </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <li
                  key={s}
                  className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
        </div>
      </Section>

      <Section id="experience" title="Experiência">
        <ul className="space-y-4">
          {EXPERIENCE.map((line) => (
            <li
              key={line}
              data-scroll-exp-item
              className="flex gap-3 rounded-xl border border-(--surface-30-border) bg-surface-30/60 px-4 py-3 text-sm text-muted will-change-transform"
            >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
        </ul>
      </Section>

      <Section id="projects" title="Projetos em destaque">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <button
              key={p.key}
              type="button"
              data-scroll-project-card
              className="group cursor-pointer text-left will-change-transform"
              onClick={() => setProjectKey(p.key)}
            >
                <Card className="overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)]">
                  <div className="relative aspect-video w-full bg-surface-60">
                    <Image
                      src={publicUrl(p.image)}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="font-(family-name:--font-display-family) text-base font-semibold leading-snug text-fg">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {p.excerpt}
                    </p>
                    <span className="inline-block text-xs font-medium text-accent">
                      Ver detalhes →
                    </span>
                  </div>
                </Card>
              </button>
            ))}
        </div>
      </Section>

      <ScrollReveal>
        <Section id="education" title="Formação">
          <ul className="space-y-3">
            {EDUCATION.map((line) => (
              <li
                key={line}
                className="rounded-xl border border-(--surface-30-border) bg-surface-30/60 px-4 py-3 text-sm text-muted"
              >
                {line}
              </li>
            ))}
          </ul>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section
          id="resume-profile"
          title="Resumo profissional"
          description="Full-stack com foco em IA e arquiteturas escaláveis."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm leading-relaxed text-muted">
                Desenvolvedor full-stack versátil com paixão por{" "}
                <strong className="text-fg">
                  soluções inteligentes baseadas em IA
                </strong>{" "}
                e{" "}
                <strong className="text-fg">arquiteturas escaláveis</strong>.
                Transformo desafios técnicos complexos em soluções eficientes e
                intuitivas.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-sm font-semibold text-accent">
                Objetivo profissional
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Busco oportunidades para liderar o desenvolvimento de soluções
                inovadoras com IA e arquiteturas distribuídas, com impacto real —
                especialmente em projetos que desafiem convenções.
              </p>
            </Card>
          </div>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section
          id="resume"
          title="Currículo"
          description="Baixe a versão que melhor se alinha à sua necessidade."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {RESUME_DOWNLOADS.map((r) => (
              <Card key={r.title} className="flex flex-col p-5">
                <h3 className="font-(family-name:--font-display-family) text-lg font-semibold text-fg">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={publicUrl(r.pdf)}
                    download
                    className={buttonClass("primary", "text-xs")}
                  >
                    PDF
                  </a>
                  <a
                    href={publicUrl(r.docx)}
                    download
                    className={buttonClass("secondary", "text-xs")}
                  >
                    Word
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section id="contact" title="Contato">
          <ContactSection />
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section
          id="blog-preview"
          title="Blog"
          description="Artigos sobre tecnologia, desenvolvimento e inovação."
        >
          <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
            <Card className="overflow-hidden lg:col-span-3">
              <div className="relative aspect-video bg-black">
                <video
                  className="h-full w-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={publicUrl(
                      "blog/video/Gravando 2025-04-06  principal 30seg.mp4",
                    )}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap gap-3 text-xs text-muted">
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-fg">
                    Visão computacional
                  </span>
                  <span>26 abril, 2024</span>
                </div>
                <h3 className="font-(family-name:--font-display-family) text-lg font-semibold text-fg">
                  Detecção e rastreamento de dedos com visão computacional
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Python, OpenCV e MediaPipe em tempo real — do protótipo aos
                  desafios práticos.
                </p>
                <Link
                  href="/blog/deteccao-dedos"
                  className="inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Ler artigo →
                </Link>
              </div>
            </Card>
            <div className="flex flex-col justify-center gap-4 lg:col-span-2">
              <p className="text-sm text-muted">
                Posts migrados para Markdown no mesmo design system (tema claro
                / escuro, tipografia e componentes compartilhados).
              </p>
              <Link href="/blog" className={buttonClass("secondary", "w-fit")}>
                Ver todos os artigos
              </Link>
            </div>
          </div>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section
          id="certificates"
          title="Certificados"
          description="Aprendizado contínuo e especializações."
        >
          <CertificatesSection />
        </Section>
      </ScrollReveal>
    </>
  );
}
