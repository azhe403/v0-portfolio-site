import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MapPin, Calendar, Briefcase } from "lucide-react"
import { getNotionExperience } from "@/lib/notion-experience"
import { RefreshButton } from "@/components/refresh-button"

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

function formatDateRange(startDate: string, endDate: string, current: boolean) {
  const start = formatDate(startDate)
  if (current) {
    return `${start} - Present`
  }
  const end = formatDate(endDate)
  return `${start} - ${end}`
}

export async function ExperienceSection() {
  const experiences = await getNotionExperience()

  return (
    <section className="min-h-screen p-6 md:p-8">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="mx-auto max-w-4xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Experience</h2>
              <p className="mt-2 text-muted-foreground">My professional journey and the roles that shaped my career.</p>
            </div>
            <div className="flex items-center gap-2">
              <RefreshButton />
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-semibold mb-2">No experience entries found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Make sure you have published experience entries in your Notion database.
              </p>
              <RefreshButton />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {experiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{experience.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground">
                        {experience.company}
                      </CardDescription>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDateRange(experience.startDate, experience.endDate, experience.current)}</span>
                        </div>
                        {experience.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{experience.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2">
                      {experience.current && (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{experience.description}</p>

                  {experience.achievements && (
                    <div>
                      <h4 className="font-medium mb-2">Key Achievements</h4>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">{experience.achievements}</div>
                    </div>
                  )}

                  {experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
