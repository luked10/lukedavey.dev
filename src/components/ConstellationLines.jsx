import { motion } from 'motion/react'
import { starNodes } from '../data/starNodes'

const pct = (s) => parseFloat(s) / 100

// Build a smooth path through all stars, with a slight outward curve per segment.
function buildPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1]
    const p1 = points[i]
    const mx = (p0.x + p1.x) / 2
    const my = (p0.y + p1.y) / 2
    // Push the control point outward (away from screen center) for graceful arcs
    const cx = 0.5
    const cy = 0.5
    const nx = mx - cx
    const ny = my - cy
    const len = Math.hypot(nx, ny) || 1
    const lift = 0.04
    const ctrlX = mx + (nx / len) * lift
    const ctrlY = my + (ny / len) * lift
    d += ` Q ${ctrlX} ${ctrlY} ${p1.x} ${p1.y}`
  }
  return d
}

export default function ConstellationLines() {
  const pts = starNodes.map((s) => ({ x: pct(s.x), y: pct(s.y) }))
  const path = buildPath(pts)

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    >
      <defs>
        <linearGradient id="constLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(240, 201, 138, 0.0)" />
          <stop offset="50%" stopColor="rgba(240, 201, 138, 0.55)" />
          <stop offset="100%" stopColor="rgba(240, 201, 138, 0.0)" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#constLine)"
        strokeWidth="0.0015"
        strokeDasharray="0.004 0.012"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 3.6, delay: 1.2, ease: 'easeOut' }}
        style={{ filter: 'drop-shadow(0 0 1px rgba(240,201,138,0.55))' }}
      />
    </svg>
  )
}
