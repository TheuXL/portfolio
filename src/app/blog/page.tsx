import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostPreviewVideo } from "@/components/blog/PostPreviewVideo";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Blog
        </p>
        <h1 className="mt-3 font-(family-name:--font-display-family) text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Tecnologia e inovação
        </h1>
        <p className="mt-4 text-muted">
          Artigos no mesmo design system do portfolio — tema claro/escuro e tipografia
          compartilhados.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          ← Voltar ao início
        </Link>
      </header>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="overflow-hidden rounded-2xl border border-(--surface-30-border) bg-surface-30/70 transition hover:border-accent/35">
                <div className="relative aspect-video bg-surface-60">
                  {post.video ? (
                    <PostPreviewVideo videoPath={post.video} title={post.title} />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-surface-30 px-4 text-center text-xs text-muted">
                      Sem vídeo de prévia
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
                  <p className="text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
