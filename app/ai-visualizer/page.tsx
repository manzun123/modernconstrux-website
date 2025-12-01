"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { REMODEL_STYLES, type RemodelStyle, type RemodelResult } from "@/lib/remodel-ai"
import { Upload, Sparkles, Loader2, X, Download, ArrowRight } from "lucide-react"

export default function AIVisualizerPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<RemodelResult | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<RemodelStyle>("modern")
  const [error, setError] = useState<string | null>(null)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPEG or PNG image")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB")
      return
    }

    setError(null)
    setUploadedFile(file)
    setResult(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (file) {
        const syntheticEvent = {
          target: { files: [file] },
        } as React.ChangeEvent<HTMLInputElement>
        handleFileUpload(syntheticEvent)
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleGenerate = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/remodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedImage,
          style: selectedStyle,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || "Failed to generate remodel preview")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const clearUpload = () => {
    setUploadedImage(null)
    setUploadedFile(null)
    setResult(null)
    setError(null)
  }

  const handleDownload = () => {
    if (!result?.afterImageUrl) return
    const link = document.createElement("a")
    link.href = result.afterImageUrl
    link.download = `modern-construx-remodel-${selectedStyle}.jpg`
    link.click()
  }

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-accent font-medium uppercase tracking-wide text-sm mb-2">Modern Construx</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                Virtual Remodel Preview
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Upload a photo of your room and see AI-generated remodel concepts in your chosen style. Visualize the
                possibilities before starting your project.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Upload & Style Selection */}
            {!result && (
              <div className="max-w-2xl mx-auto">
                {/* Upload Area */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">1. Upload a photo of your room</h2>

                  {!uploadedImage ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent/50 transition-colors cursor-pointer bg-muted/30"
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-7 h-7 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium text-foreground mb-1">Drag and drop your image here</p>
                        <p className="text-muted-foreground mb-3">or click to browse</p>
                        <p className="text-sm text-muted-foreground">JPEG or PNG (max 10MB)</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded room"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <button
                        onClick={clearUpload}
                        className="absolute top-3 right-3 w-8 h-8 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-primary-foreground" />
                      </button>
                      {uploadedFile && (
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-primary/80 rounded text-primary-foreground text-sm">
                          {uploadedFile.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mb-6 px-4 py-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>
                )}

                {/* Style Selection */}
                {uploadedImage && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">2. Select a design style</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {REMODEL_STYLES.map((style) => (
                          <button
                            key={style.value}
                            onClick={() => setSelectedStyle(style.value)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              selectedStyle === style.value
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <p className="font-medium text-foreground">{style.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Generating Remodel...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 w-5 h-5" />
                          Remodel Room
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Before/After Results */}
            {result && (
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Your Remodel Preview</h2>
                  <Button variant="outline" onClick={clearUpload}>
                    Start Over
                  </Button>
                </div>

                {/* Before/After Comparison */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">Before</Label>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <img src={uploadedImage || ""} alt="Original room" className="w-full aspect-[4/3] object-cover" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                      After ({REMODEL_STYLES.find((s) => s.value === result.style)?.label})
                    </Label>
                    <div className="rounded-lg overflow-hidden border border-border relative group">
                      <img
                        src={result.afterImageUrl || ""}
                        alt="Remodeled room concept"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <button
                        onClick={handleDownload}
                        className="absolute bottom-3 right-3 px-3 py-2 bg-primary/90 hover:bg-primary rounded-md text-primary-foreground text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Try Another Style */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm text-muted-foreground py-2">Try another style:</span>
                  {REMODEL_STYLES.filter((s) => s.value !== result.style).map((style) => (
                    <Button
                      key={style.value}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedStyle(style.value)
                        setResult(null)
                        setTimeout(handleGenerate, 100)
                      }}
                    >
                      {style.label}
                    </Button>
                  ))}
                </div>

                {/* CTA - Request Quote */}
                <div className="bg-muted rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Interested in this remodel?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let our team at Modern Construx bring this vision to life.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setShowQuoteDialog(true)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* How It Works */}
            {!result && (
              <div className="mt-20 pt-16 border-t border-border max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Upload Your Photo",
                      description: "Take a photo of your current room or upload an existing image.",
                    },
                    {
                      step: "2",
                      title: "Choose a Style",
                      description: "Select from Modern, Farmhouse, Coastal, and more design styles.",
                    },
                    {
                      step: "3",
                      title: "See Your Remodel",
                      description: "Get an AI-generated preview of your remodeled space in seconds.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Quote Request Dialog */}
      <QuoteDialog
        open={showQuoteDialog}
        onOpenChange={setShowQuoteDialog}
        style={result?.style}
        beforeImage={uploadedImage}
        afterImage={result?.afterImageUrl}
      />

      <Footer />
    </>
  )
}

// Quote Request Dialog Component
function QuoteDialog({
  open,
  onOpenChange,
  style,
  beforeImage,
  afterImage,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  style?: RemodelStyle
  beforeImage?: string | null
  afterImage?: string | null
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes"),
      remodelStyle: style,
      // In production, you might upload images to a storage service
      // and include the URLs here
      hasBeforeImage: !!beforeImage,
      hasAfterImage: !!afterImage,
    }

    // TODO: Send to your backend/CRM
    console.log("[Quote Request]", data)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <DialogTitle className="text-xl mb-2">Thank You!</DialogTitle>
            <DialogDescription>
              We've received your request and will be in touch within 24 hours to discuss your remodel project.
            </DialogDescription>
            <Button
              className="mt-6"
              onClick={() => {
                setSubmitted(false)
                onOpenChange(false)
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll get back to you with a free estimate.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Project Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Tell us about your remodel project..." rows={3} />
          </div>
          {style && (
            <p className="text-sm text-muted-foreground">
              Selected style: <span className="font-medium capitalize">{style}</span>
            </p>
          )}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
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
      </DialogContent>
    </Dialog>
  )
}
