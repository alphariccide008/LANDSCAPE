"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Pencil, Shovel, Leaf, CheckCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We begin with a thorough on-site consultation to understand your vision, lifestyle, budget, and the unique characteristics of your space.",
    duration: "1–2 days",
    deliverable: "Site analysis report",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Concept Design",
    description:
      "Our designers develop a bespoke concept with mood boards, plant palettes, and hand-drawn sketches that capture your vision.",
    duration: "5–10 days",
    deliverable: "Concept presentation",
  },
  {
    number: "03",
    icon: Leaf,
    title: "3D Visualization",
    description:
      "We create photorealistic 3D renders so you can walk through your future landscape before a single shovel breaks ground.",
    duration: "7–14 days",
    deliverable: "3D renders & walkthrough",
  },
  {
    number: "04",
    icon: Shovel,
    title: "Construction",
    description:
      "Our certified installation teams bring the design to life with precision, using premium materials sourced locally and internationally.",
    duration: "Varies by scope",
    deliverable: "Completed landscape",
  },
  {
    number: "05",
    icon: CheckCheck,
    title: "Handover & Care",
    description:
      "We walk you through every element of your new landscape, provide a care guide, and offer ongoing maintenance support.",
    duration: "1 day + ongoing",
    deliverable: "Care manual & warranty",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      {/* Background circle decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5" />

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-800 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-5">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              How We Work
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-foreground mb-5">
            Our <span className="text-gold-gradient">Design Process</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A seamless, transparent journey from first meeting to final flourish.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className={`relative group transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Step number bubble */}
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-card border-2 border-primary/30 group-hover:border-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 shadow-lg">
                        <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                      </div>
                      <span className="absolute -top-1 -right-1 text-xs font-black text-primary/60 group-hover:text-primary transition-colors">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors lg:mt-3">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">Timeline:</span>
                      {step.duration}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">You get:</span>
                      {step.deliverable}
                    </div>
                  </div>

                  {/* Connector arrow (between steps on desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-5 -right-2 lg:-right-3 z-10 text-primary/40">
                      →
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
