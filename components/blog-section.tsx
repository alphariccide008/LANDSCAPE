"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "Why Lekki-Epe Expressway Is Nigeria's Most Valuable OOH Corridor in 2026",
    excerpt:
      "With over 450,000 daily vehicle movements, the Lekki-Epe Expressway has overtaken Lagos Island as the top outdoor advertising corridor in the country. Here's what the data says.",
    category: "Market Insight",
    author: "LMC Media Team",
    date: "March 1, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "LED vs. Static Billboards: Which Format Delivers Better ROI in Nigeria?",
    excerpt:
      "We analysed 200 campaigns across Lagos and Abuja to compare performance, cost-per-impression, and brand recall between digital LED screens and traditional static billboards.",
    category: "Campaign Strategy",
    author: "LMC Analytics",
    date: "February 22, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "How to Build a Nationwide OOH Campaign on a Mid-Size Budget",
    excerpt:
      "You don't need a Fortune 500 budget to run billboards across Nigeria. Our media planners share the formats, states, and timing strategies that maximise reach for growing brands.",
    category: "Media Planning",
    author: "LMC Planning Desk",
    date: "February 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80",
    featured: false,
  },
]

export function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/4 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-5">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">LMC Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              OOH Intelligence &amp; <span className="text-orange-gradient">Industry News</span>
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-4 transition-all duration-300 flex-shrink-0">
            All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured post */}
          <div className={`lg:col-span-2 group rounded-2xl overflow-hidden bg-card border border-border hover-lift card-shine transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative h-64 sm:h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="gold">{posts[0].category}</Badge>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {posts[0].date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {posts[0].readTime}</span>
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {posts[0].author}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                {posts[0].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{posts[0].excerpt}</p>
              <Link href={`/blog/${posts[0].id}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300">
                Read Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar posts */}
          <div className="space-y-5">
            {posts.slice(1).map((post, i) => (
              <div key={post.id}
                className={`group flex gap-4 rounded-2xl bg-card border border-border p-4 hover-lift card-shine transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="gold" className="text-[10px]">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-2">
                    {post.title}
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </div>
                </div>
              </div>
            ))}

            {/* Newsletter mini CTA */}
            <div className={`rounded-2xl bg-card border border-border p-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "450ms" }}>
              <div className="h-1 bg-orange-gradient rounded-full mb-4 -mt-1 -mx-1" />
              <h4 className="font-bold text-lg text-foreground mb-1">LMC Media Briefing</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Monthly OOH market data, new site alerts, and campaign inspiration.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-9 px-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button className="h-9 px-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-colors flex-shrink-0" style={{ background: "#D4541E" }}>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
