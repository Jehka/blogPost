import { notion } from "./notion";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((post: any) => {
    const title =
      post.properties.Title?.title?.[0]?.plain_text || "Untitled";

    const slugRaw =
      post.properties.Slug?.rich_text?.[0]?.plain_text || title;

    const slug = generateSlug(slugRaw);

    const tags =
      post.properties.Tags?.multi_select?.map((t: any) =>
        t.name.toLowerCase()
      ) || [];

    // 🔥 COVER IMAGE (Notion)
    let cover = null;

    if (post.cover?.external?.url) {
      cover = post.cover.external.url;
    } else if (post.cover?.file?.url) {
      cover = post.cover.file.url;
    }

    return {
      id: post.id,
      pageId: post.id,
      slug,
      title,
      date: post.properties.Date?.date?.start || "",
      tags,
      cover, // ✅ new
    };
  });
}