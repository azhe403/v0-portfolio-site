import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProjectsSection } from "@/components/sections/projects-section"

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <ProjectsSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
