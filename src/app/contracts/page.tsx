"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FileCheck2,
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Scale,
  MapPin,
  Euro,
  Sparkles,
  Download,
  Shield,
  Clock,
  BookOpen,
} from "lucide-react"
import AnimatedCounter from "@/components/AnimatedCounter"

const SAMPLE_CONTRACT = {
  fileName: "Rivus_Deurne_Apt4B_compromis.pdf",
  uploadedAt: "2026-04-19 10:42",
  pages: 14,
  propertyAddress: "Rivus Deurne, Apt 4B",
  buyer: "Van Damme K.",
  seller: "Straco Rivus BV",
  price: 385000,
  priceBreakdown: {
    landShare: 92000,
    buildShare: 293000,
  },
  notary: "Mr. De Smet & Partners, Antwerpen",
  scheduledNotary: "2026-05-22",
}

type CheckStatus = "pass" | "warn" | "fail"

interface ComplianceCheck {
  id: string
  category: string
  rule: string
  reference: string
  status: CheckStatus
  finding: string
  suggestedFix?: string
}

const CHECKS: ComplianceCheck[] = [
  {
    id: "C1",
    category: "Urban Planning",
    rule: "Urban planning information declaration",
    reference: "VCRO Art. 5.2.1 (Flemish Code on Spatial Planning)",
    status: "pass",
    finding:
      "Declaration present, permit numbers match omgevingsloket record (OMV_2023/284). Zoning confirmed: woongebied.",
  },
  {
    id: "C2",
    category: "Soil",
    rule: "Soil certificate attached",
    reference: "Bodemdecreet Art. 101 (Flemish Soil Decree)",
    status: "pass",
    finding: "OVAM soil certificate dated 2024-11-03. No active contamination register entry.",
  },
  {
    id: "C3",
    category: "Soil",
    rule: "Soil risk transfer clause",
    reference: "Bodemdecreet Art. 102 §3",
    status: "warn",
    finding:
      "Clause present but signed copy not attached. Missing witness initials on page 7.",
    suggestedFix: "Request initialed copy from seller notary before signing.",
  },
  {
    id: "C4",
    category: "Energy",
    rule: "EPC (Energy Performance Certificate)",
    reference: "Flemish Energy Decree (Energiedecreet)",
    status: "pass",
    finding:
      "EPC score B (141 kWh/m²·year). Valid until 2033-11-14. Label and certificate number (20241103-0042854-RES) attached.",
  },
  {
    id: "C5",
    category: "Price Integrity",
    rule: "Price matches current project price list",
    reference: "Straco internal price list v2026-04-12",
    status: "pass",
    finding:
      "Contract price EUR 385,000 matches approved price for Apt 4B (Floor 4, 78 m², city view).",
  },
  {
    id: "C6",
    category: "Price Integrity",
    rule: "Land / construction price split",
    reference: "VAT rule 6%/21%",
    status: "warn",
    finding:
      "Land share declared EUR 92,000 (23.9%). Internal memo targets 22% ceiling for this unit. Variance +1.9 pts.",
    suggestedFix:
      "Confirm with accounting whether split aligns with Brussels/Flanders VAT treatment for this tranche.",
  },
  {
    id: "C7",
    category: "Notarial",
    rule: "Suspensive financing clause drafted",
    reference: "Standard compromis template",
    status: "pass",
    finding:
      "Condition: EUR 308,000 loan approval by 2026-05-10. Deadline leaves 12 days before notarial deed.",
  },
  {
    id: "C8",
    category: "Notarial",
    rule: "Penalty / dedit clause",
    reference: "Civil Code Art. 1152",
    status: "fail",
    finding:
      "Standard 10% penalty clause omitted. Draft uses 5% — this is below Straco's internal minimum.",
    suggestedFix:
      "Redline to 10% forfeit. Flag for Nick van Meirvenne's approval if deviation intentional.",
  },
  {
    id: "C9",
    category: "Parties",
    rule: "Buyer identity + co-buyer check",
    reference: "KBO + Rijksregister cross-check",
    status: "pass",
    finding:
      "Buyer ID verified. No company links flagged in KBO. No marriage regime declaration — confirm solo purchase intent.",
  },
  {
    id: "C10",
    category: "Disclosures",
    rule: "Co-ownership regulations (syndic)",
    reference: "Wet op de mede-eigendom",
    status: "pass",
    finding:
      "Base deed + statutes (notary De Smet, 2024-09) attached. Reserve fund balance EUR 8,240 as of 2026-03-31.",
  },
  {
    id: "C11",
    category: "Taxes",
    rule: "Registration duties declared",
    reference: "Flemish registration tax (registratierechten)",
    status: "pass",
    finding:
      "Enhanced reduced rate 2% applied (primary residence). Buyer confirms no other residence owned.",
  },
  {
    id: "C12",
    category: "Delivery",
    rule: "Delivery date + snagging process",
    reference: "Straco standard delivery SLA",
    status: "warn",
    finding:
      "Delivery scheduled 2026-10-15 — 2 weeks later than revised construction plan. Notary deed pinned to original date.",
    suggestedFix:
      "Align notary appointment with revised delivery OR attach delay acknowledgment.",
  },
]

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "pass") return <CheckCircle2 className="w-4 h-4" style={{ color: "#2F855A" }} />
  if (status === "warn") return <AlertTriangle className="w-4 h-4" style={{ color: "#B7791F" }} />
  return <XCircle className="w-4 h-4" style={{ color: "#C53030" }} />
}

