import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { Leaf, Award, Users } from "lucide-react"

const team = [
  {
    name: "Oluwaseun Adeyemi",
    role: "Founder & Principal Landscape Architect",
    bio: "15+ years shaping Nigeria's landscape industry. FNILA certified. Passionate about merging ecology with elegance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Chioma Okafor",
    role: "Head of Design",
    bio: "Award-winning designer with a flair for tropical-contemporary fusion. Masters from UCL Bartlett.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80",
  },
  {
    name: "Ahmed Bello",
    role: "Head of Construction",
    bio: "20 years of on-site mastery. Oversees every installation to ensure flawless execution.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
  {
    name: "Ngozi Eze",
    role: "Client Relations Director",
    bio: "Your point of contact from vision to handover. Dedicated to making every client feel at home.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
  },
]

const awards = [
  { year: "2024", title: "Best Landscape Firm — Lagos Design Week" },
  { year: "2023", title: "NILA Award for Excellence in Estate Design" },
  { year: "2022", title: "Top 10 African Landscape Studios — Archinect" },
  { year: "2021", title: "Green Architecture Award — Nigeria Green Building Council" },
  { year: "2020", title: "Best Commercial Landscape — Property Awards Nigeria" },
]

export default function AboutPage() {
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
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Our Story</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-serif text-gray-900 leading-tight mb-5">
                About <span className="text-gold-gradient">Landscape</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                Born from a deep love of nature and an obsession with design, Landscape has been redefining
                outdoor spaces across Nigeria since 2009.
              </p>
              {/* Gold decorative line */}
              <div className="mt-8 h-1 w-20 bg-gold-gradient rounded-full" />
            </div>
          </div>
        </section>

        <AboutSection />
        <StatsSection />

        {/* Team section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-5">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Our Team</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-serif text-gray-900">
                Meet the <span className="text-gold-gradient">Visionaries</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="group text-center hover-float">
                  <div className="relative w-32 h-32 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-primary transition-colors duration-300 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{member.name}</h3>
                  <div className="text-sm text-primary font-medium mt-1 mb-3">{member.role}</div>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-5">
                <Award className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Recognition</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-serif text-gray-900">
                Awards & <span className="text-gold-gradient">Accolades</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {awards.map((award, i) => (
                <div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-md hover-lift group transition-all duration-300">
                  <div className="text-2xl font-black text-primary flex-shrink-0">{award.year}</div>
                  <div className="w-px h-10 bg-gray-100" />
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-semibold text-gray-700 group-hover:text-primary transition-colors">{award.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
