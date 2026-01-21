import { Fragment } from "react"

interface NotionRendererProps {
  blocks: any[]
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  const renderBlock = (block: any) => {
    const { type, id } = block
    const value = block[type]

    switch (type) {
      case "paragraph":
        return (
          <p key={id} className="mb-4">
            <Text text={value.rich_text} />
          </p>
        )
      case "heading_1":
        return (
          <h1 key={id} id={`heading-${id}`} className="text-3xl font-bold mb-4 mt-8 scroll-mt-32">
            <Text text={value.rich_text} />
          </h1>
        )
      case "heading_2":
        return (
          <h2 key={id} id={`heading-${id}`} className="text-2xl font-bold mb-3 mt-6 scroll-mt-32">
            <Text text={value.rich_text} />
          </h2>
        )
      case "heading_3":
        return (
          <h3 key={id} id={`heading-${id}`} className="text-xl font-bold mb-2 mt-4 scroll-mt-32">
            <Text text={value.rich_text} />
          </h3>
        )
      case "bulleted_list_item":
        return (
          <li key={id} className="mb-1">
            <Text text={value.rich_text} />
          </li>
        )
      case "numbered_list_item":
        return (
          <li key={id} className="mb-1">
            <Text text={value.rich_text} />
          </li>
        )
      case "code":
        return (
          <pre key={id} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
            <code className="text-sm">
              <Text text={value.rich_text} />
            </code>
          </pre>
        )
      case "quote":
        return (
          <blockquote key={id} className="border-l-4 border-primary pl-4 italic mb-4">
            <Text text={value.rich_text} />
          </blockquote>
        )
      case "divider":
        return <hr key={id} className="my-8 border-border" />
      case "image":
        const src = value.type === "external" ? value.external.url : value.file.url
        return (
          <img
            key={id}
            src={src || "/placeholder.svg"}
            alt={value.caption ? value.caption[0]?.plain_text : ""}
            className="w-full rounded-lg mb-4"
          />
        )
      default:
        return (
          <p key={id} className="mb-4 text-muted-foreground">
            Unsupported block type: {type}
          </p>
        )
    }
  }

  return (
    <div>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  )
}

function Text({ text }: { text: any[] }) {
  if (!text) {
    return null
  }
  return (
    <>
      {text.map((value, index) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value
        return (
          <span
            key={index}
            className={[
              bold ? "font-bold" : "",
              code ? "bg-muted px-1 py-0.5 rounded text-sm font-mono" : "",
              italic ? "italic" : "",
              strikethrough ? "line-through" : "",
              underline ? "underline" : "",
            ].join(" ")}
            style={color !== "default" ? { color } : {}}
          >
            {text.link ? (
              <a href={text.link.url} className="text-primary hover:underline">
                {text.content}
              </a>
            ) : (
              text.content
            )}
          </span>
        )
      })}
    </>
  )
}
