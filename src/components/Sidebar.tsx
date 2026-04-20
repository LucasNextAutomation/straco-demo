"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Sparkles,
  Radar,
  Building2,
  FileCheck2,
  Bell,
  Menu,
  X,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard, badge: null as string | null },
  { href: "/copilot", label: "AI Co-Pilot", icon: Sparkles, badge: "NEW" },
  { href: "/deals", label: "Deal Sourcing", icon: Radar, badge: "8" },
  { href: "/contracts", label: "Contract Screener", icon: FileCheck2, badge: null },
  { href: "/portfolio", label: "Portfolio Command", icon: Building2, badge: null },
]

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/straco-logo.svg"
            alt="Straco"
            width={36}
            height={36}
            className="flex-shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
          <div
            className="flex flex-col leading-none border-l pl-2.5"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <span
              className="text-[12px] font-semibold tracking-tight"
              style={{ color: "#ffffff" }}
            >
              Operating System
            </span>
            <span
              className="text-[9px] font-medium tracking-wider mt-0.5 uppercase"
              style={{ color: "#8B8B9E" }}
            >
              by NextAutomation
            </span>
          </div>
        </Link>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "8px" }} />

      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                  style={
                    isActive
                      ? {
                          color: "#ffffff",
                          background: "rgba(200,169,110,0.12)",
                          borderLeft: "3px solid #C8A96E",
                          paddingLeft: "9px",
                        }
                      : {
                          color: "#a0a0b0",
                          borderLeft: "3px solid transparent",
                          paddingLeft: "9px",
                        }
                  }
                >
                  <Icon
                    size={17}
                    style={{ color: isActive ? "#C8A96E" : "#8B8B9E", flexShrink: 0 }}
                  />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded tabular-nums"
                      style={
                        badge === "NEW"
                          ? {
                              background: "linear-gradient(135deg, #C8A96E 0%, #A88A4F 100%)",
                              color: "#1A1A2E",
                              letterSpacing: "0.04em",
                            }
                          : {
                              background: "rgba(200,169,110,0.18)",
                              color: "#E6D4A8",
                            }
                      }
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-3 pb-5">
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "16px" }} />

        <div className="flex items-center gap-2 px-3 mb-4">
          <span
            className="animate-pulse-dot inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#2F855A" }}
          />
          <span className="text-xs" style={{ color: "#8B8B9E" }}>
            Last synced 2 min ago
          </span>
        </div>

        <div className="flex items-center justify-between px-3 mb-5">
          <button
            type="button"
            className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{ color: "#8B8B9E" }}
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
              style={{ background: "#C53030", color: "#ffffff" }}
            >
              3
            </span>
          </button>

          <div
            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold flex-shrink-0"
            style={{ background: "#252540", color: "#E6D4A8" }}
            title="Nick van Meirvenne — Real Estate Developer"
          >
            NM
          </div>
        </div>

        <div className="flex items-center gap-2 px-3">
          <span
            className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
            style={{ background: "#C8A96E", opacity: 0.5 }}
          />
          <span className="text-[11px]" style={{ color: "#6B6B80" }}>
            Powered by NextAutomation
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarStyle = {
    width: "260px",
    background: "#0F0F1E",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40"
        style={sidebarStyle}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Tablet sidebar (icon only) */}
      <aside
        className="hidden md:flex lg:hidden flex-col fixed inset-y-0 left-0 z-40"
        style={{ width: "64px", background: "#0F0F1E", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center pt-6 pb-5">
            <Link href="/">
              <Image
                src="/straco-logo.svg"
                alt="Straco"
                width={36}
                height={36}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "8px" }} />

          <nav className="flex-1 flex flex-col items-center px-2 py-2 overflow-y-auto gap-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150"
                  style={
                    isActive
                      ? { background: "rgba(200,169,110,0.15)", color: "#C8A96E" }
                      : { color: "#8B8B9E" }
                  }
                >
                  <Icon size={18} />
                </Link>
              )
            })}
          </nav>

          <div className="flex flex-col items-center pb-5 gap-3">
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.06)" }} />
            <span
              className="animate-pulse-dot inline-block w-2 h-2 rounded-full"
              style={{ background: "#2F855A" }}
            />
            <button type="button" className="relative flex items-center justify-center w-10 h-10 rounded-lg" style={{ color: "#8B8B9E" }}>
              <Bell size={17} />
              <span
                className="absolute top-1.5 right-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold"
                style={{ background: "#C53030", color: "#ffffff" }}
              >
                3
              </span>
            </button>
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold"
              style={{ background: "#252540", color: "#E6D4A8" }}
            >
              NM
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile: hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg"
        style={{ background: "#252540", color: "#E6D4A8" }}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="mobile-sidebar"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 flex flex-col"
              style={sidebarStyle}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ color: "#8B8B9E" }}
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>

              <SidebarContent pathname={pathname} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
