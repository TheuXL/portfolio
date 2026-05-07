import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  category: string;
  description: string;
  /** URLs de posts públicos — prévia (título/imagem) obtida via Open Graph no build */
  linkedin_posts?: string[];
  /** Caminho relativo a `public/`, ex.: `blog/video/arquivo.mp4` */
  video?: string;
  /** Opcional: poster só se o arquivo existir em `public/` */
  videoPoster?: string;
  cover?: string;
  readingTime?: string;
};

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
} | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllPosts(): (PostFrontmatter & { slug: string })[] {
  const list = getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      return { slug: post.slug, ...post.frontmatter };
    })
    .filter(Boolean) as (PostFrontmatter & { slug: string })[];

  return list.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
