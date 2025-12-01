import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { projects } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Clock, Ruler, ArrowRight } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const relatedProjects = projects.filter((p) => p.id !== id && p.category === project.category).slice(0, 2)

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* Hero Image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-7xl">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">{project.title}</h1>
              <p className="flex items-center gap-2 text-primary-foreground/80 mt-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{project.longDescription}</p>

                {/* Gallery */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-foreground mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-muted rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="font-medium text-foreground">{project.completionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">{project.duration}</p>
                      </div>
                    </div>
                    {project.squareFeet && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <Ruler className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Size</p>
                          <p className="font-medium text-foreground">{project.squareFeet} sq ft</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">Interested in a similar project?</p>
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Request a Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="group">
                    <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
                      <img
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-semibold text-primary-foreground">{relatedProject.title}</h3>
                        <p className="text-sm text-primary-foreground/80 mt-1">{relatedProject.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
