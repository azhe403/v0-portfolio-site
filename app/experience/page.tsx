import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ExperienceSection } from "@/components/sections/experience-section"

// Revalidate every 60 seconds
export const revalidate = 60

export default function ExperiencePage() {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <ExperienceSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
