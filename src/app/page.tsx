"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Radar,
  Building2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Briefcase,
  Target,
  Trophy,
} from "lucide-react"
import AnimatedCounter from "@/components/AnimatedCounter"
import SparkLine from "@/components/charts/SparkLine"
import BelgianPortfolioMap from "@/components/BelgianPortfolioMap"
import { STRACO_PROJECTS, PORTFOLIO_STATS } from "@/data/projects"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const KPI_CARDS = [
  {
    label: "Portfolio Value",
    value: 317.5,
    prefix: "EUR ",
    suffix: "M",
    decimals: 1,
    delta: "+EUR 42M YoY",
    deltaPositive: true,
    sparkData: [220, 234, 248, 262, 278, 291, 305, 317],
    sparkColor: "#C8A96E",
  },
  {
    label: "Active Projects",
    value: 25,
    prefix: "",
    suffix: "",
    decimals: 0,
    delta: "4 in permit phase",
    deltaPositive: true,
    sparkData: [14, 17, 19, 21, 22, 23, 24, 25],
    sparkColor: "#2F855A",
  },
  {
    label: "Units In Pipeline",
    value: 2000,
    prefix: "",
    suffix: "+",
    decimals: 0,
    delta: "648 units live",
    deltaPositive: true,
    sparkData: [1200, 1380, 1520, 1680, 1780, 1860, 1950, 2000],
    sparkColor: "#B7791F",
  },
  {
    label: "Countries",
    value: 8,
    prefix: "",
    suffix: "",
    decimals: 0,
    delta: "Benelux · UK · FR · DE · PL · RO",
    deltaPositive: true,
    sparkData: [3, 4, 5, 6, 6, 7, 7, 8],
    sparkColor: "#C8A96E",
  },
]

const CAREER_STATS = [
  {
    label: "Years of operation",
    value: "30+",
    detail: "Three-decade track record",
    icon: Briefcase,
  },
  {
    label: "Active projects",
    value: "25",
    detail: "Flanders + Brussels",
    icon: Target,
  },
  {
    label: "Units in pipeline",
    value: "2,000+",
    detail: "300,000+ m\u00B2 developable",
    icon: TrendingUp,
  },
  {
    label: "European footprint",
    value: "8 countries",
    detail: "DWNTWN · Speedwell",
    icon: Trophy,
  },
]

const ACTIVITY = [
  {
    icon: Radar,
    iconColor: "#C8A96E",
    iconBg: "rgba(200,169,110,0.12)",
    text: "8 new off-market signals from omgevingsloket & KBO — 3 scored above 80",
    time: "14m ago",
  },
  {
    icon: CheckCircle2,
    iconColor: "#2F855A",
    iconBg: "rgba(47,133,90,0.10)",
    text: "Compromis for Rivus Apt 4B cleared all Bodemdecreet + VCRO checks",
    time: "1h ago",
  },
  {
    icon: TrendingUp,
    iconColor: "#C8A96E",
    iconBg: "rgba(200,169,110,0.12)",
    text: "Mirador sales velocity +31% vs. forecast — advance Phase 2 pricing recommended",
    time: "3h ago",
  },
  {
    icon: AlertTriangle,
    iconColor: "#B7791F",
    iconBg: "rgba(183,121,31,0.10)",
    text: "The Meadow (Zaventem) velocity dipped 33% — marketing audit queued",
    time: "5h ago",
  },
  {
    icon: FileText,
    iconColor: "#2F855A",
    iconBg: "rgba(47,133,90,0.10)",
    text: "Weekly portfolio brief delivered — 3 highlights, 3 actions",
    time: "8h ago",
  },
]

const QUICK_ACCESS = [
  {
    href: "/deals",
    icon: Radar,
    title: "Off-Market Deal Sourcing",
    description:
      "Omgevingsloket · Staatsblad · KBO · KadasterFinder. Scored opportunities across Flanders + Brussels.",
    accent: "Source earlier",
  },
  {
    href: "/contracts",
    icon: FileCheck2,
    title: "Contract Compliance Screener",
    description:
      "Compromis de vente vs. Bodemdecreet, VCRO, EPC, and price list. Flags every gap before notary.",
    accent: "Close safely",
  },
  {
    href: "/portfolio",
    icon: Building2,
    title: "Portfolio Command Center",
    description:
      "Development + investment properties in one view. Sales velocity, occupancy, weekly AI brief.",
    accent: "See it all",
  },
]

