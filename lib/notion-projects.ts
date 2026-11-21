import { getToken } from "@vercel/connect"
import { Client } from "@notionhq/client"

const connectorUid = "notion/portfolio-projects"
const projectsDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID ?? "41e3de79-f5ad-8149-ab9e-e6f643721141"

type NotionProperty = {
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  multi_select?: Array<{ name: string }>
  files?: Array<{ name?: string; file?: { url?: string }; external?: { url?: string } }>
  url?: string | null
  checkbox?: boolean
}

type NotionPage = {
  id: string
  url: string
  properties: Record<string, NotionProperty>
}

export type PortfolioProject = {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  github?: string
  demo?: string
}

function plainText(property?: NotionProperty) {
  return property?.title?.map((part) => part.plain_text ?? "").join("")
    || property?.rich_text?.map((part) => part.plain_text ?? "").join("")
    || ""
}

function projectFromPage(page: NotionPage): PortfolioProject {
  const properties = page.properties
  const imageProperty = properties.Image ?? properties.Cover
  const image = imageProperty?.files?.[0]?.file?.url
    ?? imageProperty?.files?.[0]?.external?.url

  return {
    id: page.id,
    title: plainText(properties.Title ?? properties.Name) || "Untitled project",
    description: plainText(properties.Description),
    image,
    technologies: (properties.Technologies ?? properties.Tech ?? properties.Tags)?.multi_select?.map(({ name }) => name) ?? [],
    github: properties.GitHub?.url || properties.Github?.url || undefined,
    demo: properties.Demo?.url || properties["Live URL"]?.url || undefined,
  }
}

export async function getNotionProjects(): Promise<PortfolioProject[]> {
  const databaseId = projectsDatabaseId

  const token = await getToken(connectorUid, { subject: { type: "app" } })
  const notion = new Client({ auth: token })

  let response
  try {
    response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: "Published", checkbox: { equals: true } },
    })
  } catch {
    response = await notion.databases.query({ database_id: databaseId })
  }

  return (response.results as NotionPage[])
    .filter((page) => page.properties.Published?.checkbox !== false)
    .map(projectFromPage)
}
