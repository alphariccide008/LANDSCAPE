import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogSection } from "@/components/blog-section"
import { CTASection } from "@/components/cta-section"
import { Leaf } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page hero — light */}
        <section className="relative py-24 bg-white border-b border-gray-100 overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Insights</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-serif text-gray-900 leading-tight mb-5">
                The Landscape <span className="text-gold-gradient">Journal</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                Expert guides, design inspiration, plant care tips, and industry trends from Nigeria&apos;s leading landscape architects.
              </p>
              <div className="mt-8 h-1 w-20 bg-gold-gradient rounded-full" />
            </div>
          </div>
        </section>

        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
