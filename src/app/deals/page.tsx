"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Radar,
  Search,
  MapPin,
  Building,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react"
import AnimatedCounter from "@/components/AnimatedCounter"
import SparkLine from "@/components/charts/SparkLine"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"

const eur = (n: number | null) =>
  n === null || n === 0
    ? "—"
    : n >= 1_000_000
    ? `EUR ${(n / 1_000_000).toFixed(2)}M`
    : `EUR ${n.toLocaleString("fr-BE")}`

const SOURCE_LIBRARY = [
  {
    name: "Omgevingsloket (Flanders)",
    description: "Environmental + building permit portal — tracks every new filing across Flemish municipalities.",
    status: "Active",
    lastScan: "8 min ago",
    signals: 14,
  },
  {
    name: "Belgisch Staatsblad",
    description: "Official gazette — liquidations, notarial estate announcements, company status changes.",
    status: "Active",
    lastScan: "12 min ago",
    signals: 6,
  },
  {
    name: "KBO / Banque-Carrefour des Entreprises",
    description: "Company registry — ownership, status (in vereffening), director changes.",
    status: "Active",
    lastScan: "4 min ago",
    signals: 9,
  },
  {
    name: "KadasterFinder (via BIV access)",
    description: "Cadastral records — ownership history, parcel boundaries, last-sale data.",
    status: "Active",
    lastScan: "1h ago",
    signals: 4,
  },
  {
    name: "Regional zoning maps",
    description: "VCRO plans + municipal zoning — rezoning opportunities + conversion potential.",
    status: "Active",
    lastScan: "2h ago",
    signals: 5,
  },
]

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "#C53030" : score >= 7 ? "#B7791F" : "#2F855A"
  const bg =
    score >= 8 ? "rgba(197,48,48,0.10)" : score >= 7 ? "rgba(183,121,31,0.10)" : "rgba(47,133,90,0.10)"
  const label = score >= 8 ? "High distress" : score >= 7 ? "Elevated" : "Moderate"
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: bg, color }}
    >
      <span style={{ fontWeight: 700 }}>{score.toFixed(1)}</span>
      <span style={{ opacity: 0.75 }}>· {label}</span>
    </span>
  )
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const s = {
    new: { label: "New", bg: "rgba(200,169,110,0.15)", color: "#A88A4F" },
    contacted: { label: "Contacted", bg: "rgba(47,133,90,0.12)", color: "#2F855A" },
    underwriting: { label: "Underwriting", bg: "rgba(200,169,110,0.22)", color: "#6F5428" },
    passed: { label: "Passed", bg: "rgba(139,139,158,0.18)", color: "#4A4A5C" },
  }[status]
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

