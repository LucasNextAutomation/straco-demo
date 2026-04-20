"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { STRACO_PROJECTS, type StracoProject } from "@/data/projects"

interface Props {
  height?: number
}

// Belgium bounding box
const LAT_MIN = 49.4
const LAT_MAX = 51.6
const LNG_MIN = 2.5
const LNG_MAX = 6.4

function projectToSvg(lat: number, lng: number, width: number, height: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * width
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * height
  return { x, y }
}

const STATUS_COLOR: Record<StracoProject["status"], string> = {
  permitting: "#B7791F",
  construction: "#C8A96E",
  sales: "#C8A96E",
  delivered: "#2F855A",
}

export default function BelgianPortfolioMap({ height = 380 }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const width = 640

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 100%)",
        height,
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.7,
        }}
        className="animate-grid-drift"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        style={{ display: "block", position: "relative", zIndex: 1 }}
      >
        {/* Stylized Belgium outline — approximate bounding contours */}
        <g opacity={0.45}>
          <path
            d={(() => {
              // Hand-drawn abstract Belgium silhouette.
              const points = [
                [2.55, 51.08], [2.94, 51.30], [3.37, 51.38], [4.22, 51.45], [4.75, 51.50],
                [5.08, 51.47], [5.78, 51.24], [6.05, 50.95], [6.36, 50.75], [6.21, 50.55],
                [6.11, 50.31], [5.78, 50.15], [5.63, 49.89], [5.27, 49.70], [4.86, 49.79],
                [4.20, 49.96], [3.67, 50.31], [3.25, 50.54], [2.85, 50.71], [2.59, 50.85],
              ]
              return points
                .map(([lng, lat], i) => {
                  const { x, y } = projectToSvg(lat, lng, width, height)
                  return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
                })
                .join(" ") + " Z"
            })()}
            fill="rgba(200,169,110,0.05)"
            stroke="rgba(200,169,110,0.35)"
            strokeWidth={1.5}
          />
        </g>

        {/* Region labels */}
        {[
          { label: "Antwerpen", lng: 4.40, lat: 51.22 },
          { label: "Brussels", lng: 4.36, lat: 50.85 },
          { label: "Gent", lng: 3.72, lat: 51.05 },
        ].map((r) => {
          const { x, y } = projectToSvg(r.lat, r.lng, width, height)
          return (
            <text
              key={r.label}
              x={x + 10}
              y={y + 4}
              fill="rgba(230,212,168,0.35)"
              fontSize={10}
              fontWeight={500}
              style={{ fontFamily: "Inter, system-ui" }}
            >
              {r.label}
            </text>
          )
        })}

        {/* Project pins */}
        {STRACO_PROJECTS.map((p, i) => {
          const { x, y } = projectToSvg(p.lat, p.lng, width, height)
          const color = STATUS_COLOR[p.status]
          const isHovered = hovered === p.id
          return (
            <g
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer ring pulse */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 18 : 12}
                fill={color}
                fillOpacity={0.18}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              />
              {/* Core dot */}
              <motion.circle
                cx={x}
                cy={y}
                r={5}
                fill={color}
                stroke="#0F0F1E"
                strokeWidth={2}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.35 }}
              />
              {/* Hover label */}
              {isHovered && (
                <g>
                  <rect
                    x={x + 10}
                    y={y - 26}
                    width={140}
                    height={36}
                    rx={6}
                    fill="#1A1A2E"
                    stroke="#C8A96E"
                    strokeOpacity={0.5}
                    strokeWidth={1}
                  />
                  <text
                    x={x + 18}
                    y={y - 12}
                    fill="#E6D4A8"
                    fontSize={11}
                    fontWeight={600}
                  >
                    {p.name}
                  </text>
                  <text
                    x={x + 18}
                    y={y + 2}
                    fill="#a0a0b0"
                    fontSize={9}
                    fontWeight={500}
                  >
                    {p.city} · {p.units} units
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          display: "flex",
          gap: 14,
          background: "rgba(15,15,30,0.85)",
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(200,169,110,0.2)",
          zIndex: 2,
        }}
      >
        {[
          { label: "Permitting", color: STATUS_COLOR.permitting },
          { label: "Construction / Sales", color: STATUS_COLOR.sales },
          { label: "Delivered", color: STATUS_COLOR.delivered },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 10, color: "#a0a0b0", fontWeight: 500 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Asset count badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "rgba(200,169,110,0.12)",
          border: "1px solid rgba(200,169,110,0.35)",
          padding: "4px 10px",
          borderRadius: 16,
          fontSize: 11,
          fontWeight: 600,
          color: "#E6D4A8",
          letterSpacing: "0.02em",
        }}
      >
        {STRACO_PROJECTS.length} flagship developments
      </div>
    </div>
  )
}
