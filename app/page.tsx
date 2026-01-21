import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AboutSection } from "@/components/sections/about-section"

export default function HomePage() {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <AboutSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
