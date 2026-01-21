"use client"
import { User, Briefcase, Code, Mail, Github, Linkedin, Twitter, BookOpen, Instagram } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  {
    title: "About",
    icon: User,
    href: "/",
  },
  {
    title: "Projects",
    icon: Code,
    href: "/projects",
  },
  {
    title: "Experience",
    icon: Briefcase,
    href: "/experience",
  },
  {
    title: "Blog",
    icon: BookOpen,
    href: "/blog",
  },
  {
    title: "Contact",
    icon: Mail,
    href: "/contact",
  },
]

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/azhe403",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/azhe403",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/azhe403",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/azhe403",
  },
]

export function PortfolioSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/azhe403.png" alt="Profile" />
            <AvatarFallback>AZ</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Azhe</h2>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} className="w-full justify-start">
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col space-y-3 mb-4">
          <ThemeToggle />
          <div className="grid grid-cols-2 gap-1 sm:flex sm:space-x-1">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* v0.dev Credit */}
        <div className="text-center py-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              v0.dev
            </a>
          </p>
        </div>

        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
