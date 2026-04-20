"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/deals", label: "Deal Sourcing" },
  { href: "/contracts", label: "Contract Screener" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/copilot", label: "Co-Pilot" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(15, 15, 30, 0.90)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Straco brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/straco-logo.svg"
              alt="Straco"
              width={24}
              height={24}
              className="opacity-90 group-hover:opacity-100 transition-opacity"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span
              className="text-sm font-semibold tracking-tight"
              style={{ color: "#E6D4A8" }}
            >
              Straco Operating System
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? "#ffffff" : "#8B8B9E" }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-px"
                      style={{ background: "#C8A96E" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right: Built by badge */}
          <div className="hidden sm:block flex-shrink-0">
            <span className="text-xs font-medium" style={{ color: "#6B6B80" }}>
              Built by NextAutomation
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
