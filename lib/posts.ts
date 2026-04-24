import { notion } from "./notion";

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,

    // ✅ FILTER HERE
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },

    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((post: any) => {
    const slug =
      post.properties.Slug?.rich_text?.[0]?.plain_text || "";

    return {
      id: post.id,
      pageId: post.id,
      slug: slug.trim().toLowerCase(),

      title: post.properties.Title?.title?.[0]?.plain_text || "Untitled",
      date: post.properties.Date?.date?.start || "",
    };
  });
}