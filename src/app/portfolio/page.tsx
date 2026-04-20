"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Building2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MapPin,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Calendar,
  Percent,
} from "lucide-react"
import AnimatedCounter from "@/components/AnimatedCounter"
import SparkLine from "@/components/charts/SparkLine"
import ProgressRing from "@/components/charts/ProgressRing"
import BelgianPortfolioMap from "@/components/BelgianPortfolioMap"
import {
  STRACO_PROJECTS,
  PORTFOLIO_STATS,
  WEEKLY_BRIEF,
  type ProjectStatus,
  type StracoProject,
} from "@/data/projects"

const STATUS_COLUMNS: { key: ProjectStatus; label: string; accent: string; description: string }[] = [
  {
    key: "permitting",
    label: "Permitting",
    accent: "#B7791F",
    description: "Awaiting omgevingsloket",
  },
  {
    key: "construction",
    label: "Construction",
    accent: "#A88A4F",
    description: "On-site build",
  },
  {
    key: "sales",
    label: "Sales",
    accent: "#8A6A35",
    description: "Active commercialization",
  },
  {
    key: "delivered",
    label: "Delivered",
    accent: "#2F855A",
    description: "Investment + occupancy",
  },
]

function ProjectCard({ p }: { p: StracoProject }) {
  const pct = p.units > 0 ? (p.unitsSold / p.units) * 100 : 0
  const lastTwo = p.salesVelocity.slice(-2)
  const velocityTrendUp = lastTwo.length === 2 ? lastTwo[1] >= lastTwo[0] : null

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer transition-shadow hover:shadow-md"
      style={{ borderColor: "#e8e5dc" }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-sm font-bold leading-tight" style={{ color: "#1A1A2E" }}>
            {p.name}
          </p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            {p.city}, {p.region}
          </p>
        </div>
        <span
          className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ background: "rgba(200,169,110,0.12)", color: "#A88A4F" }}
        >
          {p.assetClass}
        </span>
      </div>

      <div className="flex items-center gap-3 my-3">
        <ProgressRing
          value={p.status === "permitting" ? 0 : pct}
          size={48}
          strokeWidth={5}
          color={p.status === "delivered" ? "#2F855A" : "#C8A96E"}
          label={p.status === "permitting" ? "—" : `${Math.round(pct)}%`}
          animate
        />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            {p.status === "delivered" ? "Occupancy" : "Units sold"}
          </p>
          <p className="text-lg font-bold tabular-nums leading-none mt-0.5" style={{ color: "#1A1A2E" }}>
            {p.status === "delivered" && p.occupancy
              ? `${p.occupancy}%`
              : `${p.unitsSold}/${p.units}`}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">{p.expectedDelivery}</p>
        </div>
      </div>

      <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: "#f5f2e8" }}>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "#4A4A5C" }}
        >
          EUR {(p.totalValue / 1_000_000).toFixed(1)}M
        </span>
        {p.status === "sales" || p.status === "construction" ? (
          <div className="flex items-center gap-1">
            {velocityTrendUp ? (
              <TrendingUp className="w-3 h-3" style={{ color: "#2F855A" }} />
            ) : (
              <TrendingDown className="w-3 h-3" style={{ color: "#C53030" }} />
            )}
            <SparkLine
              data={p.salesVelocity}
              width={48}
              height={18}
              color={velocityTrendUp ? "#2F855A" : "#C53030"}
              showArea={false}
            />
          </div>
        ) : (
          <span className="text-[10px] text-slate-400">—</span>
        )}
      </div>
    </motion.div>
  )
}

