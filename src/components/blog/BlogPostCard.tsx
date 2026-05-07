import Link from "next/link";
import Image from "next/image";
import type { PostFrontmatter } from "@/lib/posts";
import type { LinkedInPostPreview } from "@/lib/linkedin-og";
import { PostPreviewVideo } from "@/components/blog/PostPreviewVideo";
import { encodedPublicAsset } from "@/lib/media-url";

export function BlogPostCard({
  post,
  linkedInPreview,
}: {
  post: PostFrontmatter & { slug: string };
  linkedInPreview?: LinkedInPostPreview | null;
}) {
  const coverSrc = encodedPublicAsset(post.cover);
  const thumb = linkedInPreview?.imageUrl ?? null;
  const excerpt =
    linkedInPreview?.description?.trim() || post.description;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-(--surface-30-border) bg-surface-30/70 transition hover:border-accent/35">
        <div className="relative aspect-video bg-surface-60">
          {post.video ? (
            <PostPreviewVideo videoPath={post.video} title={post.title} />
          ) : thumb ? (
            <Image
              src={thumb}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : coverSrc ? (
            <Image
              src={coverSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-surface-30 px-4 text-center text-xs text-muted">
              Sem prévia
            </div>
          )}
        </div>
        <div className="space-y-2 p-5">
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-fg">
              {post.category}
            </span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h2 className="font-(family-name:--font-display-family) text-lg font-semibold text-fg group-hover:text-accent">
            {post.title}
          </h2>
          <p className="line-clamp-5 text-sm leading-relaxed text-muted">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
