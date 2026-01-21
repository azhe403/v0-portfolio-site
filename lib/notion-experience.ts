const experienceDatabaseId = process.env.NOTION_EXPERIENCE_DATABASE_ID!

export async function getNotionExperience() {
  try {
    console.log("Fetching Notion experience database with ID:", experienceDatabaseId)

    if (!process.env.NOTION_TOKEN) {
      throw new Error("NOTION_TOKEN environment variable is not set")
    }

    if (!experienceDatabaseId) {
      console.log("NOTION_EXPERIENCE_DATABASE_ID not set, returning mock data")
      return getMockExperience()
    }

    // Use REST API directly to query experience database
    let response
    try {
      console.log("[v0] Querying experience database with Published filter")
      const res = await fetch("https://api.notion.com/v1/databases/" + experienceDatabaseId + "/query", {
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
              property: "StartDate",
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
      console.log("[v0] Published filter query failed, trying without filter:", filterError)
      // If Published property doesn't exist, get all pages
      const res = await fetch("https://api.notion.com/v1/databases/" + experienceDatabaseId + "/query", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.NOTION_TOKEN,
          "Notion-Version": "2024-06-15",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "StartDate",
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

    console.log("Fetched", response.results.length, "experience entries from Notion")

    const experiences = response.results.map((page: any) => {
      const properties = page.properties

      const experience = {
        id: page.id,
        title:
          properties.Title?.title?.[0]?.plain_text ||
          properties.Position?.title?.[0]?.plain_text ||
          "Untitled Position",
        company: properties.Company?.rich_text?.[0]?.plain_text || "Company Name",
        location: properties.Location?.rich_text?.[0]?.plain_text || "",
        startDate: properties.StartDate?.date?.start || "",
        endDate: properties.EndDate?.date?.start || properties.StartDate?.date?.end || "",
        current: properties.Current?.checkbox ?? false,
        description: properties.Description?.rich_text?.[0]?.plain_text || "",
        technologies: properties.Technologies?.multi_select?.map((tech: any) => tech.name) || [],
        achievements: properties.Achievements?.rich_text?.[0]?.plain_text || "",
        type: properties.Type?.select?.name || "Full-time",
        published: properties.Published?.checkbox ?? true,
      }

      console.log("Processed experience:", experience)
      return experience
    })

    return experiences
  } catch (error) {
    console.error("Error fetching Notion experience database:", error)
    return getMockExperience()
  }
}

function getMockExperience() {
  return [
    {
      id: "mock-exp-1",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01-01",
      endDate: "",
      current: true,
      description:
        "Lead development of web applications using React, Next.js, and Node.js. Mentored junior developers and implemented best practices for code quality and performance.",
      technologies: ["React", "Next.js", "TypeScript", "AWS", "PostgreSQL"],
      achievements:
        "• Increased application performance by 40%\n• Led a team of 5 developers\n• Implemented CI/CD pipeline reducing deployment time by 60%",
      type: "Full-time",
      published: true,
    },
    {
      id: "mock-exp-2",
      title: "Full Stack Developer",
      company: "Digital Agency Co.",
      location: "Remote",
      startDate: "2020-03-01",
      endDate: "2021-12-31",
      current: false,
      description:
        "Developed and maintained multiple client websites and web applications. Collaborated with design teams to implement pixel-perfect UI components.",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker", "Git"],
      achievements:
        "• Delivered 15+ client projects on time\n• Improved code review process\n• Reduced bug reports by 30%",
      type: "Full-time",
      published: true,
    },
    {
      id: "mock-exp-3",
      title: "Frontend Developer",
      company: "Startup Ventures",
      location: "New York, NY",
      startDate: "2019-06-01",
      endDate: "2020-02-28",
      current: false,
      description:
        "Built responsive web applications and improved user experience across multiple products. Worked closely with UX designers to implement modern interfaces.",
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
      achievements:
        "• Redesigned main product interface\n• Improved user engagement by 25%\n• Implemented automated testing",
      type: "Full-time",
      published: true,
    },
  ]
}
