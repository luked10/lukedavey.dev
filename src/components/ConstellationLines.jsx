import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { starNodes } from '../data/starNodes'

const pct = (s) => parseFloat(s)

const mobilePositions = {
  about: { x: '18%', y: '34%' },
  journal: { x: '26%', y: '17%' },
  photography: { x: '82%', y: '24%' },
  listening: { x: '82%', y: '43%' },
  today: { x: '73%', y: '58%' },
  archive: { x: '78%', y: '73%' },
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}

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
    const cx = 50
    const cy = 48
    const nx = mx - cx
    const ny = my - cy
    const len = Math.hypot(nx, ny) || 1
    const lift = 8
    const ctrlX = mx + (nx / len) * lift
    const ctrlY = my + (ny / len) * lift
    d += ` Q ${ctrlX} ${ctrlY} ${p1.x} ${p1.y}`
  }
  return d
}

export default function ConstellationLines() {
  const isMobile = useIsMobile()
  const pts = starNodes.map((s) => {
    const position = isMobile ? mobilePositions[s.id] || s : s
    return { x: pct(position.x), y: pct(position.y) }
  })
  const path = buildPath(pts)

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    >
      <defs>
        <linearGradient id="constLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(245, 222, 181, 0.08)" />
          <stop offset="40%" stopColor="rgba(245, 222, 181, 0.58)" />
          <stop offset="68%" stopColor="rgba(240, 183, 105, 0.42)" />
          <stop offset="100%" stopColor="rgba(245, 222, 181, 0.1)" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(255, 229, 185, 0.2)"
        strokeWidth="1.2"
        strokeDasharray="1 7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.72 }}
        transition={{ duration: 3.8, delay: 0.9, ease: 'easeOut' }}
        style={{ filter: 'drop-shadow(0 0 5px rgba(240,201,138,0.38))' }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#constLine)"
        strokeWidth="0.65"
        strokeDasharray="1 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.86 }}
        transition={{ duration: 3.6, delay: 1.1, ease: 'easeOut' }}
        style={{ filter: 'drop-shadow(0 0 3px rgba(240,201,138,0.5))' }}
      />
    </svg>
  )
}