export default function PortfolioPage() {
  const [view, setView] = useState<"kanban" | "map">("kanban")

  const byStatus = STATUS_COLUMNS.map((col) => ({
    ...col,
    projects: STRACO_PROJECTS.filter((p) => p.status === col.key),
  }))

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
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
              <Building2 className="w-5 h-5" style={{ color: "#A88A4F" }} />
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Portfolio Command Center
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Flagship developments + investment properties, one view. Status, velocity, occupancy.
            </p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg border" style={{ borderColor: "#e8e5dc", background: "#ffffff" }}>
            {[
              { v: "kanban", label: "Kanban" },
              { v: "map", label: "Map" },
            ].map((t) => (
              <button
                key={t.v}
                onClick={() => setView(t.v as "kanban" | "map")}
                className="text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
                style={
                  view === t.v
                    ? { background: "#1A1A2E", color: "#E6D4A8" }
                    : { color: "#4A4A5C" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        {[
          {
            label: "Active projects",
            value: PORTFOLIO_STATS.activeProjects,
            suffix: "",
            icon: Layers,
            accent: "#A88A4F",
          },
          {
            label: "Pipeline value",
            value: 317.5,
            prefix: "EUR ",
            suffix: "M",
            decimals: 1,
            icon: TrendingUp,
            accent: "#2F855A",
          },
          {
            label: "Avg occupancy",
            value: PORTFOLIO_STATS.avgOccupancy,
            suffix: "%",
            decimals: 1,
            icon: Percent,
            accent: "#C8A96E",
          },
          {
            label: "Total GFA",
            value: PORTFOLIO_STATS.totalGFA,
            suffix: " m²",
            icon: Activity,
            accent: "#B7791F",
          },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-white border rounded-xl p-5 shadow-sm"
              style={{ borderColor: "#e8e5dc" }}
            >
              <Icon className="w-3.5 h-3.5 mb-2" style={{ color: kpi.accent }} />
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                {kpi.label}
              </p>
              <p className="text-2xl font-bold tabular-nums leading-none" style={{ color: "#1A1A2E" }}>
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix || ""}
                  suffix={kpi.suffix || ""}
                  decimals={kpi.decimals || 0}
                />
              </p>
            </div>
          )
        })}
      </motion.div>

      {/* Weekly AI brief */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-2xl overflow-hidden shadow-sm mb-6"
        style={{
          background: "linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 45%, #0F0F1E 100%)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-2 p-6 lg:p-7 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(200,169,110,0.18)",
                  color: "#E6D4A8",
                  border: "1px solid rgba(200,169,110,0.35)",
                }}
              >
                <Sparkles className="w-2.5 h-2.5" />
                Weekly Portfolio Brief
              </span>
              <span className="text-[10px] text-slate-400">
                <Calendar className="inline w-3 h-3 mr-1" />
                Generated {WEEKLY_BRIEF.generatedAt.split("T")[0]}
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-4 max-w-3xl">
              {WEEKLY_BRIEF.headline}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2">
                  Highlights
                </p>
                <ul className="space-y-2">
                  {WEEKLY_BRIEF.positives.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs opacity-90 leading-snug">
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: "#86efac" }}
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2">
                  Action Required
                </p>
                <ul className="space-y-2">
                  {WEEKLY_BRIEF.concerns.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs opacity-90 leading-snug">
                      <AlertTriangle
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: "#fcd34d" }}
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-7 flex flex-col" style={{ background: "rgba(200,169,110,0.06)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white opacity-60 mb-3">
              Market signals
            </p>
            <div className="space-y-3 flex-1">
              {WEEKLY_BRIEF.signals.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(200,169,110,0.18)",
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider opacity-60 text-white">
                    {s.label}
                  </p>
                  <p className="text-lg font-bold text-white tabular-nums mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md self-start transition-all hover:gap-2"
              style={{
                background: "rgba(200,169,110,0.16)",
                border: "1px solid rgba(200,169,110,0.32)",
                color: "#E6D4A8",
              }}
            >
              <FileText className="w-3 h-3" />
              Open full brief
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Kanban or Map */}
      {view === "kanban" ? (
        <motion.div
          key="kanban"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {byStatus.map((col, colIdx) => (
            <div
              key={col.key}
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "#EEEAE0", border: "1px solid #e8e5dc" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: col.accent }}
                  />
                  <p className="text-sm font-bold" style={{ color: "#1A1A2E" }}>
                    {col.label}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums"
                  style={{ background: "#ffffff", color: col.accent, border: `1px solid ${col.accent}33` }}
                >
                  {col.projects.length}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#8B8B9E" }}>
                {col.description}
              </p>
              <div className="flex flex-col gap-3">
                {col.projects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: colIdx * 0.05 + i * 0.04 }}
                  >
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
                {col.projects.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic text-center py-3">
                    No projects in this phase.
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border rounded-xl shadow-sm p-4"
          style={{ borderColor: "#e8e5dc" }}
        >
          <BelgianPortfolioMap height={560} />
        </motion.div>
      )}
    </div>
  )
}
