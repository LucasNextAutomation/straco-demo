"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  duration?: number
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration = 1400,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const startedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(eased * value)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
      }
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString()

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
