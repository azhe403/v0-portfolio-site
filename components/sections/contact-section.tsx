"use client"

import type React from "react"

import { useState } from "react"
import { UniformButton } from "@/components/uniform-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="min-h-screen bg-muted/50 p-6 md:p-8">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Get In Touch</h2>
              <p className="mt-2 text-muted-foreground">
                I'm always open to discussing new opportunities and interesting projects.
              </p>
            </div>
            <div className="md:hidden">{/* <SidebarTrigger /> */}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Feel free to reach out through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:root@corp.azhe.my.id" className="hover:text-primary transition-colors">
                  root@corp.azhe.my.id
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Github className="h-5 w-5 text-muted-foreground" />
                <a
                  href="https://github.com/azhe403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  github.com/azhe403
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
                <a
                  href="https://linkedin.com/in/azhe403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  linkedin.com/in/azhe403
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <a
                  href="https://instagram.com/azhe403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  instagram.com/azhe403
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Twitter className="h-5 w-5 text-muted-foreground" />
                <a
                  href="https://twitter.com/azhe403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  twitter.com/azhe403
                </a>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Follow me on social media</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                  <UniformButton variant="outline" asChild className="w-full">
                    <a href="https://github.com/azhe403" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </UniformButton>
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
                  <UniformButton variant="outline" asChild className="w-full">
                    <a href="https://twitter.com/azhe403" target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </a>
                  </UniformButton>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <UniformButton type="submit" className="w-full">
                  Send Message
                </UniformButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
