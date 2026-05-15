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

  // Group consecutive callout blocks
  const processedBlocks: { block: any; index: number }[][] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].type === "callout") {
      const group: { block: any; index: number }[] = [];
      while (i < blocks.length && blocks[i].type === "callout") {
        group.push({ block: blocks[i], index: i });
        i++;
      }
      processedBlocks.push(group);
    } else {
      processedBlocks.push([{ block: blocks[i], index: i }]);
      i++;
    }
  }

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

  processedBlocks.forEach((group) => {
    const { block, index } = group[0];
    const { type } = block;

    if (!type || !block[type]) return;

    // Handle callout groups
    if (type === "callout") {
      flushList();

      // Multiple consecutive callouts = poem with stanzas
      if (group.length > 1) {
        elements.push(
          <div key={`poem-${index}`} className="notion-poem">
            {group.map(({ block: cb, index: ci }) => {
              const icon = cb.callout?.icon?.emoji;
              const rt = cb.callout?.rich_text ?? [];
              const rendered = richTextToReact(rt);
              return (
                <div key={ci} className="notion-poem-stanza">
                  {icon && <span className="notion-callout-icon">{icon}</span>}
                  <div className="notion-poem-stanza-body">{rendered}</div>
                </div>
              );
            })}
          </div>
        );
      } else {
        // Single callout = highlighted aside block
        const icon = block.callout?.icon?.emoji;
        const rt = block.callout?.rich_text ?? [];
        const rendered = richTextToReact(rt);
        elements.push(
          <div key={index} className="notion-callout">
            {icon && <span className="notion-callout-icon">{icon}</span>}
            <div className="notion-callout-body">{rendered}</div>
          </div>
        );
      }
      return;
    }

    const richText: any[] = block[type].rich_text ?? [];
    const text = richText.map((t: any) => t.plain_text).join("");
    const rendered = richTextToReact(richText);

    if (isPoetry && type === "paragraph") {
      flushList();
      elements.push(
        <div key={index} className="poem-line">
          {text || <>&nbsp;</>}
        </div>
      );
      return;
    }

    switch (type) {
      case "heading_1":
        flushList();
        elements.push(<h1 key={index}>{rendered}</h1>);
        break;

      case "heading_2":
        flushList();
        elements.push(<h2 key={index} className="subtitle">{rendered}</h2>);
        break;

      case "heading_3":
        flushList();
        elements.push(<h3 key={index}>{rendered}</h3>);
        break;

      case "paragraph":
        flushList();
        elements.push(<p key={index}>{rendered ?? <br />}</p>);
        break;

      case "bulleted_list_item":
        if (listType !== "ul") flushList();
        listType = "ul";
        listBuffer.push(<li key={index}>{rendered}</li>);
        break;

      case "numbered_list_item":
        if (listType !== "ol") flushList();
        listType = "ol";
        listBuffer.push(<li key={index}>{rendered}</li>);
        break;

      case "quote": {
        flushList();
        const attribution = text.match(/[—–-]\s*([^—–-]+)$/);
        if (attribution) {
          const quoteText = text.slice(0, text.lastIndexOf(attribution[0])).trim();
          elements.push(
            <blockquote key={index} className="notion-quote">
              <p className="notion-quote-text">&ldquo;{quoteText}&rdquo;</p>
              <cite className="notion-quote-cite">{attribution[1].trim()}</cite>
            </blockquote>
          );
        } else {
          elements.push(
            <blockquote key={index} className="notion-quote">
              <p className="notion-quote-text">{rendered}</p>
            </blockquote>
          );
        }
        break;
      }

      case "code":
        flushList();
        elements.push(
          <pre key={index}>
            <code>{block[type].rich_text?.map((t: any) => t.plain_text).join("") ?? ""}</code>
          </pre>
        );
        break;

      case "divider":
        flushList();
        elements.push(<hr key={index} />);
        break;

      case "image": {
        flushList();
        const url = block.image?.file?.url || block.image?.external?.url || "";
        const caption = block.image?.caption?.map((c: any) => c.plain_text).join("") || "";
        if (url) {
          elements.push(
            <figure key={index}>
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
        if (text) elements.push(<p key={index}>{rendered}</p>);
        break;
    }
  });

  flushList();
  return elements;
}