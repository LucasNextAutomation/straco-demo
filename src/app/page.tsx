"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Target, ClipboardCheck, LayoutDashboard, ArrowRight, CheckCircle2 } from "lucide-react"

const BRAND_PRIMARY = "#1A1A2E"
const BRAND_ACCENT = "#C8A96E"

const systems = [
  {
    href: "/deal-finder",
    title: "Off-Market Deal Sourcing",
    icon: Target,
    description: "Belgian cadastral, omgevingsloket, and notarial records scraped daily. AI scores every opportunity against Straco's acquisition criteria — brownfields, old offices, industrial, building plots.",
    highlights: ["Belgian public data sources", "AI acquisition scoring", "KBO/BCE owner enrichment"],
  },
  {
    href: "/underwriting",
    title: "Contract Compliance Screener",
    icon: ClipboardCheck,
    description: "Upload a signed compromis de vente. AI extracts every field, cross-references the price list, and verifies Belgian legal requirements — soil certificate, cooling-off, energy, urban planning.",
    highlights: ["Full-text extraction", "Price-list validation", "Belgian legal compliance checks"],
  },
  {
    href: "/outreach",
    title: "Portfolio Command Center",
    icon: LayoutDashboard,
    description: "25 development projects, 120 investment properties, 2,000+ units in pipeline — all in one dashboard. Sales velocity, construction milestones, weekly AI intelligence.",
    highlights: ["Unified portfolio view", "Weekly AI intelligence", "Role-based dashboards"],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl" style={{ background: `${BRAND_PRIMARY}08` }} />
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: `${BRAND_ACCENT}0A` }} />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-10"
            >
              <div style={{ color: BRAND_PRIMARY }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/straco-logo.svg" alt="Straco Real Estate" className="h-14 md:h-16 w-auto" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm uppercase tracking-[0.24em] font-medium mb-6"
              style={{ color: BRAND_ACCENT }}
            >
              NextAutomation &times; Straco Real Estate
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              Your Real Estate<br />
              Operating System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Three AI-powered systems working together &mdash; source off-market deals from Belgian public records, screen buyer contracts against Belgian law, and track the full Straco portfolio in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Flanders &middot; Brussels
              </span>
              <span>25 active projects</span>
              <span>120+ investment properties</span>
              <span>EU data residency</span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-24 mx-auto border-t border-gray-200" />

      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-14"
          >
            Explore the live demos
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + 0.08 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-[#1A1A2E]/40 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-[#C8A96E]/10 group-hover:border-[#C8A96E]/40 transition-colors">
                      <sys.icon className="w-5 h-5 text-gray-400 group-hover:text-[#1A1A2E] transition-colors" />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">{sys.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96E] flex-shrink-0" />
                          <span className="text-gray-600">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#1A1A2E] group-hover:gap-2.5 transition-all mt-auto">
                      View Demo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Interactive demo — data is simulated for demonstration purposes</p>
          <p className="text-xs text-gray-400">
            Built by <span className="text-[#C8A96E] font-medium">NextAutomation</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
