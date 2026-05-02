import { motion } from 'motion/react'

// 5-point star with soft glow + outer ring
function StarMark() {
  return (
    <span className="relative flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
      {/* Outer ring */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border transition-opacity duration-700"
        style={{ borderColor: 'rgba(240, 201, 138, 0.32)' }}
      />
      {/* Soft amber glow */}
      <span
        aria-hidden="true"
        className="absolute h-12 w-12 rounded-full blur-[10px] opacity-70 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle, rgba(240,201,138,0.65) 0%, rgba(240,201,138,0) 70%)',
        }}
      />
      {/* Star glyph */}
      <svg
        viewBox="0 0 24 24"
        className="relative h-3 w-3 sm:h-3.5 sm:w-3.5"
        aria-hidden="true"
        style={{
          filter:
            'drop-shadow(0 0 4px rgba(255,230,180,0.95)) drop-shadow(0 0 10px rgba(240,201,138,0.7))',
        }}
      >
        <path
          d="M12 1.5l2.7 7.2 7.6.4-5.9 4.8 2 7.4L12 17.3l-6.4 4 2-7.4L1.7 9.1l7.6-.4z"
          fill="#fff3d6"
        />
      </svg>
    </span>
  )
}

export default function FloatingStar({ star, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(star)}
      aria-label={`Open ${star.title}`}
      className="group absolute z-30 flex items-center"
      style={{
        left: star.x,
        top: star.y,
        transform: 'translate(-50%, -50%)',
        minWidth: 44,
        minHeight: 44,
        padding: '8px 10px',
      }}
      initial={{ opacity: 0, scale: 0.6, y: 8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 1.4, delay: star.delay, ease: 'easeOut' },
        scale: { duration: 1.4, delay: star.delay, ease: 'easeOut' },
        y: {
          duration: 7 + (star.delay % 1.5),
          delay: star.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <StarMark />

      {/* Connector line */}
      <span
        aria-hidden="true"
        className="ml-2 h-px w-5 sm:w-6 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to right, rgba(240,201,138,0.55), rgba(240,201,138,0.1))',
          opacity: 0.85,
        }}
      />

      {/* Label block */}
      <span className="ml-2 flex flex-col items-start text-left whitespace-nowrap">
        <span
          className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.32em] transition-colors duration-500"
          style={{
            color: 'rgba(242, 234, 220, 0.88)',
            textShadow: '0 1px 6px rgba(0,0,0,0.7)',
          }}
        >
          {star.title}
        </span>
        <span
          className="mt-0.5 font-serif italic text-[11px] sm:text-[12px] transition-colors duration-500"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: 'rgba(242, 234, 220, 0.55)',
            textShadow: '0 1px 5px rgba(0,0,0,0.6)',
          }}
        >
          {star.subtitle}
        </span>
      </span>
    </motion.button>
  )
}
