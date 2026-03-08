"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Eye, Heart } from "lucide-react"

const categories = ["All", "Residential", "Commercial", "Estate", "Rooftop", "Public Space"]

const projects = [
  {
    id: 1,
    title: "The Green Manor — Ikoyi",
    category: "Estate",
    location: "Ikoyi, Lagos",
    area: "2,400 sqm",
    duration: "8 months",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "A lush tropical estate garden featuring layered planting, stone pathways, and a central water feature.",
    tags: ["Estate", "Water Feature", "Tropical"],
    likes: 248,
    views: 1820,
    featured: true,
  },
  {
    id: 2,
    title: "Skyline Rooftop Retreat — V.I.",
    category: "Rooftop",
    location: "Victoria Island, Lagos",
    area: "680 sqm",
    duration: "3 months",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    description: "A contemporary rooftop garden with seating areas, raised planters, and ambient lighting.",
    tags: ["Rooftop", "Contemporary", "Lighting"],
    likes: 194,
    views: 1340,
    featured: false,
  },
  {
    id: 3,
    title: "Zen Courtyard — Maitama",
    category: "Residential",
    location: "Maitama, Abuja",
    area: "420 sqm",
    duration: "2 months",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
    description: "A tranquil zen-inspired courtyard featuring Japanese elements, gravel patterns, and bamboo.",
    tags: ["Residential", "Zen", "Bamboo"],
    likes: 312,
    views: 2100,
    featured: true,
  },
  {
    id: 4,
    title: "Corporate Park — Eti-Osa",
    category: "Commercial",
    location: "Eti-Osa, Lagos",
    area: "5,200 sqm",
    duration: "12 months",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    description: "A large-scale commercial landscape for a corporate headquarters with outdoor meeting spaces.",
    tags: ["Commercial", "Corporate", "Large Scale"],
    likes: 176,
    views: 980,
    featured: false,
  },
  {
    id: 5,
    title: "Heritage Garden — GRA Enugu",
    category: "Residential",
    location: "GRA, Enugu",
    area: "800 sqm",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    description: "A heritage-style garden designed to complement a colonial-era residence with tropical blooms.",
    tags: ["Residential", "Heritage", "Floral"],
    likes: 203,
    views: 1450,
    featured: false,
  },
  {
    id: 6,
    title: "The Cascade — Banana Island",
    category: "Estate",
    location: "Banana Island, Lagos",
    area: "3,800 sqm",
    duration: "14 months",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
    description: "An opulent estate garden with multi-level terracing, cascading water walls, and infinity lawn.",
    tags: ["Estate", "Luxury", "Water Wall"],
    likes: 489,
    views: 3240,
    featured: true,
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(project.likes)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-700 hover-float ${
        project.featured ? "sm:col-span-2 sm:row-span-2" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${project.featured ? "h-[350px] sm:h-[450px]" : "h-[240px]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="gold" className="text-xs font-bold px-3 py-1">
              ★ Featured
            </Badge>
          </div>
        )}

        {/* Action buttons (visible on hover) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleLike}
            className={`w-9 h-9 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${
              liked
                ? "bg-red-500/80 border-red-400 text-white"
                : "bg-black/30 border-white/20 text-white hover:bg-red-500/60"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.title}</h3>
          <div className="flex items-center gap-1 text-white/60 text-xs mb-2">
            <MapPin className="h-3 w-3" />
            {project.location}
          </div>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>
          {/* Stats */}
          <div className="flex items-center gap-4 mt-3 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {likeCount}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {project.views.toLocaleString()}
            </span>
            <span>• {project.area}</span>
            <span>• {project.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const headRef = useRef<HTMLDivElement>(null)
  const [headVisible, setHeadVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadVisible(true) },
      { threshold: 0.2 }
    )
    if (headRef.current) observer.observe(headRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        {/* Header */}
        <div
          ref={headRef}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-800 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-5">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Our Portfolio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-foreground leading-tight">
              Featured{" "}
              <span className="text-gold-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              A curated selection of our most celebrated landscape transformations across Nigeria.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-4 transition-all duration-300 flex-shrink-0"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10 animate-fade-in">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
