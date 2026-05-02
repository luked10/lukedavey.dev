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

function buildDesktopPaths(pointsById) {
  const p = (id) => pointsById[id]
  return [
    `M ${p('about').x} ${p('about').y} C 11 40 14 27 24 15`,
    `M ${p('journal').x} ${p('journal').y} C 38 8 57 8 76 16`,
    `M ${p('photography').x} ${p('photography').y} C 82 22 84 36 88 47`,
    `M ${p('listening').x} ${p('listening').y} C 84 52 78 59 80 70`,
    `M ${p('today').x} ${p('today').y} C 83 76 88 82 90 88`,
  ]
}

export default function ConstellationLines({ isHidden = false }) {
  const isMobile = useIsMobile()
  const points = starNodes.map((s) => {
    const position = isMobile ? mobilePositions[s.id] || s : s
    return { id: s.id, x: pct(position.x), y: pct(position.y) }
  })
  const pointsById = Object.fromEntries(points.map((point) => [point.id, point]))
  const paths = isMobile ? [buildPath(points)] : buildDesktopPaths(pointsById)

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      animate={{ opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.45, delay: isHidden ? 0.15 : 0, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="constLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(227, 184, 122, 0.05)" />
          <stop offset="40%" stopColor="rgba(236, 199, 145, 0.42)" />
          <stop offset="68%" stopColor="rgba(202, 133, 68, 0.3)" />
          <stop offset="100%" stopColor="rgba(227, 184, 122, 0.06)" />
        </linearGradient>
      </defs>
      {paths.map((path) => (
        <g key={path}>
          <motion.path
            d={path}
            fill="none"
            stroke="rgba(226, 184, 122, 0.2)"
            strokeWidth="0.7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.62 }}
            transition={{ duration: 2.8, delay: 0.7, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 3px rgba(181,118,58,0.28))' }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#constLine)"
            strokeWidth="0.55"
            strokeDasharray="1.2 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.72 }}
            transition={{ duration: 2.6, delay: 0.85, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 2px rgba(202,133,68,0.34))' }}
          />
        </g>
      ))}
    </motion.svg>
  )
}
