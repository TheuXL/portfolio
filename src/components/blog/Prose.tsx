import type { HTMLAttributes } from "react";

/** Tipografia de artigo — blog (README: Prose + largura de leitura). */
export function Prose({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`prose-custom mx-auto max-w-2xl ${className}`}
      {...props}
    />
  );
}
