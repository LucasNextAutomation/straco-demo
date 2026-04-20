import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import ClientHydration from "@/components/ClientHydration"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Straco — AI Operating System | NextAutomation",
  description:
    "AI-powered operating system for Straco. Off-market deal sourcing, contract compliance screening, and portfolio intelligence — purpose-built for flagship developments in Flanders and Brussels.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen`}
        style={{ background: "#0F0F1E" }}
      >
        <ClientHydration />
        <div className="flex min-h-screen">
          <Sidebar />

          {/* Desktop: offset by sidebar width */}
          <main
            className="flex-1 min-h-screen
              lg:ml-[260px]
              md:ml-[64px]
              ml-0"
            style={{ background: "#F5F3EE" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
