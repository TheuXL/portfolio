import Link from "next/link";
import Image from "next/image";
import { getLinkedInPostPreview } from "@/lib/linkedin-og";
import { buttonClass } from "@/components/ui/Button";

const TEASER_COUNT = 2;

/**
 * Na listagem `/blog`: dois cartões com links diretos para o LinkedIn + “Ler mais” para a página de digest no site.
 */
export async function LinkedInBlogSectionTeaser({
  urls,
  moreHref,
}: {
  urls: string[];
  moreHref: string;
}) {
  const slice = urls.slice(0, TEASER_COUNT).filter(Boolean);
  const previews = await Promise.all(
    slice.map((u) => getLinkedInPostPreview(u)),
  );

  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
      <div className="grid flex-1 gap-6 sm:grid-cols-2">
        {previews.map((preview, i) => (
          <a
            key={slice[i]}
            href={preview.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-(--surface-30-border) bg-surface-30/70 transition hover:border-accent/35"
          >
            <div className="relative aspect-video bg-surface-60">
              {preview.imageUrl ? (
                <Image
                  src={preview.imageUrl}
                  alt={preview.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-linear-to-br from-surface-40 to-surface-60 px-4 text-center text-xs text-muted">
                  Prévia indisponível — abrir no LinkedIn
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="font-(family-name:--font-display-family) text-base font-semibold leading-snug text-fg group-hover:text-accent">
                {preview.title}
              </h3>
              <span className="mt-auto text-sm font-medium text-accent underline-offset-4 group-hover:underline">
                Abrir no LinkedIn →
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="flex shrink-0 justify-center lg:block lg:self-center">
        <Link
          href={moreHref}
          className={buttonClass(
            "secondary",
            "min-h-11 whitespace-nowrap px-6 shadow-none",
          )}
        >
          Ler mais
        </Link>
      </div>
    </div>
  );
}
