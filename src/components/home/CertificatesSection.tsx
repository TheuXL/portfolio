"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CERTIFICATE_CATEGORIES } from "@/lib/certificates-data";
import { publicUrl } from "@/lib/paths";

export function CertificatesSection() {
  const [open, setOpen] = useState<{ title: string; src: string } | null>(
    null,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="space-y-12">
        {CERTIFICATE_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <h3 className="mb-4 text-lg font-semibold text-fg">{cat.title}</h3>
            <div className="space-y-8">
              {cat.groups.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
                    {group.title}
                  </h4>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <button
                          type="button"
                          className="group w-full rounded-xl border border-(--surface-30-border) bg-surface-60/40 text-left transition-colors hover:border-accent/40 hover:bg-accent-soft/30"
                          onClick={() =>
                            setOpen({
                              title: item.title,
                              src: publicUrl(item.imagePath),
                            })
                          }
                        >
                          <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-xl bg-surface-30">
                            <Image
                              src={publicUrl(item.imagePath)}
                              alt={item.title}
                              fill
                              className="object-cover opacity-90 transition group-hover:opacity-100"
                              sizes="(max-width: 640px) 100vw, 33vw"
                              loading="lazy"
                            />
                          </div>
                          <span className="block px-3 py-3 text-sm font-medium text-fg">
                            {item.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-(--surface-30-border) bg-surface-30 p-4 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="font-(family-name:--font-display-family) text-lg font-semibold text-fg">
                {open.title}
              </h3>
              <button
                type="button"
                className="shrink-0 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-60 hover:text-fg"
                onClick={() => setOpen(null)}
              >
                Fechar
              </button>
            </div>
            <div className="relative min-h-50 w-full overflow-hidden rounded-xl border border-(--surface-30-border) bg-surface-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={open.src}
                alt={open.title}
                className="mx-auto max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
