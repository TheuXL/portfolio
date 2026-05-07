/** Encode cada segmento do caminho público (espaços e acentos em nomes de arquivo). */
export function publicUrl(segments: string): string {
  const clean = segments.replace(/^\/+/, "");
  return "/" + clean.split("/").map(encodeURIComponent).join("/");
}
