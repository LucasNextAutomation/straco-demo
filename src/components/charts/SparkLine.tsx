"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface SparkLineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  showArea?: boolean
  className?: string
}

function normalizePoints(
  data: number[],
  width: number,
  height: number,
  padding: number = 2
): { x: number; y: number }[] {
  if (data.length === 0) return []
  if (data.length === 1) {
    return [{ x: padding, y: height / 2 }]
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min === 0 ? 1 : max - min
  const drawWidth = width - padding * 2
  const drawHeight = height - padding * 2

  return data.map((val, i) => ({
    x: padding + (i / (data.length - 1)) * drawWidth,
    y: padding + (1 - (val - min) / range) * drawHeight,
  }))
}

function pointsToPolyline(points: { x: number; y: number }[]): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ")
}

function pointsToAreaPolygon(
  points: { x: number; y: number }[],
  _width: number,
  height: number,
  padding: number = 2
): string {
  if (points.length === 0) return ""
  const polyline = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ")
  const firstX = points[0].x.toFixed(2)
  const lastX = points[points.length - 1].x.toFixed(2)
  const bottom = (height - padding).toFixed(2)
  return `${polyline} ${lastX},${bottom} ${firstX},${bottom}`
}

export default function SparkLine({
  data,
  width = 80,
  height = 32,
  color = "#C8A96E",
  showArea = true,
  className,
}: SparkLineProps) {
  const gradientId = useRef(
    `sparkline-gradient-${Math.random().toString(36).slice(2, 8)}`
  ).current
  const padding = 2
  const points = normalizePoints(data, width, height, padding)
  const polylinePoints = pointsToPolyline(points)
  const areaPoints = pointsToAreaPolygon(points, width, height, padding)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {showArea && areaPoints && (
        <motion.polygon
          points={areaPoints}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {polylinePoints && (
        <motion.polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </svg>
  )
}
