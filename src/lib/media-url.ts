import { publicUrl } from "@/lib/paths";

/** Aceita `blog/video/arquivo.mp4` ou `/blog/video/arquivo.mp4`. */
export function encodedPublicAsset(path: string | undefined): string | undefined {
  if (!path?.trim()) return undefined;
  return publicUrl(path.replace(/^\/+/, ""));
}
