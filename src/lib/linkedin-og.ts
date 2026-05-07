import { unstable_cache } from "next/cache";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export type LinkedInPostPreview = {
  title: string;
  /** Capa — `og:image` */
  imageUrl: string | null;
  /** Resumo do texto público — preferencialmente o mais longo entre OG e JSON-LD (`articleBody` / `text`) */
  description: string | null;
  /** URL canónica para “Ler no LinkedIn” */
  href: string;
};

function normalizeLinkedInUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    if (!u.hostname.endsWith("linkedin.com")) return null;
    u.search = "";
    return u.toString();
  } catch {
    return null;
  }
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractMeta(html: string, prop: string): string | null {
  const esc = prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const r1 = new RegExp(
    `<meta[^>]+property=["']${esc}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const r2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${esc}["']`,
    "i",
  );
  const m = html.match(r1) ?? html.match(r2);
  return m?.[1] ? decodeBasicEntities(m[1]) : null;
}

function extractNameMeta(html: string, name: string): string | null {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const r1 = new RegExp(
    `<meta[^>]+name=["']${esc}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const r2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${esc}["']`,
    "i",
  );
  const m = html.match(r1) ?? html.match(r2);
  return m?.[1] ? decodeBasicEntities(m[1]) : null;
}

function cleanTitle(title: string): string {
  return title.replace(/\s*\|\s*Matheus Santos\s*$/i, "").trim();
}

function collapseWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function extractLdPostingBody(html: string): string | null {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1]?.trim();
    if (!raw) continue;
    try {
      const data = JSON.parse(raw) as unknown;
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        if (!node || typeof node !== "object") continue;
        const rec = node as Record<string, unknown>;
        const ab = rec.articleBody;
        const tx = rec.text;
        const pick =
          typeof ab === "string"
            ? ab
            : typeof tx === "string"
              ? tx
              : null;
        if (pick?.trim()) return pick;
      }
    } catch {
      continue;
    }
  }
  return null;
}

function mergeDescriptions(
  ogTwitterName: string | null,
  ldBody: string | null,
): string | null {
  const o = ogTwitterName ? collapseWhitespace(ogTwitterName) : "";
  const l = ldBody ? collapseWhitespace(ldBody) : "";
  const best = l.length > o.length ? l : o;
  return best || null;
}

/** Remove blocos `#etiqueta` típicos do LinkedIn; mantém só o texto corrido (ex.: título + frases). */
function stripLinkedInHashtags(s: string): string | null {
  const noTags = s.replace(/#[^\s#]+/g, "");
  const trimmed = collapseWhitespace(noTags).replace(
    /^[,•·\s\-–]+|[,•·\s\-–]+$/g,
    "",
  );
  return trimmed || null;
}

const fetchPreviewBody = unstable_cache(
  async (normalizedUrl: string): Promise<LinkedInPostPreview> => {
    const empty = (): LinkedInPostPreview => ({
      title: "Post no LinkedIn",
      imageUrl: null,
      description: null,
      href: normalizedUrl,
    });

    try {
      const res = await fetch(normalizedUrl, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml",
        },
        redirect: "follow",
      });
      if (!res.ok) return empty();

      const html = await res.text();
      const rawTitle =
        extractMeta(html, "og:title") ??
        extractMeta(html, "twitter:title") ??
        "Post no LinkedIn";
      const title = cleanTitle(rawTitle);

      const imageRaw =
        extractMeta(html, "og:image") ??
        extractMeta(html, "twitter:image");
      const imageUrl = imageRaw ? decodeBasicEntities(imageRaw) : null;

      const hrefRaw =
        extractMeta(html, "og:url") ??
        extractMeta(html, "lnkd:url") ??
        normalizedUrl;
      const href = decodeBasicEntities(hrefRaw);

      const ogDesc =
        extractMeta(html, "og:description") ??
        extractMeta(html, "twitter:description") ??
        extractNameMeta(html, "description");

      const ldBody = extractLdPostingBody(html);
      const merged = mergeDescriptions(ogDesc, ldBody);
      let description = merged ? stripLinkedInHashtags(merged) : null;
      if (
        description &&
        collapseWhitespace(description).toLowerCase() ===
          collapseWhitespace(title).toLowerCase()
      ) {
        description = null;
      }

      return {
        title,
        imageUrl,
        description,
        href,
      };
    } catch {
      return empty();
    }
  },
  ["linkedin-post-og-v3-strip-tags"],
  { revalidate: 86_400 },
);

export async function getLinkedInPostPreview(
  postUrl: string,
): Promise<LinkedInPostPreview> {
  const normalized = normalizeLinkedInUrl(postUrl);
  if (!normalized) {
    return {
      title: "URL inválida",
      imageUrl: null,
      description: null,
      href: postUrl,
    };
  }
  return fetchPreviewBody(normalized);
}
