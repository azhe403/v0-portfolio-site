import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Layers3 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { PortfolioProject } from "@/lib/notion-projects"

type ProjectsSectionProps = {
  projects: PortfolioProject[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="min-h-screen bg-muted/50 p-6 md:p-8">
      <div className="sticky top-0 z-10 mb-8 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Projects</h2>
              <p className="mt-2 text-muted-foreground">
                Selected work, synced from Notion.
              </p>
            </div>
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-background px-6 py-16 text-center">
            <Layers3 className="mx-auto mb-4 size-8 text-muted-foreground" aria-hidden="true" />
            <h3 className="text-lg font-semibold">No published projects yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add projects to the connected Notion database and mark them as published.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {project.image ? (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground" aria-hidden="true">
                    <Layers3 className="size-10" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  {project.description && <CardDescription>{project.description}</CardDescription>}
                </CardHeader>
                {project.technologies.length > 0 && (
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
                {(project.github || project.demo) && (
                  <CardFooter className="flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 size-4" aria-hidden="true" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 size-4" aria-hidden="true" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
