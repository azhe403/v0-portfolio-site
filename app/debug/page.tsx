import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNotionDatabase, getBlogCategories } from "@/lib/notion"
import { getNotionExperience } from "@/lib/notion-experience"

export default async function DebugPage() {
  const envVars = {
    NOTION_TOKEN: process.env.NOTION_TOKEN ? "✅ Set" : "❌ Missing",
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? "✅ Set" : "❌ Missing",
    NOTION_EXPERIENCE_DATABASE_ID: process.env.NOTION_EXPERIENCE_DATABASE_ID ? "✅ Set" : "❌ Missing",
  }

  let posts = []
  let categories = []
  let experiences = []
  let blogError = null
  let experienceError = null

  try {
    posts = await getNotionDatabase()
    categories = await getBlogCategories()
  } catch (err) {
    blogError = err instanceof Error ? err.message : "Unknown error"
  }

  try {
    experiences = await getNotionExperience()
  } catch (err) {
    experienceError = err instanceof Error ? err.message : "Unknown error"
  }

  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold">Debug Information</h1>

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Check if your environment variables are properly set</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(envVars).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-mono">{key}:</span>
                      <Badge variant={value.includes("✅") ? "default" : "destructive"}>{value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Database Connection</CardTitle>
                <CardDescription>Status of your blog Notion database connection</CardDescription>
              </CardHeader>
              <CardContent>
                {blogError ? (
                  <div className="text-red-500">
                    <p className="font-semibold">Error:</p>
                    <p className="font-mono text-sm">{blogError}</p>
                  </div>
                ) : (
                  <div className="text-green-500">
                    <p>✅ Successfully connected to blog database</p>
                    <p>Found {posts.length} posts</p>
                    <p>
                      Found {categories.length} categories: {categories.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Blog posts found in your Notion database</CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post: any) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{post.title}</h3>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Slug: {post.slug} | Date: {post.date} | Read Time: {post.readTime} min
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No blog posts found</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Database Schema</CardTitle>
                <CardDescription>Required properties for your blog Notion database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    • <strong>Title</strong> (Title property) - Blog post title
                  </div>
                  <div>
                    • <strong>Description</strong> (Text property) - Blog post description
                  </div>
                  <div>
                    • <strong>Slug</strong> (Text property) - URL-friendly slug
                  </div>
                  <div>
                    • <strong>Date</strong> (Date property) - Publication date
                  </div>
                  <div>
                    • <strong>Tags</strong> (Multi-select property) - Blog post tags
                  </div>
                  <div>
                    • <strong>Category</strong> (Select property) - Blog post category{" "}
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      NEW
                    </Badge>
                  </div>
                  <div>
                    • <strong>ReadTime</strong> (Number property) - Estimated reading time in minutes
                  </div>
                  <div>
                    • <strong>Published</strong> (Checkbox property) - Show on website
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Database Connection</CardTitle>
                <CardDescription>Status of your experience Notion database connection</CardDescription>
              </CardHeader>
              <CardContent>
                {experienceError ? (
                  <div className="text-red-500">
                    <p className="font-semibold">Error:</p>
                    <p className="font-mono text-sm">{experienceError}</p>
                  </div>
                ) : (
                  <div className="text-green-500">
                    <p>✅ Successfully connected to experience database</p>
                    <p>Found {experiences.length} experience entries</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Entries</CardTitle>
                <CardDescription>Experience entries found in your Notion database</CardDescription>
              </CardHeader>
              <CardContent>
                {experiences.length > 0 ? (
                  <div className="space-y-4">
                    {experiences.map((exp: any) => (
                      <div key={exp.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <Badge variant={exp.current ? "default" : "secondary"}>
                            {exp.current ? "Current" : "Past"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech: string) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No experience entries found</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Database Schema</CardTitle>
                <CardDescription>Required properties for your experience Notion database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    • <strong>Title</strong> (Title property) - Job title/position
                  </div>
                  <div>
                    • <strong>Company</strong> (Text property) - Company name
                  </div>
                  <div>
                    • <strong>Location</strong> (Text property) - Work location
                  </div>
                  <div>
                    • <strong>StartDate</strong> (Date property) - Employment start date
                  </div>
                  <div>
                    • <strong>EndDate</strong> (Date property) - Employment end date (optional)
                  </div>
                  <div>
                    • <strong>Current</strong> (Checkbox property) - Currently employed
                  </div>
                  <div>
                    • <strong>Description</strong> (Text property) - Job description
                  </div>
                  <div>
                    • <strong>Technologies</strong> (Multi-select property) - Technologies used
                  </div>
                  <div>
                    • <strong>Achievements</strong> (Text property) - Key achievements
                  </div>
                  <div>
                    • <strong>Type</strong> (Select property) - Employment type (Full-time, Part-time, etc.)
                  </div>
                  <div>
                    • <strong>Published</strong> (Checkbox property) - Show on website
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
