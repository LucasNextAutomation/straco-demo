"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Target, ClipboardCheck, LayoutDashboard, Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/deal-finder", label: "Deal Sourcing", icon: Target },
  { href: "/underwriting", label: "Contract Screener", icon: ClipboardCheck },
  { href: "/outreach", label: "Portfolio", icon: LayoutDashboard },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-7 w-auto text-[#1A1A2E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/straco-logo.svg" alt="Straco" className="h-7 w-auto" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-[#1A1A2E] text-white"
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-gray-400">
              Built by <span className="text-[#C8A96E] font-medium">NextAutomation</span>
            </span>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-400"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-[#1A1A2E] text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-3 mt-2 border-t border-gray-100 px-4 text-xs text-gray-400">
              Built by <span className="text-[#C8A96E] font-medium">NextAutomation</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
