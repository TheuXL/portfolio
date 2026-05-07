import Image from "next/image";
import { getLinkedInPostPreview } from "@/lib/linkedin-og";

export async function LinkedInDigest({ urls }: { urls: string[] }) {
  const items = await Promise.all(
    urls.map(async (url) => ({
      url,
      preview: await getLinkedInPostPreview(url),
    })),
  );

  return (
    <ul className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2">
      {items.map(({ url, preview }) => (
        <li key={url}>
          <a
            href={preview.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-(--surface-30-border) bg-surface-30/70 transition hover:border-accent/35"
          >
            <div className="relative aspect-video bg-surface-60">
              {preview.imageUrl ? (
                <Image
                  src={preview.imageUrl}
                  alt={preview.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-linear-to-br from-surface-40 to-surface-60 px-4 text-center text-xs text-muted">
                  Prévia indisponível — abrir no LinkedIn
                </div>
              )}
            </div>
            <div className="space-y-3 p-5">
              <h2 className="font-(family-name:--font-display-family) text-lg font-semibold leading-snug text-fg group-hover:text-accent">
                {preview.title}
              </h2>
              {preview.description ? (
                <p className="line-clamp-6 text-sm leading-relaxed text-muted">
                  {preview.description}
                </p>
              ) : null}
              <p className="text-sm font-medium text-accent underline-offset-4 group-hover:underline">
                Ler completo no LinkedIn →
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
