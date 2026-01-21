import { Client } from "@notionhq/client"

let notion: any = null

function getNotionClient() {
  if (!notion) {
    if (!process.env.NOTION_TOKEN) {
      return null
    }
    try {
      console.log("[v0] Creating new Client instance")
      notion = new Client({
        auth: process.env.NOTION_TOKEN,
      })
      console.log("[v0] Client instance created")
      console.log("[v0] Has databases:", !!notion.databases)
      console.log("[v0] databases.query type:", typeof notion.databases?.query)
      console.log("[v0] databases keys:", Object.keys(notion.databases || {}).slice(0, 10))
    } catch (error) {
      console.error("[v0] Failed to initialize Notion client:", error)
      return null
    }
  }
  return notion
}

const databaseId = process.env.NOTION_DATABASE_ID!

export async function getNotionDatabase() {
  try {
    console.log("Fetching Notion database with ID:", databaseId)
    console.log("[v0] NOTION_TOKEN available:", !!process.env.NOTION_TOKEN)
    console.log("[v0] NOTION_DATABASE_ID available:", !!databaseId)

    if (!databaseId) {
      throw new Error("NOTION_DATABASE_ID environment variable is not set")
    }

    if (!process.env.NOTION_TOKEN) {
      console.log("[v0] NOTION_TOKEN not set, returning mock data")
      throw new Error("NOTION_TOKEN not configured")
    }

    const client = getNotionClient()
    
    if (!client) {
      console.log("[v0] Client is null after initialization")
      throw new Error("Notion client failed to initialize")
    }

    console.log("[v0] Client initialized successfully")
    console.log("[v0] Attempting to query database with ID:", databaseId)

    // Use REST API directly since client.databases.query may not be available
    let response
    try {
      console.log("[v0] Using REST API to query database")
      const res = await fetch("https://api.notion.com/v1/databases/" + databaseId + "/query", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.NOTION_TOKEN,
          "Notion-Version": "2024-06-15",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      })

      if (!res.ok) {
        throw new Error(`Notion API error: ${res.status} ${res.statusText}`)
      }

      response = await res.json()
    } catch (filterError) {
      console.log("[v0] Published filter query failed, trying without filter")
      // Try without Published filter
      const res = await fetch("https://api.notion.com/v1/databases/" + databaseId + "/query", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.NOTION_TOKEN,
          "Notion-Version": "2024-06-15",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error(`Notion API error: ${res.status} ${res.statusText}`)
      }

      response = await res.json()
    }

    console.log("Fetched", response.results.length, "posts from Notion")

    const posts = response.results.map((page: any) => {
      const properties = page.properties

      // Use slug if available, otherwise use page ID
      const customSlug = properties.Slug?.rich_text?.[0]?.plain_text || properties.slug?.rich_text?.[0]?.plain_text
      const slug = customSlug || page.id

      const post = {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || properties.Name?.title?.[0]?.plain_text || "Untitled",
        description: properties.Description?.rich_text?.[0]?.plain_text || "",
        date: properties.Date?.date?.start || new Date().toISOString().split("T")[0],
        slug: slug,
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        category: properties.Category?.select?.name || "General",
        readTime: properties.ReadTime?.number || properties["Read Time"]?.number || 5,
        published: properties.Published?.checkbox ?? true,
      }

      console.log("Processed post:", post)
      return post
    })

    return posts
  } catch (error) {
    console.error("Error fetching Notion database:", error)

    // Return some mock data for development
    return [
      {
        id: "mock-1",
        title: "Welcome to My Blog",
        description: "This is a sample blog post to test the blog functionality.",
        date: "2024-01-15",
        slug: "welcome-to-my-blog",
        tags: ["Welcome", "Introduction"],
        category: "General",
        readTime: 3,
        published: true,
      },
      {
        id: "mock-2",
        title: "Getting Started with Next.js",
        description: "Learn how to build modern web applications with Next.js and React.",
        date: "2024-01-10",
        slug: "getting-started-nextjs",
        tags: ["Next.js", "React", "Tutorial"],
        category: "Tutorial",
        readTime: 8,
        published: true,
      },
      {
        id: "mock-3",
        title: "Building REST APIs with Node.js",
        description: "A comprehensive guide to creating RESTful APIs using Node.js and Express.",
        date: "2024-01-05",
        slug: "building-rest-apis-nodejs",
        tags: ["Node.js", "API", "Backend"],
        category: "Tutorial",
        readTime: 12,
        published: true,
      },
      {
        id: "mock-4",
        title: "My Development Setup 2024",
        description: "Tools, extensions, and configurations I use for web development.",
        date: "2024-01-01",
        slug: "development-setup-2024",
        tags: ["Tools", "Productivity", "Setup"],
        category: "Personal",
        readTime: 6,
        published: true,
      },
    ]
  }
}