export default function DealsPage() {
  const [selected, setSelected] = useState<Deal | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [scanning, setScanning] = useState(false)

  const visibleDeals = useMemo(() => {
    return mockDeals
      .filter((d) => !d.hidden || scanning === false) // keep it simple — hidden deals stay hidden until scan
      .filter((d) => (filter === "all" ? true : d.status === filter))
      .filter((d) => (regionFilter === "all" ? true : d.county === regionFilter))
      .sort((a, b) => b.distressScore - a.distressScore)
  }, [filter, regionFilter, scanning])

  const runScan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 2600)
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to overview
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Radar className="w-5 h-5" style={{ color: "#A88A4F" }} />
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Off-Market Deal Sourcing
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Belgian public records, scanned nightly. Scored opportunities in Flanders + Brussels before the market sees them.
            </p>
          </div>
          <button
            type="button"
            onClick={runScan}
            disabled={scanning}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:gap-3 disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)",
              color: "#E6D4A8",
              border: "1px solid rgba(200,169,110,0.35)",
            }}
          >
            <Sparkles className={`w-4 h-4 ${scanning ? "animate-pulse" : ""}`} />
            {scanning ? "Scanning Belgian sources…" : "Run new scan"}
          </button>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {[
          {
            label: "Deals Found",
            value: dashboardStats.totalDealsFound,
            suffix: "",
            spark: [18, 22, 25, 28, 30, 32, 35, 38],
            accent: "#C8A96E",
          },
          {
            label: "New this week",
            value: dashboardStats.newThisWeek,
            suffix: "",
            spark: [3, 4, 5, 5, 6, 7, 8, 9],
            accent: "#2F855A",
          },
          {
            label: "High distress (>8.0)",
            value: dashboardStats.highDistress,
            suffix: "",
            spark: [2, 3, 3, 4, 4, 5, 5, 6],
            accent: "#C53030",
          },
          {
            label: "Avg distress score",
            value: dashboardStats.avgDistressScore,
            suffix: "",
            spark: [6.8, 7.0, 7.1, 7.2, 7.3, 7.3, 7.4, 7.4],
            accent: "#B7791F",
            decimals: 1,
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border rounded-xl p-5 shadow-sm flex flex-col gap-3"
            style={{ borderColor: "#e8e5dc" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold tabular-nums leading-none" style={{ color: "#1A1A2E" }}>
                  <AnimatedCounter value={kpi.value} suffix={kpi.suffix} decimals={kpi.decimals || 0} />
                </p>
              </div>
              <SparkLine data={kpi.spark} width={68} height={34} color={kpi.accent} showArea />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Source library */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6"
        style={{ borderColor: "#e8e5dc" }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f0ede3" }}>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
              Legal Data Sources
            </h2>
            <p className="text-[11px] text-slate-500">
              Only Belgian public registries. No scraping of paid databases.
            </p>
          </div>
          {scanning && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded"
              style={{ background: "rgba(200,169,110,0.15)", color: "#A88A4F" }}
            >
              Live scan in progress
            </span>
          )}
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-0">
          {SOURCE_LIBRARY.map((s, i) => (
            <div
              key={s.name}
              className="p-4 relative"
              style={{
                borderRight: i < SOURCE_LIBRARY.length - 1 ? "1px solid #f5f2e8" : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3.5 h-3.5" style={{ color: "#2F855A" }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#2F855A" }}>
                  {s.status}
                </span>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A2E" }}>
                {s.name}
              </p>
              <p className="text-[11px] text-slate-500 leading-snug mb-3">{s.description}</p>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {s.lastScan}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Radar className="w-3 h-3" />
                  {s.signals} signals
                </span>
              </div>
            </div>
          ))}

          {/* Scan sweep overlay */}
          {scanning && (
            <div
              className="absolute inset-y-0 w-12 scan-sweep pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.35), transparent)",
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3 mb-5"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Filter className="inline w-3.5 h-3.5 mr-1" /> Filter
        </span>
        {[
          { v: "all", label: "All" },
          { v: "new", label: "New" },
          { v: "contacted", label: "Contacted" },
          { v: "underwriting", label: "Underwriting" },
        ].map((f) => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
            style={
              filter === f.v
                ? { background: "#1A1A2E", color: "#E6D4A8", border: "1px solid #1A1A2E" }
                : { background: "#ffffff", color: "#4A4A5C", border: "1px solid #e8e5dc" }
            }
          >
            {f.label}
          </button>
        ))}

        <span className="text-xs text-slate-300 mx-1">·</span>

        <div className="relative">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 pr-8 rounded-full cursor-pointer transition-all appearance-none"
            style={{
              background: "#ffffff",
              color: "#4A4A5C",
              border: "1px solid #e8e5dc",
            }}
          >
            <option value="all">All regions</option>
            <option value="Antwerpen">Antwerpen</option>
            <option value="Oost-Vlaanderen">Oost-Vlaanderen</option>
            <option value="Brussels">Brussels</option>
            <option value="Vlaams-Brabant">Vlaams-Brabant</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </motion.div>

      {/* Deals grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {visibleDeals.map((deal, i) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            onClick={() => setSelected(deal)}
            className="bg-white border rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
            style={{ borderColor: "#e8e5dc" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-400">{deal.id}</span>
                  <StatusBadge status={deal.status} />
                </div>
                <h3 className="text-sm font-bold leading-tight mb-0.5" style={{ color: "#1A1A2E" }}>
                  {deal.address}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {deal.city}, {deal.county}
                </p>
              </div>
              <ScoreBadge score={deal.distressScore} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b" style={{ borderColor: "#f5f2e8" }}>
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Est. value</p>
                <p className="text-sm font-bold tabular-nums" style={{ color: "#1A1A2E" }}>
                  {eur(deal.estimatedValue)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Value-add</p>
                <p className="text-sm font-bold tabular-nums" style={{ color: "#2F855A" }}>
                  +{deal.valueAddUpside}%
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Asking</p>
                <p className="text-sm font-semibold tabular-nums text-slate-700">
                  {eur(deal.askingPrice)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Size</p>
                <p className="text-sm font-semibold tabular-nums text-slate-700">
                  {(deal.sqft / 10.764).toFixed(0)} m²
                </p>
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Distress signals
              </p>
              {deal.distressSignals.slice(0, 2).map((sig, k) => (
                <div key={k} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "#B7791F" }} />
                  <span className="leading-snug">{sig}</span>
                </div>
              ))}
              {deal.distressSignals.length > 2 && (
                <p className="text-[10px] text-slate-400 ml-4">
                  +{deal.distressSignals.length - 2} more
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#f5f2e8" }}>
              <div className="flex items-center gap-1 flex-wrap">
                {deal.source.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                    style={{ background: "#f5f2e8", color: "#6F5428" }}
                  >
                    {s.replace("Belgian ", "")}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-slate-400">{deal.dateFound}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Slideout drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(15,15,30,0.65)", backdropFilter: "blur(4px)" }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: 600 }}
              animate={{ x: 0 }}
              exit={{ x: 600 }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[600px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div
                className="p-6 border-b sticky top-0 bg-white z-10"
                style={{ borderColor: "#e8e5dc" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-slate-400">{selected.id}</span>
                      <StatusBadge status={selected.status} />
                      <ScoreBadge score={selected.distressScore} />
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>
                      {selected.address}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {selected.city}, {selected.county} · {selected.state}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-slate-400 hover:text-slate-700 text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Financials */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Financials
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Est. value", value: eur(selected.estimatedValue) },
                      { label: "Asking", value: eur(selected.askingPrice) },
                      { label: "Pro-forma NOI", value: eur(selected.proFormaNOI) },
                      { label: "Pro-forma cap", value: `${selected.proFormaCapRate.toFixed(1)}%` },
                      { label: "IRR (5yr)", value: `${selected.irr5yr.toFixed(1)}%` },
                      { label: "Value-add", value: `+${selected.valueAddUpside}%` },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg p-3"
                        style={{ background: "#F5F3EE", border: "1px solid #e8e5dc" }}
                      >
                        <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">
                          {m.label}
                        </p>
                        <p className="text-sm font-bold tabular-nums" style={{ color: "#1A1A2E" }}>
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distress signals */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Distress & Motivation Signals
                  </p>
                  <div className="space-y-2">
                    {selected.distressSignals.map((sig, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-lg"
                        style={{ background: "rgba(183,121,31,0.05)", border: "1px solid rgba(183,121,31,0.2)" }}
                      >
                        <AlertTriangle
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                          style={{ color: "#B7791F" }}
                        />
                        <span className="text-sm text-slate-700 leading-snug">{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Owner */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Owner Profile
                  </p>
                  <div className="rounded-lg border p-4 space-y-2" style={{ borderColor: "#e8e5dc" }}>
                    <div className="flex items-start gap-2">
                      <Building className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                          {selected.ownerName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {selected.ownerType} · Owned {selected.ownershipYears} years
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 pl-6">{selected.ownerAddress}</p>
                    {selected.phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-600 pl-6">
                        <Phone className="w-3 h-3" /> {selected.phone}
                      </div>
                    )}
                    {selected.email && (
                      <div className="flex items-center gap-2 text-xs text-slate-600 pl-6">
                        <Mail className="w-3 h-3" /> {selected.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Verified Sources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.source.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md"
                        style={{ background: "#F5F3EE", color: "#4A4A5C", border: "1px solid #e8e5dc" }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: "linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)",
                      color: "#E6D4A8",
                    }}
                  >
                    Send to underwriting
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-4 rounded-lg text-sm font-semibold border"
                    style={{ borderColor: "#e8e5dc", color: "#4A4A5C" }}
                  >
                    Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer hint */}
      <div className="mt-8 text-center text-xs text-slate-400">
        <TrendingUp className="inline w-3 h-3 mr-1" />
        All data sourced from Belgian public records. No paid databases. No scraping of restricted sources.
      </div>

      {/* Search bar */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full shadow-lg lg:hidden"
        style={{ background: "#1A1A2E", color: "#E6D4A8", padding: "10px 18px" }}
      >
        <div className="flex items-center gap-2 text-sm">
          <Search className="w-4 h-4" />
          <span>Search deals</span>
        </div>
      </div>
    </div>
  )
}
