import { notion } from "./notion";

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
    const slugProp = post.properties.Slug;

    let slug = "";

    // ✅ SAFE extraction
    if (slugProp?.type === "rich_text") {
      slug = slugProp.rich_text?.[0]?.plain_text || "";
    }

    return {
      id: post.id,
      pageId: post.id,

      slug: slug.trim().toLowerCase(), // ✅ always clean

      title: post.properties.Title?.title?.[0]?.plain_text || "Untitled",
      date: post.properties.Date?.date?.start || "",
      featured: post.properties.Featured?.checkbox || false,
      tags: (post.properties.Tags?.multi_select || []).map((t: any) => t.name),
      status: post.properties.Status?.status?.name || "Unknown",
    };
  });
}