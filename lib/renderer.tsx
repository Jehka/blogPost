export function renderBlocks(blocks: any[]) {
  return blocks.map((block, i) => {
    const { type } = block;

    if (!block[type]) return null;

    const text = block[type].rich_text
      ?.map((t: any) => t.plain_text)
      .join("");

    switch (type) {
      case "heading_1":
        return <h1 key={i}>{text}</h1>;

      case "heading_2":
        return <h2 key={i}>{text}</h2>;

      case "heading_3":
        return <h3 key={i}>{text}</h3>;

      case "paragraph":
        return <p key={i}>{text}</p>;

      case "bulleted_list_item":
        return <li key={i}>{text}</li>;

      case "numbered_list_item":
        return <li key={i}>{text}</li>;

      default:
        return null;
    }
  });
}