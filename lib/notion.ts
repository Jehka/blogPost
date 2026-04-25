import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// get blocks of a page
export async function getPageBlocks(pageId: string) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return blocks.results;
}