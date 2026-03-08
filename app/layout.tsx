import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Preloader } from "@/components/preloader"
import { ChatWidgetWrapper } from "@/components/chat-widget-wrapper"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Landscape Media Concept — Nigeria's Premier Outdoor Advertising",
  description:
    "Nigeria's leading outdoor advertising company. Premium billboards, LED screens, unipoles, and OOH media across Lagos and all 36 states.",
  keywords: [
    "outdoor advertising Nigeria",
    "billboard Lagos",
    "OOH advertising Nigeria",
    "LED billboard Lagos",
    "unipole advertising",
    "Landscape Media Concept",
  ],
  openGraph: {
    title: "Landscape Media Concept — Premium OOH Advertising",
    description: "Connecting brands to millions across Nigeria's outdoor landscape.",
    type: "website",
    locale: "en_NG",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Preloader />
          {children}
          <ChatWidgetWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
