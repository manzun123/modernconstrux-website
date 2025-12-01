"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      projectType: formData.get("projectType") as string,
      message: formData.get("message") as string,
    }

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.name.trim()) newErrors.name = "Name is required"
    if (!data.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format"
    if (!data.phone.trim()) newErrors.phone = "Phone is required"
    if (!data.projectType) newErrors.projectType = "Please select a project type"
    if (!data.message.trim()) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Submission failed")
      }
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <ScrollAnimate variant="fade-up">
                <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">Get In Touch</p>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={100}>
                <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight">
                  Request a Quote
                </h1>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={200}>
                <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                  Ready to start your project? Fill out the form below and our team will get back to you within 24 hours
                  with a free consultation.
                </p>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ScrollAnimate variant="fade-right">
                  {isSubmitted ? (
                    <div className="bg-muted rounded-lg p-12 text-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                      <p className="text-muted-foreground mb-6">
                        We&apos;ve received your request and will get back to you within 24 hours.
                      </p>
                      <Button asChild>
                        <Link href="/">Return Home</Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {errors.form && (
                        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                          {errors.form}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Smith"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(858) 555-1234"
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Project Address</Label>
                          <Input id="address" name="address" placeholder="123 Main St, San Diego, CA" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select name="projectType">
                          <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adu">ADU Construction</SelectItem>
                            <SelectItem value="kitchen-remodel">Kitchen Remodel</SelectItem>
                            <SelectItem value="bathroom-remodel">Bathroom Remodel</SelectItem>
                            <SelectItem value="whole-home-remodel">Whole Home Remodel</SelectItem>
                            <SelectItem value="tenant-improvement">Tenant Improvement</SelectItem>
                            <SelectItem value="commercial">Commercial Construction</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.projectType && <p className="text-destructive text-sm">{errors.projectType}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell Us About Your Project *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Describe your project, timeline, and any specific requirements..."
                          rows={5}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
                      </div>

                      <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </form>
                  )}
                </ScrollAnimate>
              </div>

              {/* Contact Info Sidebar */}
              <div>
                <ScrollAnimate variant="fade-left" delay={200}>
                  <div className="bg-muted rounded-lg p-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <a
                            href="tel:+18587440521"
                            className="font-medium text-foreground hover:text-accent transition-colors"
                          >
                            (858) 744-0521
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <a
                            href="mailto:Manuel@modernconstrux.xyz"
                            className="font-medium text-foreground hover:text-accent transition-colors"
                          >
                            Manuel@modernconstrux.xyz
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Office</p>
                          <p className="font-medium text-foreground">
                            113 West G St #408
                            <br />
                            San Diego, CA
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hours</p>
                          <p className="font-medium text-foreground">
                            Mon - Fri: 8am - 6pm
                            <br />
                            Sat: 9am - 2pm
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground">CA Contractor License #1234567</p>
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
