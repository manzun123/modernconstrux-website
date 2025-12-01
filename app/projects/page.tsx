import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { projects } from "@/lib/projects-data"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">Our Portfolio</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight">Our Projects</h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Explore our portfolio of completed projects across San Diego. From custom ADUs to luxury remodels and
                commercial build-outs, see the quality craftsmanship we bring to every project.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
              <Button variant="secondary" size="sm" className="font-medium">
                All Projects
              </Button>
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground">
                ADUs
              </Button>
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground">
                Remodels
              </Button>
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground">
                Commercial
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group">
                  <article className="h-full">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                        {project.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h2>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1 mb-2">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let's discuss your vision and create something amazing together.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
