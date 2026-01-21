import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL. Features include user authentication, product management, and order processing.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful data visualizations.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export function ProjectsSection() {
  return (
    <section className="min-h-screen bg-muted/50 p-6 md:p-8">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Projects</h2>
              <p className="mt-2 text-muted-foreground">
                Here are some of my recent projects that showcase my skills and experience.
              </p>
            </div>
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
