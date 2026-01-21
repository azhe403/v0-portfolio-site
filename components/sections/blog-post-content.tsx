"use client"

import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CalendarDays, Clock, ArrowLeft, Share2, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotionRenderer } from "@/components/notion-renderer"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface BlogPostContentProps {
  page: any
  blocks: any[]
}

export function BlogPostContent({ page, blocks }: BlogPostContentProps) {
  const router = useRouter()
  const [showStickyTitle, setShowStickyTitle] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; text: string; level: number }>>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setShowStickyTitle(scrollTop > 300)
      setReadingProgress(Math.min(progress, 100))
    }

    // Generate table of contents from headings
    const generateTOC = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const toc = Array.from(headings).map((heading, index) => ({
        id: heading.id || `heading-${index}`,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      }))
      setTableOfContents(toc)
    }

    window.addEventListener("scroll", handleScroll)
    // Generate TOC after content loads
    setTimeout(generateTOC, 1000)

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
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBackToBlog = () => {
    // Check if there's a referrer from the blog page with category
    const referrer = document.referrer
    if (referrer && referrer.includes("/blog")) {
      router.back()
    } else {
      router.push("/blog")
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/blog?category=${encodeURIComponent(category)}`)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Tutorial: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      Personal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      General: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
      Tech: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      Review: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
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
        <div className="mx-auto max-w-7xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToBlog}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
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
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-3">
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
              <Button variant="ghost" size="sm" onClick={handleBackToBlog}>
                <ArrowLeft className="mr-1 h-3 w-3" />
                <span className="hidden sm:inline">Blog</span>
              </Button>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-3">
            <header className="mb-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold leading-tight flex-1">{page.title}</h1>
                <Button
                  variant="ghost"
                  className={`${getCategoryColor(page.category)} shrink-0 hover:opacity-80`}
                  onClick={() => handleCategoryClick(page.category)}
                >
                  {page.category}
                </Button>
              </div>
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
                <Button variant="outline" onClick={handleBackToBlog}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
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

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Article Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Article Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Published</p>
                    <p className="text-sm text-muted-foreground">{page.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reading Time</p>
                    <p className="text-sm text-muted-foreground">{page.readTime} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <Button
                      variant="ghost"
                      className={`${getCategoryColor(page.category)} text-xs p-1 h-auto hover:opacity-80`}
                      onClick={() => handleCategoryClick(page.category)}
                    >
                      {page.category}
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${readingProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{Math.round(readingProgress)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {page.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {page.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left text-sm hover:text-primary transition-colors ${
                            item.level === 1
                              ? "font-medium"
                              : item.level === 2
                                ? "pl-3"
                                : item.level === 3
                                  ? "pl-6"
                                  : "pl-9"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Share */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleShare} className="w-full bg-transparent" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Article
                  </Button>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <img src="https://github.com/azhe403.png" alt="Azhe" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium">Azhe</p>
                      <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Passionate about web development and creating amazing user experiences.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent" asChild>
                    <a href="https://github.com/azhe403" target="_blank" rel="noopener noreferrer">
                      Follow on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
