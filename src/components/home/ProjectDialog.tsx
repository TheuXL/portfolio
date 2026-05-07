"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { ProjectDetail } from "@/lib/projects";
import { publicUrl } from "@/lib/paths";
import { buttonClass } from "@/components/ui/Button";

export function ProjectDialog({
  project,
  open,
  onClose,
}: {
  project: ProjectDetail | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!project || !open) return null;

  const showRepo = project.repoLink && project.repoLink !== "#";
  const showLive = project.liveLink && project.liveLink !== "#";
  const showProject =
    project.projectLink && project.projectLink !== "#";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-(--surface-30-border) bg-surface-30 p-6 shadow-xl sm:p-8"
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-60 hover:text-fg"
            onClick={onClose}
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        <h3
          id="project-dialog-title"
          className="font-(family-name:--font-display-family) text-xl font-semibold tracking-tight text-fg sm:text-2xl"
        >
          {project.title}
        </h3>

        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-(--surface-30-border) bg-surface-60">
          <Image
            src={publicUrl(project.image)}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
          Descrição
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
          Tecnologias
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.stack}</p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
          Destaques
        </h4>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {showRepo && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              Repositório
            </a>
          )}
          {showLive && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary")}
            >
              Ver online
            </a>
          )}
          {showProject && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary")}
            >
              Sobre o projeto
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
