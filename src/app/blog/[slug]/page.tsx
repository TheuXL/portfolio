import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { Prose } from "@/components/blog/Prose";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { encodedPublicAsset } from "@/lib/media-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  const videoSrc = encodedPublicAsset(frontmatter.video);
  const posterSrc =
    encodedPublicAsset(frontmatter.videoPoster) ??
    encodedPublicAsset(frontmatter.cover);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        ← Blog
      </Link>

      <header className="mx-auto mt-8 max-w-2xl">
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-fg">
            {frontmatter.category}
          </span>
          <time dateTime={frontmatter.date}>{frontmatter.date}</time>
          {frontmatter.readingTime ? (
            <span>{frontmatter.readingTime} de leitura</span>
          ) : null}
        </div>
        <h1 className="mt-4 font-(family-name:--font-display-family) text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{frontmatter.description}</p>
      </header>

      {(videoSrc || frontmatter.cover) && (
        <figure className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-(--surface-30-border) bg-surface-30">
          {videoSrc ? (
            <video
              controls
              {...(posterSrc ? { poster: posterSrc } : {})}
              className="aspect-video w-full bg-black object-cover"
              preload="metadata"
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : frontmatter.cover ? (
            <div className="relative aspect-video w-full bg-surface-60">
              <Image
                src={encodedPublicAsset(frontmatter.cover)!}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          ) : null}
          {videoSrc ? (
            <figcaption className="px-4 py-3 text-center text-xs text-muted">
              Demonstração em vídeo do projeto
            </figcaption>
          ) : null}
        </figure>
      )}

      <Prose className="mt-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Prose>
    </article>
  );
}