function StatusRow({ c }: { c: ComplianceCheck }) {
  const bg =
    c.status === "pass"
      ? "transparent"
      : c.status === "warn"
      ? "rgba(183,121,31,0.04)"
      : "rgba(197,48,48,0.05)"

  return (
    <div
      className="p-4 border-b"
      style={{ borderColor: "#f5f2e8", background: bg }}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <StatusIcon status={c.status} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider mr-2"
                style={{
                  color:
                    c.status === "pass"
                      ? "#2F855A"
                      : c.status === "warn"
                      ? "#B7791F"
                      : "#C53030",
                }}
              >
                {c.category}
              </span>
              <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                {c.rule}
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 font-mono flex-shrink-0">
              {c.id}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2 italic">Ref: {c.reference}</p>
          <p className="text-xs text-slate-700 leading-snug">{c.finding}</p>
          {c.suggestedFix && (
            <div
              className="mt-2 text-xs leading-snug px-3 py-2 rounded-md"
              style={{
                background:
                  c.status === "fail" ? "rgba(197,48,48,0.08)" : "rgba(183,121,31,0.08)",
                color: c.status === "fail" ? "#9B2323" : "#6F4A12",
              }}
            >
              <span className="font-semibold">Suggested fix:</span> {c.suggestedFix}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContractsPage() {
  const [loaded, setLoaded] = useState(true)
  const [dragging, setDragging] = useState(false)

  const passCount = CHECKS.filter((c) => c.status === "pass").length
  const warnCount = CHECKS.filter((c) => c.status === "warn").length
  const failCount = CHECKS.filter((c) => c.status === "fail").length

  const overallStatus =
    failCount > 0 ? "blocker" : warnCount > 0 ? "review" : "ready"

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
              <FileCheck2 className="w-5 h-5" style={{ color: "#A88A4F" }} />
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Contract Compliance Screener
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Every compromis de vente against Belgian legal checklist — Bodemdecreet, VCRO, EPC — and the Straco price list.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLoaded(!loaded)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)",
              color: "#E6D4A8",
              border: "1px solid rgba(200,169,110,0.35)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            New analysis
          </button>
        </div>
      </motion.div>

      {!loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            setLoaded(true)
          }}
          onClick={() => setLoaded(true)}
          className="cursor-pointer bg-white border-2 border-dashed rounded-xl p-16 text-center shadow-sm transition-all"
          style={{
            borderColor: dragging ? "#C8A96E" : "#e8e5dc",
            background: dragging ? "rgba(200,169,110,0.05)" : "#ffffff",
          }}
        >
          <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: "#A88A4F" }} />
          <p className="text-lg font-bold mb-1" style={{ color: "#1A1A2E" }}>
            Drop a compromis de vente here
          </p>
          <p className="text-sm text-slate-500 mb-4">
            PDF, DOCX, or scanned image. Screening runs in under 90 seconds.
          </p>
          <span
            className="inline-block px-5 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "#1A1A2E", color: "#E6D4A8" }}
          >
            Select file
          </span>
        </motion.div>
      )}

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Top: File summary + Verdict */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {/* File summary */}
              <div
                className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5"
                style={{ borderColor: "#e8e5dc" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(200,169,110,0.12)" }}
                  >
                    <FileText className="w-6 h-6" style={{ color: "#A88A4F" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-bold" style={{ color: "#1A1A2E" }}>
                          {SAMPLE_CONTRACT.fileName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Uploaded {SAMPLE_CONTRACT.uploadedAt} · {SAMPLE_CONTRACT.pages} pages
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border"
                        style={{ borderColor: "#e8e5dc", color: "#4A4A5C" }}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export report
                      </button>
                    </div>

                    <div
                      className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t"
                      style={{ borderColor: "#f5f2e8" }}
                    >
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          <MapPin className="inline w-3 h-3 mr-1" /> Property
                        </p>
                        <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                          {SAMPLE_CONTRACT.propertyAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          <Euro className="inline w-3 h-3 mr-1" /> Price
                        </p>
                        <p className="text-sm font-semibold tabular-nums" style={{ color: "#1A1A2E" }}>
                          EUR {SAMPLE_CONTRACT.price.toLocaleString("fr-BE")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          Buyer
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {SAMPLE_CONTRACT.buyer}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          Seller
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {SAMPLE_CONTRACT.seller}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          Notary
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {SAMPLE_CONTRACT.notary}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-0.5">
                          <Clock className="inline w-3 h-3 mr-1" /> Scheduled deed
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {SAMPLE_CONTRACT.scheduledNotary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div
                className="rounded-xl p-5 shadow-sm flex flex-col"
                style={{
                  background:
                    overallStatus === "blocker"
                      ? "linear-gradient(135deg, #C53030 0%, #9B2323 100%)"
                      : overallStatus === "review"
                      ? "linear-gradient(135deg, #B7791F 0%, #8B5A14 100%)"
                      : "linear-gradient(135deg, #2F855A 0%, #1F5D3E 100%)",
                  color: "#ffffff",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">
                  Overall verdict
                </p>
                <p className="text-2xl font-black leading-tight">
                  {overallStatus === "blocker"
                    ? "Blocker found"
                    : overallStatus === "review"
                    ? "Review needed"
                    : "Ready for notary"}
                </p>
                <p className="text-xs opacity-85 mt-1 mb-4">
                  {failCount > 0
                    ? `${failCount} item${failCount > 1 ? "s" : ""} must be resolved before signing.`
                    : warnCount > 0
                    ? `${warnCount} minor item${warnCount > 1 ? "s" : ""} flagged for human review.`
                    : "All checks passed."}
                </p>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5 mx-auto mb-1" />
                    <p className="text-lg font-bold leading-none">
                      <AnimatedCounter value={passCount} />
                    </p>
                    <p className="text-[9px] opacity-80 mt-0.5">Passed</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <AlertTriangle className="w-3.5 h-3.5 mx-auto mb-1" />
                    <p className="text-lg font-bold leading-none">
                      <AnimatedCounter value={warnCount} />
                    </p>
                    <p className="text-[9px] opacity-80 mt-0.5">Warnings</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <XCircle className="w-3.5 h-3.5 mx-auto mb-1" />
                    <p className="text-lg font-bold leading-none">
                      <AnimatedCounter value={failCount} />
                    </p>
                    <p className="text-[9px] opacity-80 mt-0.5">Blockers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extracted fields strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white border rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4 flex-wrap"
              style={{ borderColor: "#e8e5dc" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <BookOpen className="inline w-3 h-3 mr-1" /> Auto-extracted
              </span>
              {[
                { label: "Land share", value: `EUR ${SAMPLE_CONTRACT.priceBreakdown.landShare.toLocaleString("fr-BE")}` },
                { label: "Build share", value: `EUR ${SAMPLE_CONTRACT.priceBreakdown.buildShare.toLocaleString("fr-BE")}` },
                { label: "Financing clause", value: "EUR 308,000 by 2026-05-10" },
                { label: "Forfeit clause", value: "5% (flagged)" },
                { label: "Delivery", value: "2026-10-15" },
              ].map((f) => (
                <div key={f.label} className="text-xs">
                  <span className="text-slate-500">{f.label}: </span>
                  <span className="font-semibold tabular-nums" style={{ color: "#1A1A2E" }}>
                    {f.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Checks grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Checks list */}
              <div
                className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden"
                style={{ borderColor: "#e8e5dc" }}
              >
                <div
                  className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: "#f0ede3" }}
                >
                  <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
                    Compliance Checklist
                  </h2>
                  <span className="text-[10px] font-medium text-slate-400">
                    12 checks · Belgian legal framework
                  </span>
                </div>
                <div>
                  {CHECKS.map((c) => (
                    <StatusRow key={c.id} c={c} />
                  ))}
                </div>
              </div>

              {/* Sidebar: legal references */}
              <div className="flex flex-col gap-5">
                <div
                  className="rounded-xl p-5 text-white"
                  style={{
                    background: "linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 100%)",
                  }}
                >
                  <Scale className="w-5 h-5 mb-2" style={{ color: "#C8A96E" }} />
                  <p className="text-sm font-bold mb-1">Legal framework</p>
                  <p className="text-xs opacity-75 leading-snug mb-3">
                    Every check traces back to the Flemish Spatial Planning Code (VCRO), Soil Decree (Bodemdecreet),
                    the Energy Decree, and Straco internal commercial standards.
                  </p>
                  <div className="space-y-2 text-xs">
                    {[
                      "VCRO — Art. 5.2.1",
                      "Bodemdecreet — Art. 101 / 102",
                      "Energiedecreet — EPC",
                      "Wet op de mede-eigendom",
                      "Flemish registratierechten",
                    ].map((r) => (
                      <div key={r} className="flex items-center gap-2" style={{ color: "#E6D4A8" }}>
                        <Shield className="w-3 h-3" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="bg-white border rounded-xl shadow-sm p-5"
                  style={{ borderColor: "#e8e5dc" }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: "#1A1A2E" }}>
                    What happens next
                  </p>
                  <ol className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: "#C8A96E", color: "#1A1A2E" }}
                      >
                        1
                      </span>
                      Warnings routed to Straco legal desk for manual review.
                    </li>
                    <li className="flex gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: "#C8A96E", color: "#1A1A2E" }}
                      >
                        2
                      </span>
                      Blocker (penalty clause) returned to notary with redline suggestion.
                    </li>
                    <li className="flex gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: "#C8A96E", color: "#1A1A2E" }}
                      >
                        3
                      </span>
                      Notary appointment unlocked only after all blockers cleared.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
