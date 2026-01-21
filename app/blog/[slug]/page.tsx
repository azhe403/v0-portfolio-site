import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BlogPostContent } from "@/components/sections/blog-post-content"
import { getNotionPage, getNotionBlocks } from "@/lib/notion"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    console.log("BlogPostPage: Fetching post with slug:", params.slug)

    const page = await getNotionPage(params.slug)
    console.log("BlogPostPage: Found page:", page)

    const blocks = await getNotionBlocks(page.id)
    console.log("BlogPostPage: Found blocks:", blocks.length)

    return (
      <SidebarProvider>
        <PortfolioSidebar />
        <SidebarInset>
          <main className="flex-1">
            <BlogPostContent page={page} blocks={blocks} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    )
  } catch (error) {
    console.error("BlogPostPage: Error loading post:", error)
    notFound()
  }
}

export async function generateStaticParams() {
  // This would fetch all blog post slugs from Notion
  // For now, we'll return an empty array to enable ISR
  return []
}
