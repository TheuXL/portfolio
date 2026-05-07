import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { LinkedInBlogSectionTeaser } from "@/components/blog/LinkedInBlogSectionTeaser";
import {
  blogCategorySlug,
  blogSectionTitle,
  digestSlugForLinkedInRows,
  flattenLinkedInUrlsFromRows,
  groupByCategory,
  sectionPublicationTotal,
  sortedCategoryKeys,
} from "@/lib/blog-sections";

export default async function BlogIndexPage() {
  const posts = getAllPosts();

  type Row = {
    post: (typeof posts)[number];
  };

  const rows: Row[] = posts.map((post) => ({ post }));

  const grouped = groupByCategory(
    rows.map((row) => ({
      category: row.post.category,
      ...row,
    })),
  );
  const categories = sortedCategoryKeys(grouped.keys());

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

      <div className="mt-14 space-y-16">
        {categories.map((category) => {
          const slug = blogCategorySlug(category);
          const list = [...(grouped.get(category) ?? [])].sort(
            (a, b) =>
              new Date(b.post.date).getTime() -
              new Date(a.post.date).getTime(),
          );

          const totalUnits = sectionPublicationTotal(list);
          const isLinkedInSection = category === "LinkedIn";
          const linkedInUrls = isLinkedInSection
            ? flattenLinkedInUrlsFromRows(list)
            : [];
          const digestSlug = isLinkedInSection
            ? digestSlugForLinkedInRows(list)
            : null;
          const showLinkedInTeaser =
            isLinkedInSection &&
            linkedInUrls.length > 0 &&
            digestSlug !== null;

          return (
            <section
              key={category}
              id={slug}
              aria-labelledby={`blog-heading-${slug}`}
              className="scroll-mt-24"
            >
              <div className="flex flex-col gap-2 border-b border-(--surface-30-border) pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2
                  id={`blog-heading-${slug}`}
                  className="font-(family-name:--font-display-family) text-2xl font-semibold tracking-tight text-fg"
                >
                  {blogSectionTitle(category)}
                </h2>
                <p className="text-xs text-muted">
                  {totalUnits}{" "}
                  {totalUnits === 1 ? "publicação" : "publicações"}
                </p>
              </div>

              {showLinkedInTeaser ? (
                <LinkedInBlogSectionTeaser
                  urls={linkedInUrls}
                  moreHref={`/blog/${digestSlug}`}
                />
              ) : (
                <ul className="mt-8 grid list-none gap-8 p-0 sm:grid-cols-2">
                  {list.map(({ post }) => (
                    <li key={post.slug}>
                      <BlogPostCard post={post} linkedInPreview={null} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
