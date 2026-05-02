import { motion } from 'motion/react'

const tracePaths = [
  {
    d: 'M 25 17 C 34 19 41 25 47 33',
    dash: '2 7',
    width: 0.72,
    opacity: 0.5,
  },
  {
    d: 'M 14 43 C 24 39 35 39 45 44',
    dash: '1.6 6.6',
    width: 0.66,
    opacity: 0.46,
  },
  {
    d: 'M 18 62 C 28 58 38 55 48 54',
    dash: '2 7',
    width: 0.7,
    opacity: 0.46,
  },
  {
    d: 'M 38 83 C 43 77 49 69 53 60',
    dash: '2.2 9',
    width: 0.58,
    opacity: 0.38,
  },
  {
    d: 'M 84 44 C 76 42 67 41 59 44',
    dash: '2 7',
    width: 0.72,
    opacity: 0.5,
  },
  {
    d: 'M 80 73 C 72 67 64 62 56 57',
    dash: '2 8',
    width: 0.62,
    opacity: 0.4,
  },
]

export default function ConstellationLines({ isHidden = false }) {
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
        <linearGradient id="orbitalLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(239, 203, 149, 0)" />
          <stop offset="32%" stopColor="rgba(248, 223, 184, 0.58)" />
          <stop offset="64%" stopColor="rgba(217, 144, 70, 0.34)" />
          <stop offset="100%" stopColor="rgba(239, 203, 149, 0)" />
        </linearGradient>
      </defs>

      {tracePaths.map((path, index) => (
        <g key={path.d}>
          <motion.path
            d={path.d}
            fill="none"
            stroke="rgba(238, 195, 129, 0.16)"
            strokeWidth={path.width + 0.8}
            strokeDasharray={path.dash}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: path.opacity }}
            transition={{
              duration: 3.4,
              delay: 0.45 + index * 0.16,
              ease: 'easeOut',
            }}
            style={{ filter: 'blur(1.4px)' }}
          />
          <motion.path
            d={path.d}
            fill="none"
            stroke="url(#orbitalLine)"
            strokeWidth={path.width}
            strokeDasharray={path.dash}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: Math.min(path.opacity + 0.18, 0.72) }}
            transition={{
              duration: 3.4,
              delay: 0.45 + index * 0.16,
              ease: 'easeOut',
            }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(210,138,64,0.24))' }}
          />
        </g>
      ))}
    </motion.svg>
  )
}
