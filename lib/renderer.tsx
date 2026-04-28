import React from "react";

function richTextToReact(richText: any[]) {
  if (!richText?.length) return null;

  return richText.map((t: any, i: number) => {
    let node: React.ReactNode = t.plain_text;

    if (t.annotations?.bold) node = <strong key={i}>{node}</strong>;
    if (t.annotations?.italic) node = <em key={i}>{node}</em>;
    if (t.annotations?.code) node = <code key={i}>{node}</code>;
    if (t.annotations?.strikethrough) node = <s key={i}>{node}</s>;
    if (t.href) node = <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">{node}</a>;

    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
}

export function renderBlocks(blocks: any[], isPoetry = false) {
  const elements: React.ReactNode[] = [];
  let listBuffer: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushList() {
    if (listBuffer.length === 0) return;
    elements.push(
      listType === "ul"
        ? <ul key={`list-${elements.length}`}>{listBuffer}</ul>
        : <ol key={`list-${elements.length}`}>{listBuffer}</ol>
    );
    listBuffer = [];
    listType = null;
  }

  blocks.forEach((block, i) => {
    const { type } = block;
    if (!type || !block[type]) return;

    const richText: any[] = block[type].rich_text ?? [];
    const text = richText.map((t: any) => t.plain_text).join("");
    const rendered = richTextToReact(richText);

    // Poetry mode — every paragraph is a poem line
    if (isPoetry && type === "paragraph") {
      flushList();
      elements.push(
        <div key={i} className="poem-line">
          {text || <>&nbsp;</>}
        </div>
      );
      return;
    }

    switch (type) {
      case "heading_1":
        flushList();
        elements.push(<h1 key={i}>{rendered}</h1>);
        break;

      case "heading_2":
        flushList();
        elements.push(<h2 key={i} className="subtitle">{rendered}</h2>);
        break;

      case "heading_3":
        flushList();
        elements.push(<h3 key={i}>{rendered}</h3>);
        break;

      case "paragraph":
        flushList();
        // Empty paragraph = intentional line break
        elements.push(
          <p key={i}>{rendered ?? <br />}</p>
        );
        break;

      case "bulleted_list_item":
        if (listType !== "ul") flushList();
        listType = "ul";
        listBuffer.push(<li key={i}>{rendered}</li>);
        break;

      case "numbered_list_item":
        if (listType !== "ol") flushList();
        listType = "ol";
        listBuffer.push(<li key={i}>{rendered}</li>);
        break;

      case "quote":
        flushList();
        elements.push(<blockquote key={i}>{rendered}</blockquote>);
        break;

      case "code":
        flushList();
        elements.push(
          <pre key={i}>
            <code>{block[type].rich_text?.map((t: any) => t.plain_text).join("") ?? ""}</code>
          </pre>
        );
        break;

      case "divider":
        flushList();
        elements.push(<hr key={i} />);
        break;

      case "image": {
        flushList();
        const url =
          block.image?.file?.url || block.image?.external?.url || "";
        const caption = block.image?.caption?.map((c: any) => c.plain_text).join("") || "";
        if (url) {
          elements.push(
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={caption} style={{ maxWidth: "100%", borderRadius: "8px" }} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        }
        break;
      }

      default:
        flushList();
        // Unknown block types — render their text if any, don't crash
        if (text) elements.push(<p key={i}>{rendered}</p>);
        break;
    }
  });

  flushList(); // flush any trailing list
  return elements;
}
