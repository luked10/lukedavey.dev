import { motion } from 'motion/react'

export default function MemoryTransitionOverlay({ origin }) {
  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute h-[82vmax] w-[82vmax] rounded-full"
        style={{
          left: x,
          top: y,
          background:
            'radial-gradient(circle, rgba(255, 214, 154, 0.9) 0%, rgba(255, 190, 110, 0.68) 18%, rgba(139, 82, 36, 0.25) 42%, rgba(5, 5, 14, 0) 68%)',
          filter: 'blur(10px)',
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center',
        }}
        initial={{ opacity: 0, scale: 0.18 }}
        animate={{ opacity: [0, 1, 0], scale: [0.2, 1.35, 2.8] }}
        transition={{
          duration: 1.15,
          times: [0, 0.42, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(255, 194, 112, 0.34), rgba(5, 5, 14, 0.16) 48%, rgba(5, 5, 14, 0.58) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.15] }}
        transition={{ duration: 1.2, times: [0, 0.48, 1], ease: 'easeOut' }}
      />
    </motion.div>
  )
}
