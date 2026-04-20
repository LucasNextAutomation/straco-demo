"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  ArrowLeft,
  Send,
  Radar,
  Building2,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"

const SUGGESTED_QUERIES = [
  {
    icon: TrendingUp,
    text: "Which projects are outselling forecast this month?",
    context: "Portfolio",
  },
  {
    icon: Radar,
    text: "Show all Antwerpen deals with distress score > 8",
    context: "Deals",
  },
  {
    icon: FileCheck2,
    text: "Summarize compliance warnings from this week's contracts",
    context: "Contracts",
  },
  {
    icon: Building2,
    text: "Which investment properties have leases expiring in Q3?",
    context: "Portfolio",
  },
  {
    icon: AlertTriangle,
    text: "Flag overdue permit responses from omgevingsloket",
    context: "Deals",
  },
]

interface Message {
  id: string
  role: "user" | "assistant"
  text: string
  citations?: string[]
}

const SEED_CONVERSATION: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Which projects are outselling forecast this month?",
  },
  {
    id: "2",
    role: "assistant",
    text: "Two projects are currently ahead of forecast:\n\n• Mirador (Antwerpen) — 22 units reserved this week versus a 12-unit forecast, +31% over plan. Recommend advancing Phase 2 pricing 3%.\n• Rivus (Deurne) — 91% sold. Final 7 units absorbing faster than base case; consider closing out rather than holding.\n\nOne project needs attention: The Meadow (Zaventem) — velocity down 33% versus 3-month average. Marketing channel audit already queued.",
    citations: ["Mirador sales log (Apr 14)", "Rivus reservation pipeline", "The Meadow velocity report"],
  },
]

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>(SEED_CONVERSATION)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)

  const runQuery = (text: string) => {
    if (!text.trim()) return
    setInput("")
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setThinking(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text:
            "This is a preview of the Straco Co-Pilot. In production, queries route through a grounded retrieval layer over your CRM, deal database, contract archive, and portfolio metrics. Every answer cites the underlying record — no hallucinations.",
          citations: ["Portfolio data (live)", "Deal sources (8 active)", "Compliance archive (2 yrs)"],
        },
      ])
      setThinking(false)
    }, 1500)
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1100px]">
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
              <Sparkles className="w-5 h-5" style={{ color: "#A88A4F" }} />
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Straco Co-Pilot
              </h1>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #C8A96E 0%, #A88A4F 100%)",
                  color: "#1A1A2E",
                }}
              >
                PREVIEW
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Ask anything about your portfolio, deals, or contracts. Every answer cites the source record.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Suggested queries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Suggested questions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((q, i) => {
            const Icon = q.icon
            return (
              <button
                key={i}
                onClick={() => runQuery(q.text)}
                className="text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center gap-2 hover:shadow-sm"
                style={{
                  background: "#ffffff",
                  color: "#4A4A5C",
                  border: "1px solid #e8e5dc",
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "#A88A4F" }} />
                {q.text}
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(200,169,110,0.12)", color: "#A88A4F" }}
                >
                  {q.context}
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Conversation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border rounded-2xl shadow-sm overflow-hidden mb-4"
        style={{ borderColor: "#e8e5dc" }}
      >
        <div className="p-6 space-y-5 min-h-[380px] max-h-[560px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[78%] ${m.role === "user" ? "text-right" : ""}`}>
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)" }}
                      >
                        <Sparkles className="w-2.5 h-2.5" style={{ color: "#C8A96E" }} />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Co-Pilot
                      </span>
                    </div>
                  )}
                  <div
                    className="inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                    style={
                      m.role === "user"
                        ? {
                            background: "#1A1A2E",
                            color: "#E6D4A8",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: "#F5F3EE",
                            color: "#1A1A2E",
                            border: "1px solid #e8e5dc",
                            borderBottomLeftRadius: 4,
                          }
                    }
                  >
                    {m.text}
                  </div>
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.citations.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-medium px-2 py-0.5 rounded inline-flex items-center gap-1"
                          style={{ background: "rgba(47,133,90,0.08)", color: "#1F5D3E" }}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse-dot"
                  style={{ background: "#C8A96E" }}
                />
                <span>Reasoning across deals, contracts, and portfolio data…</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="border-t p-3 flex items-center gap-2" style={{ borderColor: "#f0ede3" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runQuery(input)
            }}
            placeholder="Ask anything about deals, contracts, or portfolio…"
            className="flex-1 px-4 py-2.5 text-sm rounded-lg border focus:outline-none"
            style={{ borderColor: "#e8e5dc", color: "#1A1A2E" }}
          />
          <button
            type="button"
            onClick={() => runQuery(input)}
            disabled={!input.trim() || thinking}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)",
              color: "#E6D4A8",
            }}
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </motion.div>

      <p className="text-[11px] text-center text-slate-400">
        Production deployment: answers grounded in Straco data only. Every response cites source records.
        Sensitive queries (pricing, legal) require human approval before external distribution.
      </p>
    </div>
  )
}