export async function getNotionPage(slug: string) {
  try {
    console.log("Fetching page with slug:", slug)

    // If we don't have environment variables, return mock data
    if (!databaseId) {
      console.log("No Notion credentials, returning mock data")
      const mockPosts = [
        {
          id: "mock-1",
          title: "Welcome to My Blog",
          description: "This is a sample blog post to test the blog functionality.",
          date: "2024-01-15",
          slug: "welcome-to-my-blog",
          tags: ["Welcome", "Introduction"],
          category: "General",
          readTime: 3,
          published: true,
        },
        {
          id: "mock-2",
          title: "Getting Started with Next.js",
          description: "Learn how to build modern web applications with Next.js and React.",
          date: "2024-01-10",
          slug: "getting-started-nextjs",
          tags: ["Next.js", "React", "Tutorial"],
          category: "Tutorial",
          readTime: 8,
          published: true,
        },
        {
          id: "mock-3",
          title: "Building REST APIs with Node.js",
          description: "A comprehensive guide to creating RESTful APIs using Node.js and Express.",
          date: "2024-01-05",
          slug: "building-rest-apis-nodejs",
          tags: ["Node.js", "API", "Backend"],
          category: "Tutorial",
          readTime: 12,
          published: true,
        },
        {
          id: "mock-4",
          title: "My Development Setup 2024",
          description: "Tools, extensions, and configurations I use for web development.",
          date: "2024-01-01",
          slug: "development-setup-2024",
          tags: ["Tools", "Productivity", "Setup"],
          category: "Personal",
          readTime: 6,
          published: true,
        },
      ]

      const mockPost = mockPosts.find((post) => post.slug === slug)
      if (mockPost) {
        return mockPost
      }
      throw new Error("Mock post not found")
    }

    const client = getNotionClient()
    
    if (!client) {
      throw new Error("Notion client is not available - NOTION_TOKEN may not be set")
    }

    // First, try to find by custom slug with Published filter
    let response
    try {
      response = await client.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "Slug",
              rich_text: {
                equals: slug,
              },
            },
            {
              property: "Published",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      })
    } catch (filterError) {
      console.log("Slug filter with Published failed, trying without Published filter")
      response = await client.databases.query({
        database_id: databaseId,
        filter: {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      })
    }

    if (response.results.length > 0) {
      const page = response.results[0] as any
      return formatPageData(page, slug)
    }

    // Try alternative slug property name
    try {
      const altResponse = await client.databases.query({
        database_id: databaseId,
        filter: {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      })

      if (altResponse.results.length > 0) {
        const page = altResponse.results[0] as any
        return formatPageData(page, slug)
      }
    } catch (altError) {
      console.log("Alternative slug property failed:", altError)
    }

    // If no custom slug found, try to find by page ID
    console.log("No custom slug found, trying to fetch by page ID:", slug)

    try {
      const pageResponse = await client.pages.retrieve({ page_id: slug })

      // Check if this page is published (if property exists)
      const pageProperties = (pageResponse as any).properties
      const isPublished = pageProperties.Published?.checkbox ?? true

      if (!isPublished) {
        throw new Error("Page is not published")
      }

      return formatPageData(pageResponse, slug)
    } catch (pageError) {
      console.log("Page ID fetch failed:", pageError)

      // Get all pages to see what's available
      console.log("Fetching all pages to debug...")
      try {
        const allPages = await client.databases.query({
          database_id: databaseId,
        })
        console.log(
          "Available pages:",
          allPages.results.map((p: any) => ({
            id: p.id,
            slug: p.properties.Slug?.rich_text?.[0]?.plain_text || p.properties.slug?.rich_text?.[0]?.plain_text,
            title: p.properties.Title?.title?.[0]?.plain_text || p.properties.Name?.title?.[0]?.plain_text,
          })),
        )
      } catch (debugError) {
        console.log("Debug fetch failed:", debugError)
      }

      throw new Error("Page not found")
    }
  } catch (error) {
    console.error("Error fetching Notion page:", error)
    throw error
  }
}

function formatPageData(page: any, slug: string) {
  const properties = page.properties

  // Use custom slug if available, otherwise use the provided slug (which could be page ID)
  const customSlug = properties.Slug?.rich_text?.[0]?.plain_text || properties.slug?.rich_text?.[0]?.plain_text
  const finalSlug = customSlug || slug

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || properties.Name?.title?.[0]?.plain_text || "Untitled",
    description: properties.Description?.rich_text?.[0]?.plain_text || "",
    date: properties.Date?.date?.start || new Date().toISOString().split("T")[0],
    slug: finalSlug,
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    category: properties.Category?.select?.name || "General",
    readTime: properties.ReadTime?.number || properties["Read Time"]?.number || 5,
    published: properties.Published?.checkbox ?? true,
  }
}

export async function getNotionBlocks(pageId: string) {
  try {
    // If no Notion credentials, return mock content
    if (!databaseId) {
      return [
        {
          id: "mock-block-1",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "This is a sample blog post content. Configure your Notion integration to see real content from your database.",
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
              },
            ],
          },
        },
        {
          id: "mock-block-2",
          type: "heading_2",
          heading_2: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Sample Heading",
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
              },
            ],
          },
        },
        {
          id: "mock-block-3",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content:
                    "This demonstrates how your blog posts will look once you connect your Notion database. You can write rich content with headings, paragraphs, lists, and more.",
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
              },
            ],
          },
        },
      ]
    }

    const client = getNotionClient()
    
    if (!client) {
      throw new Error("Notion client is not available - NOTION_TOKEN may not be set")
    }
    
    const response = await client.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    })

    return response.results
  } catch (error) {
    console.error("Error fetching Notion blocks:", error)
    return [
      {
        id: "error-block-1",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Error loading content. Please check your Notion integration setup.",
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
        },
      },
    ]
  }
}

export async function getBlogCategories() {
  try {
    const posts = await getNotionDatabase()
    const categories = [...new Set(posts.map((post) => post.category))].sort()
    return categories
  } catch (error) {
    console.error("Error fetching blog categories:", error)
    return ["General", "Tutorial", "Personal"]
  }
}
