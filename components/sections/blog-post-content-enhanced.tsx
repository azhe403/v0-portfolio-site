"use client"

import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NotionRenderer } from "@/components/notion-renderer"
import { useEffect, useState } from "react"

interface BlogPostContentProps {
  page: any
  blocks: any[]
}

export function BlogPostContentEnhanced({ page, blocks }: BlogPostContentProps) {
  const [showStickyTitle, setShowStickyTitle] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setShowStickyTitle(scrollTop > 300)
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: page.title,
          text: page.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <article className="min-h-screen p-6 md:p-8">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Article Title - appears when scrolling */}
      <div
        className={`fixed top-1 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-b shadow-sm transition-all duration-300 ${
          showStickyTitle ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-4xl px-6 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">{page.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>{page.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{page.readTime} min read</span>
                </div>
                <div className="hidden sm:block">
                  <span>{Math.round(readingProgress)}% read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">Blog</span>
                </Link>
              </Button>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold leading-tight">{page.title}</h1>
          <p className="text-xl text-muted-foreground">{page.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{page.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{page.readTime} min read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {page.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <NotionRenderer blocks={blocks} />
        </div>

        {/* Back to Blog Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2">
              {page.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
