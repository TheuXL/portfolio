import type { HTMLAttributes } from "react";

export function Section({
  id,
  title,
  description,
  children,
  className = "",
  flow = false,
  ...props
}: HTMLAttributes<HTMLElement> & {
  id?: string;
  title?: string;
  description?: string;
  /** Espaçamento contínuo na home (sem “blocos” separados). */
  flow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8 ${
        flow ? "py-10 sm:py-12" : "py-16 sm:py-20"
      } ${className}`}
      {...props}
    >
      {(title || description) && (
        <header className={`max-w-2xl ${flow ? "mb-8" : "mb-10"}`}>
          {title && (
            <h2 className="font-(family-name:--font-display-family) text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
