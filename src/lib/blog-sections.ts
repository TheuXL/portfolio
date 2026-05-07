/** Ordem das secções na página `/blog`. Categorias não listadas vêm a seguir, A–Z. */
export const BLOG_CATEGORY_SECTION_ORDER = ["LinkedIn", "Visão computacional"];

const SECTION_LABELS: Record<string, string> = {
  LinkedIn: "Posts no LinkedIn",
  "Visão computacional": "Visão computacional",
};

export function blogSectionTitle(category: string): string {
  return SECTION_LABELS[category] ?? category;
}

export function blogCategorySlug(category: string): string {
  const s = category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "outros";
}

export function groupByCategory<T extends { category: string }>(
  items: T[],
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = item.category;
    const arr = map.get(key) ?? [];
    arr.push(item);
    map.set(key, arr);
  }
  return map;
}

/** Quantidade para totais: cada entrada do blog conta `linkedin_posts.length` se existir; senão 1. */
export function publicationUnitsForPost(post: {
  linkedin_posts?: string[] | undefined;
}): number {
  const n =
    post.linkedin_posts?.filter((u) => typeof u === "string" && u.trim())
      .length ?? 0;
  return n > 0 ? n : 1;
}

export function sectionPublicationTotal<
  T extends { post: { linkedin_posts?: string[] | undefined } },
>(rows: T[]): number {
  return rows.reduce((acc, row) => acc + publicationUnitsForPost(row.post), 0);
}

/** URLs na ordem dos posts (ex.: mais recente primeiro). */
export function flattenLinkedInUrlsFromRows<
  T extends { post: { linkedin_posts?: string[] | undefined } },
>(rows: T[]): string[] {
  const urls: string[] = [];
  for (const { post } of rows) {
    const lp = post.linkedin_posts;
    if (!lp?.length) continue;
    for (const u of lp) {
      if (typeof u === "string" && u.trim()) urls.push(u.trim());
    }
  }
  return urls;
}

/** Slug do digest mais recente que define `linkedin_posts`. */
export function digestSlugForLinkedInRows<
  T extends { post: { slug: string; linkedin_posts?: string[] | undefined } },
>(rows: T[]): string | null {
  const row = rows.find((x) =>
    x.post.linkedin_posts?.some((u) => typeof u === "string" && u.trim()),
  );
  return row?.post.slug ?? null;
}

export function sortedCategoryKeys(keys: Iterable<string>): string[] {
  const unique = [...new Set(keys)];
  const preferred = BLOG_CATEGORY_SECTION_ORDER.filter((k) =>
    unique.includes(k),
  );
  const rest = unique
    .filter((k) => !BLOG_CATEGORY_SECTION_ORDER.includes(k))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  return [...preferred, ...rest];
}
