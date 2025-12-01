export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  location: string
  tags: string[]
  category: "adu" | "remodel" | "commercial"
  image: string
  gallery: string[]
  completionDate: string
  duration: string
  squareFeet?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Pacific Beach Modern ADU",
    description:
      "A 600 sq ft detached ADU featuring contemporary design with an open floor plan, custom cabinetry, and private patio.",
    longDescription:
      "This stunning Pacific Beach ADU project transformed an underutilized backyard into a modern 600 sq ft living space. The design emphasizes natural light with large windows and sliding glass doors that open to a private patio. The interior features custom cabinetry, quartz countertops, and high-end fixtures throughout. Perfect for guests or rental income.",
    location: "Pacific Beach, San Diego",
    tags: ["ADU", "New Construction", "Modern"],
    category: "adu",
    image: "/modern-detached-adu-small-house-exterior-clean-fac.jpg",
    gallery: [
      "/modern-adu-exterior-backyard-san-diego-clean-desig.jpg",
      "/adu-modern-living-room-interior-bright-natural-lig.jpg",
      "/small-modern-kitchen-white-cabinets-quartz-counter.jpg",
      "/adu-bedroom-large-windows-natural-light-modern-min.jpg",
    ],
    completionDate: "March 2024",
    duration: "5 months",
    squareFeet: "600",
  },
  {
    id: "2",
    title: "La Jolla Kitchen Remodel",
    description:
      "Complete kitchen transformation with custom Italian cabinetry, marble countertops, and professional-grade appliances.",
    longDescription:
      "This La Jolla kitchen remodel transformed a dated 1980s kitchen into a chef's dream. We removed a wall to open the space to the dining area, installed custom Italian cabinetry with soft-close drawers, Calacatta marble countertops, and a suite of Wolf and Sub-Zero appliances. The result is a functional, beautiful space perfect for entertaining.",
    location: "La Jolla, San Diego",
    tags: ["Remodel", "Kitchen", "Luxury"],
    category: "remodel",
    image: "/luxury-white-kitchen-remodel-marble-countertops-la.jpg",
    gallery: [
      "/luxury-kitchen-white-cabinets-calacatta-marble-isl.jpg",
      "/kitchen-island-professional-wolf-appliances-modern.jpg",
      "/kitchen-dining-area-open-floor-plan-luxury-home.jpg",
      "/kitchen-detail-marble-backsplash-custom-cabinetry.jpg",
    ],
    completionDate: "January 2024",
    duration: "3 months",
    squareFeet: "350",
  },
  {
    id: "3",
    title: "Downtown Office Build-Out",
    description:
      "Modern 5,000 sq ft office space with open floor plan, private offices, and state-of-the-art conference rooms.",
    longDescription:
      "This downtown San Diego tenant improvement project created a modern, collaborative workspace for a growing tech company. The design features an open floor plan with dedicated zones for focused work, collaboration spaces, and a stunning reception area. Private offices and conference rooms are equipped with the latest AV technology and acoustic treatments.",
    location: "Downtown San Diego",
    tags: ["Commercial", "Tenant Improvement", "Office"],
    category: "commercial",
    image: "/modern-office-space-downtown-san-diego-commercial-.jpg",
    gallery: [
      "/modern-office-reception-area-contemporary-design.jpg",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "February 2024",
    duration: "4 months",
    squareFeet: "5,000",
  },
  {
    id: "4",
    title: "North Park Whole Home Remodel",
    description: "Complete renovation of a 1920s craftsman home, preserving character while adding modern amenities.",
    longDescription:
      "This North Park project involved a complete renovation of a historic 1920s craftsman home. We carefully preserved original details like built-in cabinetry and hardwood floors while updating the kitchen, bathrooms, and electrical throughout. A new master suite was added, and the backyard was transformed into an outdoor living space with a covered patio.",
    location: "North Park, San Diego",
    tags: ["Remodel", "Whole Home", "Historic"],
    category: "remodel",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "November 2023",
    duration: "6 months",
    squareFeet: "2,200",
  },
  {
    id: "5",
    title: "Hillcrest ADU with Rooftop Deck",
    description: "Two-story 800 sq ft ADU with rooftop deck, maximizing space on a compact urban lot.",
    longDescription:
      "This innovative Hillcrest ADU maximizes every square inch on a compact urban lot. The two-story design features a ground floor living area and kitchen with a bedroom and bathroom above. The highlight is the rooftop deck with stunning views of the San Diego skyline. Modern materials and smart home technology complete this urban retreat.",
    location: "Hillcrest, San Diego",
    tags: ["ADU", "New Construction", "Urban"],
    category: "adu",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "December 2023",
    duration: "6 months",
    squareFeet: "800",
  },
  {
    id: "6",
    title: "Mission Valley Restaurant Build-Out",
    description: "Full restaurant build-out including commercial kitchen, dining area, and outdoor patio space.",
    longDescription:
      "This Mission Valley commercial project transformed a raw shell into a fully operational upscale restaurant. The scope included a complete commercial kitchen with all required equipment, an elegant dining room with custom millwork, a full bar, and an outdoor patio with shade structures. All work was completed to code with full ADA compliance.",
    location: "Mission Valley, San Diego",
    tags: ["Commercial", "Restaurant", "New Construction"],
    category: "commercial",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "October 2023",
    duration: "5 months",
    squareFeet: "3,500",
  },
]
