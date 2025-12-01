export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  location: string
  tags: string[]
  category: "adu" | "remodel"
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
    title: "University Heights Home Addition",
    description:
      "1,200 sq ft home addition featuring modern design with open floor plan, additional bedroom, and expanded living space.",
    longDescription:
      "This University Heights home addition project expanded a family home with a modern 1,200 sq ft addition. The design seamlessly integrates with the existing home, featuring an open floor plan with additional bedroom and bathroom. Modern materials and smart home technology complete this thoughtful expansion that increased both living space and property value.",
    location: "University Heights, San Diego",
    tags: ["Addition", "New Construction", "Modern"],
    category: "remodel",
    image: "/placeholder.svg",
    gallery: [
      "/luxury-modern-white-kitchen-remodel-marble-counter.jpg",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "February 2024",
    duration: "4 months",
    squareFeet: "1,200",
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
    title: "Carmel Valley Luxury Kitchen",
    description: "Complete kitchen renovation with custom cabinetry, premium appliances, and designer finishes.",
    longDescription:
      "This Carmel Valley kitchen renovation transformed a dated space into a culinary masterpiece. The project featured custom maple cabinetry with soft-close drawers, granite countertops, a large island with seating, and top-of-the-line appliances. The design incorporated ample storage solutions and created a welcoming space for family gatherings and entertaining.",
    location: "Carmel Valley, San Diego",
    tags: ["Remodel", "Kitchen", "Luxury"],
    category: "remodel",
    image: "/luxury-kitchen-remodel-modern-white-marble-san-die.jpg",
    gallery: [
      "/kitchen-island-professional-appliances.jpg",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    completionDate: "October 2023",
    duration: "3 months",
    squareFeet: "400",
  },
]
