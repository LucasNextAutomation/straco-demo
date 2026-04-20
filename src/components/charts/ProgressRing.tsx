"use client"

import { useId } from "react"
import { motion } from "framer-motion"

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  sublabel?: string
  animate?: boolean
  className?: string
}

export default function ProgressRing({
  value,
  size = 80,
  strokeWidth = 8,
  color = "#C8A96E",
  label,
  sublabel,
  animate = true,
  className,
}: ProgressRingProps) {
  const uid = useId().replace(/:/g, "")
  const gradientId = `ring-gradient-${uid}`

  const clampedValue = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const cx = size / 2
  const cy = size / 2

  const targetOffset = circumference * (1 - clampedValue / 100)

  const labelFontSize = size >= 100 ? 22 : size >= 72 ? 18 : 14
  const sublabelFontSize = size >= 100 ? 11 : 9

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
      role="img"
      aria-label={`Progress ring: ${clampedValue}%${sublabel ? ` ${sublabel}` : ""}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)", position: "absolute", top: 0, left: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.75" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#e8e5dc"
          strokeWidth={strokeWidth}
        />

        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={
            animate
              ? { strokeDashoffset: circumference }
              : { strokeDashoffset: targetOffset }
          }
          animate={{ strokeDashoffset: targetOffset }}
          transition={{
            duration: 1.0,
            ease: "easeOut",
            delay: 0.1,
          }}
          style={{ strokeDashoffset: circumference }}
        />
      </svg>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          lineHeight: 1.1,
          userSelect: "none",
        }}
      >
        {label && (
          <span
            style={{
              fontSize: labelFontSize,
              fontWeight: 700,
              color: "#1A1A2E",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            style={{
              fontSize: sublabelFontSize,
              fontWeight: 500,
              color: "#64748b",
              marginTop: 2,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
