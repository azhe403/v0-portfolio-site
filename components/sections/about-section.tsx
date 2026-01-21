import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UniformButton } from "@/components/uniform-button"
import { Instagram, Linkedin } from "lucide-react"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "C#",
  ".NET",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Tailwind CSS",
  "GraphQL",
]

export function AboutSection() {
  return (
    <section className="min-h-screen p-6 md:p-8">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">About Me</h1>
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hello, I'm Azhe</CardTitle>
              <CardDescription>Full Stack Developer & Software Engineer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                I'm a passionate full-stack developer with expertise in building scalable web applications and software
                solutions. I love creating efficient, maintainable code and exploring new technologies to solve complex
                problems.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me contributing to open source projects, learning about new
                frameworks, or sharing knowledge with the developer community through my blog and social media.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <UniformButton variant="outline" asChild className="w-full">
                  <a href="https://linkedin.com/in/azhe403" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </UniformButton>
                <UniformButton variant="outline" asChild className="w-full">
                  <a href="https://instagram.com/azhe403" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </a>
                </UniformButton>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
              <CardDescription>Tools and technologies I work with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Stats</CardTitle>
              <CardDescription>My open source contributions and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=azhe403&show_icons=true&theme=transparent&hide_border=true"
                    alt="GitHub Stats"
                    className="w-full max-w-md"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=azhe403&layout=compact&theme=transparent&hide_border=true"
                    alt="Top Languages"
                    className="w-full max-w-md"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://github-readme-streak-stats.herokuapp.com/?user=azhe403&theme=transparent&hide_border=true"
                  alt="GitHub Streak"
                  className="w-full max-w-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
