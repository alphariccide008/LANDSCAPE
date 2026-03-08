import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-3xl" />
        <div className="absolute inset-0 pattern-dots opacity-30" />

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-lg shadow-black/5">
            {/* Gold top bar */}
            <div className="h-1 bg-gold-gradient rounded-full mb-8 -mt-1 -mx-1" />

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-lg mx-auto mb-4">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-black font-serif text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-400 mt-1">Sign in to your Landscape account</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-primary" />
                <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
              </div>

              <Button variant="gold" size="lg" className="w-full rounded-xl">
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
