"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, Download, ArrowRight, RefreshCw, Send, ChevronDown, ChevronUp, Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

// Project types for visualization
const PROJECT_TYPES = [
  { value: "Kitchen", label: "Kitchen" },
  { value: "Bathroom", label: "Bathroom" },
  { value: "Living Room", label: "Living Room" },
  { value: "Bedroom", label: "Bedroom" },
  { value: "ADU", label: "ADU / Guest House" },
  { value: "Exterior", label: "Exterior / Curb Appeal" },
  { value: "Other", label: "Other" },
]

// Design styles
const DESIGN_STYLES = [
  { value: "Modern", label: "Modern", description: "Clean lines, neutral palette" },
  { value: "Luxury", label: "Luxury", description: "Premium materials, sophisticated" },
  { value: "Farmhouse", label: "Farmhouse", description: "Warm wood, rustic charm" },
  { value: "Minimal", label: "Minimalist", description: "Simple, uncluttered" },
  { value: "Coastal", label: "Coastal", description: "Light, beach-inspired" },
  { value: "Spanish", label: "Spanish", description: "Mediterranean warmth" },
  { value: "Industrial", label: "Industrial", description: "Exposed elements, urban" },
]

interface GeneratedResult {
  imageBase64: string
  finalPrompt: string
  projectType: string
  style: string
}

interface UploadedImage {
  dataUrl: string
  filename: string
  size: number
}

