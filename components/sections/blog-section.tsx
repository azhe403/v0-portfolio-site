"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CalendarDays, Clock, Filter, X } from "lucide-react"
import Link from "next/link"
import { RefreshButton } from "@/components/refresh-button"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  category: string
  readTime: number
  published: boolean
}

interface BlogSectionProps {
  posts: BlogPost[]
  categories: string[]
}

export function BlogSection({ posts, categories }: BlogSectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts)

  // Initialize category from URL on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category")
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl)
    } else if (categoryFromUrl === null) {
      setSelectedCategory(null)
    }
  }, [searchParams, categories])

  // Update filtered posts when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(posts.filter((post) => post.category === selectedCategory))
    } else {
      setFilteredPosts(posts)
    }
  }, [selectedCategory, posts])

  const updateCategoryInUrl = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog"
    router.push(newUrl, { scroll: false })
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    updateCategoryInUrl(category)
  }

  const clearFilter = () => {
    handleCategorySelect(null)
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
    <section className="min-h-screen p-6 md:p-8">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Blog</h1>
              <p className="mt-2 text-muted-foreground">
                Thoughts, tutorials, and insights about web development and technology.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RefreshButton />
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(null)}
              className="h-8"
            >
              All ({posts.length})
            </Button>
            {categories.map((category) => {
              const count = posts.filter((post) => post.category === category).length
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategorySelect(category)}
                  className="h-8"
                >
                  {category} ({count})
                </Button>
              )
            })}
          </div>
          {selectedCategory && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">
                Showing <strong>{filteredPosts.length}</strong> posts in <strong>{selectedCategory}</strong>
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilter} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-semibold mb-2">
                {selectedCategory ? `No posts found in "${selectedCategory}"` : "No blog posts found"}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {selectedCategory
                  ? "Try selecting a different category or clear the filter."
                  : 'Make sure you have published posts in your Notion database with the "Published" checkbox checked.'}
              </p>
              <div className="flex gap-2">
                {selectedCategory && (
                  <Button variant="outline" onClick={clearFilter}>
                    Clear Filter
                  </Button>
                )}
                <RefreshButton />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="transition-all hover:shadow-md hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl hover:text-primary transition-colors flex-1">
                          {post.title}
                        </CardTitle>
                        <Badge className={`${getCategoryColor(post.category)} shrink-0`}>{post.category}</Badge>
                      </div>
                      <CardDescription className="text-base">{post.description}</CardDescription>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
