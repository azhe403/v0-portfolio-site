import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">404</CardTitle>
                <CardDescription className="text-xl">Page Not Found</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The page you're looking for doesn't exist or may have been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">If you're trying to access a blog post, make sure:</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• The post is published in Notion</li>
                    <li>• The slug matches exactly</li>
                    <li>• Your Notion integration is properly configured</li>
                  </ul>
                  <Button variant="link" asChild className="mt-2 p-0">
                    <Link href="/debug">Check Debug Page</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