export default function AIVisualizerPage() {
  const [projectType, setProjectType] = useState<string>("")
  const [style, setStyle] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GeneratedResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  
  // Uploaded image state
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB")
      return
    }

    setError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage({
        dataUrl: event.target?.result as string,
        filename: file.name,
        size: file.size,
      })
    }
    reader.readAsDataURL(file)
  }, [])

  // Remove uploaded image
  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null)
  }, [])

  const handleGenerate = async () => {
    if (!projectType || !style) {
      setError("Please select both a project type and design style")
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          style,
          notes: notes.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setResult({
          imageBase64: data.image_base64,
          finalPrompt: data.final_prompt,
          projectType: data.projectType,
          style: data.style,
        })
      } else if (data.disabled) {
        // AI Visualizer is disabled - don't retry
        setIsDisabled(true)
        setError(null)
      } else {
        setError(data.error || "Failed to generate image. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = useCallback(() => {
    if (!result?.imageBase64) return
    
    const link = document.createElement("a")
    link.href = `data:image/png;base64,${result.imageBase64}`
    link.download = `modern-construx-${result.projectType.toLowerCase()}-${result.style.toLowerCase()}.png`
    link.click()
  }, [result])

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  const handleTryAnotherStyle = (newStyle: string) => {
    setStyle(newStyle)
    setResult(null)
    // Auto-generate with new style
    setTimeout(() => {
      handleGenerate()
    }, 100)
  }

  return (
    <>
      <main>
        {/* Coming Soon Banner */}
        <div className="bg-accent py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-accent-foreground font-bold text-xl sm:text-2xl tracking-wide">
              AI Visualizer (Coming Soon)
            </p>
            <p className="text-accent-foreground/80 text-sm mt-1">
              Upload a photo and send it to us for a quote. Automated design generation is in progress.
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-primary py-16">
          <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-20">
            <Image
              src="/no background logo.png"
              alt="Modern Construx"
              width={160}
              height={160}
              className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain brightness-0 invert opacity-75"
            />
          </div>
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-accent font-medium uppercase tracking-wide text-sm mb-2">Modern Construx</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                AI Remodel Visualizer
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                See your dream remodel come to life! Select a room type and style to generate 
                photorealistic concept images powered by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Disabled Notice - Shows when AI generation is disabled but upload still works */}
            {isDisabled && (
              <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">AI Generation Coming Soon</h3>
                  <p className="text-amber-700 text-sm">
                    Automated design generation is not yet available. You can still upload a photo of your space 
                    and send it to us for a personalized quote!
                  </p>
                </div>
              </div>
            )}

            {/* Generator Controls - Always show unless we have a result */}
            {!result && (
              <div className="max-w-2xl mx-auto">
                <div className="space-y-8">
                  {/* Image Upload Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold mr-2">1</span>
                      Upload a Photo of Your Space (Optional)
                    </h2>
                    
                    {!uploadedImage ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-foreground mb-1">Click to upload or drag and drop</p>
                          <p className="text-sm text-muted-foreground">JPG, PNG, or WebP (max 10MB)</p>
                        </label>
                      </div>
                    ) : (
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          {/* Thumbnail */}
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={uploadedImage.dataUrl}
                              alt="Uploaded space"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* File info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">{uploadedImage.filename}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                onClick={handleRemoveImage}
                                className="p-1.5 hover:bg-muted rounded-md transition-colors flex-shrink-0"
                                aria-label="Remove image"
                              >
                                <X className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                              <ImageIcon className="w-4 h-4" />
                              Image ready to send
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold mr-2">2</span>
                      Select Project Type
                    </h2>
                    <Select value={projectType} onValueChange={setProjectType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a room or project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Design Style */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold mr-2">3</span>
                      Choose Design Style
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {DESIGN_STYLES.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setStyle(s.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            style === s.value
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <p className="font-medium text-foreground">{s.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold mr-2">4</span>
                      Add Details (Optional)
                    </h2>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe specific features you'd like to see: marble countertops, large windows, dark wood floors, etc."
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="px-4 py-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Generate Button - Only show if AI is not disabled */}
                    {!isDisabled && (
                      <Button
                        size="lg"
                        onClick={handleGenerate}
                        disabled={isGenerating || !projectType || !style}
                        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                            Generating... (30-60 seconds)
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 w-5 h-5" />
                            Generate Remodel Concept
                          </>
                        )}
                      </Button>
                    )}

                    {/* Send to Modern Construx Button - Always show */}
                    <Button
                      size="lg"
                      onClick={() => setShowQuoteDialog(true)}
                      variant={isDisabled ? "default" : "outline"}
                      className={isDisabled ? "flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" : "flex-1"}
                    >
                      <Send className="mr-2 w-5 h-5" />
                      Send to Modern Construx
                    </Button>
                  </div>
                </div>

                {/* How It Works - Only show if AI is not disabled */}
                {!isDisabled && (
                  <div className="mt-20 pt-16 border-t border-border">
                    <h2 className="text-2xl font-bold text-foreground text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          step: "1",
                          title: "Select Room & Style",
                          description: "Choose your project type and preferred design aesthetic.",
                        },
                        {
                          step: "2",
                          title: "Generate with AI",
                          description: "Our AI creates a photorealistic concept of your remodel.",
                        },
                        {
                          step: "3",
                          title: "Request a Quote",
                          description: "Love the design? Send it to us for a real estimate.",
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
            )}

            {/* Results */}
            {result && (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Your AI-Generated Concept</h2>
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>

                {/* Generated Image */}
                <div className="rounded-xl overflow-hidden border border-border mb-6">
                  <div className="relative aspect-[4/3] bg-muted">
                    <img
                      src={`data:image/png;base64,${result.imageBase64}`}
                      alt={`AI-generated ${result.projectType} in ${result.style} style`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleDownload}
                      className="absolute bottom-4 right-4 px-4 py-2 bg-primary/90 hover:bg-primary rounded-lg text-primary-foreground text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                  <div className="p-4 bg-muted/50">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                        {result.projectType}
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {result.style} Style
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prompt Details (Collapsible) */}
                <div className="mb-8">
                  <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPrompt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showPrompt ? "Hide" : "Show"} AI Prompt
                  </button>
                  {showPrompt && (
                    <div className="mt-3 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                      {result.finalPrompt}
                    </div>
                  )}
                </div>

                {/* Try Another Style */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm text-muted-foreground py-2">Try another style:</span>
                  {DESIGN_STYLES.filter((s) => s.value !== result.style).map((s) => (
                    <Button
                      key={s.value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTryAnotherStyle(s.value)}
                      disabled={isGenerating}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>

                {/* CTA - Send to Modern Construx */}
                <div className="bg-muted rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Love this concept?</h3>
                  <p className="text-muted-foreground mb-6">
                    Send this design to Modern Construx and we'll turn it into reality.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setShowQuoteDialog(true)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Send to Modern Construx
                  </Button>
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
        result={result}
        uploadedImage={uploadedImage}
        projectType={projectType}
        style={style}
        notes={notes}
      />

      <Footer />
    </>
  )
}

// Quote Request Dialog Component
function QuoteDialog({
  open,
  onOpenChange,
  result,
  uploadedImage,
  projectType,
  style,
  notes: pageNotes,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  result: GeneratedResult | null
  uploadedImage: UploadedImage | null
  projectType: string
  style: string
  notes: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const additionalNotes = formData.get("notes") as string

    // Build message
    const messageParts = ["AI Visualizer Lead"]
    if (projectType) messageParts.push(`\nProject Type: ${projectType}`)
    if (style) messageParts.push(`Design Style: ${style}`)
    if (pageNotes) messageParts.push(`\nDescription: ${pageNotes}`)
    if (additionalNotes) messageParts.push(`\nAdditional Notes: ${additionalNotes}`)
    if (uploadedImage) messageParts.push(`\nUser uploaded photo: ${uploadedImage.filename}`)
    if (result) messageParts.push(`\nAI-generated concept attached`)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          message: messageParts.join("\n"),
          source: "AI Visualizer",
          metadata: {
            projectType: projectType || result?.projectType,
            style: style || result?.style,
            notes: pageNotes,
            finalPrompt: result?.finalPrompt,
            // Include AI-generated image if available (truncated)
            generatedImageBase64: result?.imageBase64?.substring(0, 1000),
            // Include user-uploaded image
            uploadedImageDataUrl: uploadedImage?.dataUrl,
            uploadedImageFilename: uploadedImage?.filename,
          },
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || "Failed to submit. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again or call us at (858) 744-0521.")
    } finally {
      setIsSubmitting(false)
    }
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
              Your message has been sent. We will contact you shortly to discuss bringing this design to life.
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
          <DialogTitle>Send to Modern Construx</DialogTitle>
          <DialogDescription>
            Share your project details with our team and we'll provide a personalized estimate.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="px-4 py-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" required placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="(858) 555-1234" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Tell us more about your project, timeline, or any specific requests..."
              rows={3}
            />
          </div>

          {/* Summary of what's being sent */}
          <div className="p-3 bg-muted rounded-lg text-sm space-y-2">
            <p className="text-muted-foreground font-medium">Sending with your request:</p>
            {projectType && (
              <p className="text-foreground">• Project Type: {projectType}</p>
            )}
            {style && (
              <p className="text-foreground">• Style: {style}</p>
            )}
            {uploadedImage && (
              <p className="text-green-600 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                Your uploaded photo: {uploadedImage.filename}
              </p>
            )}
            {result && (
              <p className="text-foreground">• AI-generated concept image</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 w-4 h-4" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
