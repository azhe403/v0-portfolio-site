import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ContactSection } from "@/components/sections/contact-section"

export default function ContactPage() {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <SidebarInset>
        <main className="flex-1">
          <ContactSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
