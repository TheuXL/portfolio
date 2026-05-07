import { encodedPublicAsset } from "@/lib/media-url";

/** Prévia estática (SSR): primeiro frame após metadata; sem poster externo. */
export function PostPreviewVideo({
  videoPath,
  title,
}: {
  videoPath: string;
  title: string;
}) {
  const src = encodedPublicAsset(videoPath);
  if (!src) return null;

  return (
    <video
      className="h-full w-full object-cover"
      muted
      playsInline
      preload="metadata"
      aria-label={`Vídeo de prévia: ${title}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
