import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BlogSection } from "@/components/sections/blog-section"
import { getNotionDatabase, getBlogCategories } from "@/lib/notion"
import { Suspense } from "react"

// Revalidate every 60 seconds
export const revalidate = 60

// Add metadata generation for better SEO
export async function generateMetadata({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category

  if (category) {
    return {
      title: `${category} Posts - Azhe's Blog`,
      description: `Browse all ${category} posts on Azhe's blog`,
    }
  }

  return {
    title: "Blog - Azhe's Portfolio",
    description: "Thoughts, tutorials, and insights about web development and technology",
  }
}

function BlogContent() {
  return <BlogPageContent />
}

async function BlogPageContent() {
  const posts = await getNotionDatabase()
  const categories = await getBlogCategories()

  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <BlogSection posts={posts} categories={categories} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <SidebarProvider>
          <PortfolioSidebar />
          <SidebarInset>
            <main className="flex-1 p-6 md:p-8">
              <div className="mx-auto max-w-4xl">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-32 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      }
    >
      <BlogContent />
    </Suspense>
  )
}
