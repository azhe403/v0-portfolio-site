import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code2, Server, Layout, Cpu } from "lucide-react"
import packageJson from "@/package.json"

export default function TechStackPage() {
  const deps = packageJson.dependencies as Record<string, string>
  const devDeps = packageJson.devDependencies as Record<string, string>

  const getVer = (name: string, isDev = false) => {
    const ver = isDev ? devDeps[name] : deps[name]
    return ver ? ver.replace(/[\^~]/g, "") : "Latest"
  }

  const techStack = [
    {
      category: "Frontend",
      icon: Layout,
      items: [
        { name: "React", description: "UI Library", version: getVer("react") },
        { name: "Next.js", description: "React Framework", version: getVer("next") },
        { name: "Tailwind CSS", description: "Styling", version: getVer("tailwindcss", true) },
        { name: "Lucide React", description: "Icons", version: getVer("lucide-react") },
        { name: "Next Themes", description: "Theme Management", version: getVer("next-themes") },
        { name: "Radix UI", description: "Primitives", version: getVer("@radix-ui/react-slot") },
      ],
    },
    {
      category: "Backend & Data",
      icon: Server,
      items: [
        { name: "Next.js API Routes", description: "Serverless Backend", version: getVer("next") },
        { name: "Notion SDK", description: "CMS Integration", version: getVer("@notionhq/client") },
      ],
    },
    {
      category: "Languages & Tools",
      icon: Code2,
      items: [
        { name: "TypeScript", description: "Type-safe JS", version: getVer("typescript", true) },
        { name: "PostCSS", description: "CSS Processing", version: getVer("postcss", true) },
        { name: "Autoprefixer", description: "Vendor Prefixing", version: getVer("autoprefixer", true) },
        { name: "ESLint", description: "Linting", version: getVer("eslint", true) },
        { name: "Husky", description: "Git Hooks", version: getVer("husky", true) },
      ],
    },
    {
      category: "DevOps & Deployment",
      icon: Cpu,
      items: [
        { name: "Vercel", description: "Hosting & CI/CD", version: "Managed" },
        { name: "GitHub", description: "Version Control", version: "Managed" },
      ],
    },
  ]

  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Tech Stack</h1>
              <p className="text-muted-foreground text-lg">
                The modern technologies and tools that power this portfolio site.
              </p>
            </div>
            
            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
              {techStack.map((stack) => (
                <div key={stack.category} className="rounded-xl border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 flex flex-row items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                       <stack.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">{stack.category}</h2>
                  </div>
                  <div className="px-6 pb-6 mt-2">
                    <div className="grid gap-4">
                      {stack.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {item.version}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border bg-muted/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-semibold">Designed with v0.dev</h3>
                <p className="text-sm text-muted-foreground">
                  This project architecture was initially generated and iterated upon using v0.dev by Vercel.
                </p>
              </div>
              <Badge variant="outline" className="bg-background">AI Supercharged</Badge>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