type SortKey = "name" | "city" | "units" | "unitsSold"
type SortDir = "asc" | "desc"

function StatusBadge({ status }: { status: "permitting" | "construction" | "sales" | "delivered" }) {
  const styles = {
    permitting: { bg: "rgba(183,121,31,0.12)", color: "#B7791F", label: "Permitting" },
    construction: { bg: "rgba(200,169,110,0.12)", color: "#A88A4F", label: "Construction" },
    sales: { bg: "rgba(200,169,110,0.18)", color: "#8A6A35", label: "Sales" },
    delivered: { bg: "rgba(47,133,90,0.12)", color: "#2F855A", label: "Delivered" },
  }
  const s = styles[status]
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

function ProgressBar({ sold, total }: { sold: number; total: number }) {
  const pct = total > 0 ? (sold / total) * 100 : 0
  const color = pct >= 95 ? "#2F855A" : pct < 40 ? "#B7791F" : "#C8A96E"
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full" style={{ background: "#e8e5dc" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span
        className="text-sm font-semibold tabular-nums"
        style={{ color: "#1A1A2E", minWidth: 40 }}
      >
        {sold}/{total}
      </span>
    </div>
  )
}

export default function OverviewPage() {
  const [sortKey, setSortKey] = useState<SortKey>("units")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const sortedProjects = [...STRACO_PROJECTS].sort((a, b) => {
    let av: string | number = a[sortKey]
    let bv: string | number = b[sortKey]
    if (typeof av === "string") av = av.toLowerCase()
    if (typeof bv === "string") bv = bv.toLowerCase()
    if (av < bv) return sortDir === "asc" ? -1 : 1
    if (av > bv) return sortDir === "asc" ? 1 : -1
    return 0
  })

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5" style={{ color: "#C8A96E" }} />
    ) : (
      <ChevronDown className="w-3.5 h-3.5" style={{ color: "#C8A96E" }} />
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Personalized Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 rounded-2xl overflow-hidden shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 50%, #0F0F1E 100%)",
          color: "#ffffff",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(200,169,110,0.16)",
                  color: "#E6D4A8",
                  border: "1px solid rgba(200,169,110,0.3)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Prepared for Nick van Meirvenne · Apr 19, 2026
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
              Good afternoon, Nick.
            </h1>
            <p className="text-sm lg:text-base opacity-80 leading-relaxed max-w-2xl mb-6">
              A preview of the operating system NextAutomation would build for
              Straco — an AI layer that sits on top of your existing development
              workflow. Off-market sourcing, contract compliance, and unified
              portfolio intelligence, purpose-built for Flanders and Brussels.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CAREER_STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(200,169,110,0.15)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 mb-2" style={{ color: "#C8A96E" }} />
                    <p className="text-lg font-bold tabular-nums leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[10px] opacity-60 uppercase tracking-wider mt-1 leading-tight">
                      {stat.label}
                    </p>
                    <p className="text-[10px] opacity-75 mt-1 leading-tight">
                      {stat.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center"
            style={{ background: "rgba(200,169,110,0.06)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">
              Today at Straco
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: Radar,
                  text: "3 off-market signals scored >80 overnight",
                  meta: "Antwerpen + Gent corridor",
                  color: "#E6D4A8",
                },
                {
                  icon: CheckCircle2,
                  text: "Rivus Apt 4B compromis cleared compliance",
                  meta: "All VCRO + Bodemdecreet checks passed",
                  color: "#86efac",
                },
                {
                  icon: FileText,
                  text: "Weekly portfolio brief ready to review",
                  meta: "3 highlights · 3 concerns · 3 actions",
                  color: "#fcd34d",
                },
                {
                  icon: AlertTriangle,
                  text: "Nexuss — permit response overdue",
                  meta: "Legal escalation 2026-04-22",
                  color: "#fca5a5",
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-tight">
                        {item.text}
                      </p>
                      <p className="text-[11px] opacity-60 mt-0.5">{item.meta}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Link
              href="/copilot"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg self-start transition-all hover:gap-3"
              style={{
                background: "rgba(200,169,110,0.14)",
                border: "1px solid rgba(200,169,110,0.3)",
                color: "#E6D4A8",
                backdropFilter: "blur(4px)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Ask Co-Pilot anything
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-start justify-between mb-6 flex-wrap gap-4"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Portfolio at a glance
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Live across flagship developments · {PORTFOLIO_STATS.activeProjects} active · Flanders + Brussels
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: "#2F855A",
              boxShadow: "0 0 0 0 #2F855A",
              animation: "pulse-green 2s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes pulse-green {
              0%, 100% { box-shadow: 0 0 0 0 rgba(47,133,90,0.5); }
              50% { box-shadow: 0 0 0 5px rgba(47,133,90,0); }
            }
          `}</style>
          Synced 2 min ago
        </div>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {KPI_CARDS.map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={cardVariants}
            className="bg-white border rounded-xl p-5 shadow-sm flex flex-col gap-3"
            style={{ borderColor: "#e8e5dc" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold tabular-nums leading-none" style={{ color: "#1A1A2E" }}>
                  <AnimatedCounter
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    decimals={kpi.decimals}
                    duration={1400}
                  />
                </p>
              </div>
              <SparkLine
                data={kpi.sparkData}
                width={72}
                height={36}
                color={kpi.sparkColor}
                showArea
              />
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "#2F855A" }}
              />
              <span className="text-xs font-semibold" style={{ color: "#2F855A" }}>
                {kpi.delta}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Two column */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
        {/* Projects table */}
        <motion.div
          className="xl:col-span-3 bg-white rounded-xl shadow-sm overflow-hidden border"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderColor: "#e8e5dc" }}
        >
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "#f0ede3" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
              Flagship Developments
            </h2>
            <span className="text-xs font-medium" style={{ color: "#8B8B9E" }}>
              Live sync · Straco workflow data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#f0ede3" }}>
                  {(
                    [
                      { key: "name", label: "Project" },
                      { key: "city", label: "City" },
                      { key: "units", label: "Units" },
                      { key: "unitsSold", label: "Sold" },
                    ] as { key: SortKey; label: string }[]
                  ).map((col) => (
                    <th
                      key={col.key}
                      className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none whitespace-nowrap"
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    Velocity
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-stone-50 transition-colors"
                    style={{ borderColor: "#f5f2e8" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium whitespace-nowrap" style={{ color: "#1A1A2E" }}>
                          {p.name}
                        </span>
                        <StatusBadge status={p.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {p.city}, {p.region}
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium tabular-nums whitespace-nowrap">
                      {p.units.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <ProgressBar sold={p.unitsSold} total={p.units} />
                    </td>
                    <td className="px-4 py-3">
                      {p.status === "delivered" || p.status === "permitting" ? (
                        <span className="text-xs font-medium" style={{ color: "#8B8B9E" }}>
                          —
                        </span>
                      ) : (
                        <SparkLine
                          data={p.salesVelocity}
                          width={64}
                          height={28}
                          color={
                            p.salesVelocity[p.salesVelocity.length - 1] >=
                            p.salesVelocity[p.salesVelocity.length - 2]
                              ? "#2F855A"
                              : "#C53030"
                          }
                          showArea={false}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t" style={{ borderColor: "#f0ede3" }}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: "#A88A4F" }}
            >
              Open Portfolio Command Center
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Belgian Map */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-4 border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderColor: "#e8e5dc" }}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                  Portfolio Map
                </h2>
                <p className="text-[10px] mt-0.5" style={{ color: "#8B8B9E" }}>
                  Flagship developments · hover for details
                </p>
              </div>
              <span
                className="text-[10px] font-medium uppercase tracking-wide"
                style={{ color: "#8B8B9E" }}
              >
                Flanders · Brussels
              </span>
            </div>
            <BelgianPortfolioMap height={380} />
          </motion.div>

          {/* Activity feed */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 flex-1 border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderColor: "#e8e5dc" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                Agent Activity
              </h2>
              <Bell className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: item.iconBg }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: item.iconColor }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug" style={{ color: "#374151" }}>
                        {item.text}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {item.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#1A1A2E" }}>
          Three Systems for Straco
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACCESS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border"
                style={{ borderColor: "#e8e5dc" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(200,169,110,0.12)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#A88A4F" }} />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: "#2F855A" }}
                  >
                    {item.accent}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 leading-snug" style={{ color: "#1A1A2E" }}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-snug">
                    {item.description}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                  style={{ color: "#A88A4F" }}
                >
                  Open
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
