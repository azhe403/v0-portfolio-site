import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProjectsSection } from "@/components/sections/projects-section"
import { getNotionProjects } from "@/lib/notion-projects"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projects = await getNotionProjects()
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <ProjectsSection projects={projects} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
