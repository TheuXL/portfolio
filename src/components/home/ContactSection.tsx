"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui/Button";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/matheuss.devv@gmail.com";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const subject = String(fd.get("subject") ?? "");
    const message = String(fd.get("message") ?? "");

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
      <div className="lg:col-span-2">
        <p className="text-lg leading-relaxed text-muted">
          Vamos conversar sobre tecnologia e inovação.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          <li>
            <a
              href="https://www.linkedin.com/in/matheuss-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/TheuXL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <form
        className="space-y-4 lg:col-span-3"
        onSubmit={onSubmit}
        aria-busy={status === "sending"}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Nome</span>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-(--surface-30-border) bg-surface-60 px-3 py-2.5 text-fg outline-none transition focus:border-accent"
              placeholder="Seu nome"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-(--surface-30-border) bg-surface-60 px-3 py-2.5 text-fg outline-none transition focus:border-accent"
              placeholder="seu@email.com"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Assunto</span>
          <input
            name="subject"
            required
            className="w-full rounded-lg border border-(--surface-30-border) bg-surface-60 px-3 py-2.5 text-fg outline-none transition focus:border-accent"
            placeholder="Assunto"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Mensagem</span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-(--surface-30-border) bg-surface-60 px-3 py-2.5 text-fg outline-none transition focus:border-accent"
            placeholder="Escreva sua mensagem…"
          />
        </label>

        <button type="submit" className={buttonClass("primary")}>
          {status === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>

        {status === "ok" && (
          <p className="text-sm text-accent" role="status">
            Mensagem enviada com sucesso.
          </p>
        )}
        {status === "err" && (
          <p className="text-sm text-red-400" role="alert">
            Erro ao enviar. Tente novamente ou use LinkedIn/GitHub.
          </p>
        )}
      </form>
    </div>
  );
}
