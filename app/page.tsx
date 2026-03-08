import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ClientShowcase } from "@/components/client-showcase"
import { TopDeals } from "@/components/top-deals"
import { ServicesSection } from "@/components/services-section"
import { BillboardSearch } from "@/components/billboard-search"
import { FindBillboards } from "@/components/find-billboards"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { Testimonials } from "@/components/testimonials"
import { AboutSection } from "@/components/about-section"
import { BlogSection } from "@/components/blog-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* 1. Full-screen brand hero */}
        <Hero />

        {/* 2. Social proof — trusted brands ticker */}
        <ClientShowcase />

        {/* 3. Show what we have — featured billboard listings */}
        <TopDeals />

        {/* 4. Every OOH format we offer */}
        <ServicesSection />

        {/* 5. Search tool */}
        <BillboardSearch />

        {/* 6. Browse by location */}
        <FindBillboards />

        {/* 7. Numbers — scale and credibility */}
        <StatsSection />

        {/* 8. Why choose LMC */}
        <FeaturesSection />

        {/* 9. Client voices */}
        <Testimonials />

        {/* 10. Our story */}
        <AboutSection />

        {/* 11. OOH insights & industry news */}
        <BlogSection />

        {/* 12. Get a quote */}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
