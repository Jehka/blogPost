import { notion } from "./notion";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export async function getPosts() {
  const allResults: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    allResults.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return allResults.map((post: any) => {
    const titleArr = post.properties.Title?.title ?? [];
    const title =
      titleArr.length > 0
        ? titleArr.map((t: any) => t.plain_text).join("")
        : "Untitled";

    const slugRaw =
      post.properties.Slug?.rich_text?.[0]?.plain_text || title;
    const slug = generateSlug(slugRaw);

    const tags =
      post.properties.Tags?.multi_select?.map((t: any) =>
        t.name.toLowerCase()
      ) || [];

    // Excerpt — add a "Excerpt" rich_text property in your Notion DB
    const excerpt =
      post.properties.Excerpt?.rich_text
        ?.map((t: any) => t.plain_text)
        .join("") || "";

    let cover: string | null = null;
    if (post.cover?.external?.url) cover = post.cover.external.url;
    else if (post.cover?.file?.url) cover = post.cover.file.url;

    return {
      id: post.id,
      pageId: post.id,
      slug,
      title,
      excerpt,
      date: post.properties.Date?.date?.start || "",
      tags,
      cover,
    };
  });
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug.toLowerCase().trim()) ?? null;
}
