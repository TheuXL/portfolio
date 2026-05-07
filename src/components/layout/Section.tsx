import type { HTMLAttributes } from "react";

export function Section({
  id,
  title,
  description,
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & {
  id?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}
      {...props}
    >
      {(title || description) && (
        <header className="mb-10 max-w-2xl">
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
