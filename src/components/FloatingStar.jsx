import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center">
      {/* Outer thin ring */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border transition-all duration-700"
        style={{
          borderColor: active
            ? 'rgba(240, 201, 138, 0.65)'
            : 'rgba(240, 201, 138, 0.3)',
        }}
      />
      {/* Soft amber glow */}
      <span
        aria-hidden="true"
        className="absolute h-14 w-14 rounded-full blur-[12px] opacity-70 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle, rgba(255,225,170,0.7) 0%, rgba(240,201,138,0) 70%)',
        }}
      />
      {/* Bright luminous core (sparkle dot) */}
      <span
        aria-hidden="true"
        className="relative h-[7px] w-[7px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, #ffffff 0%, #fff3d6 45%, #f0c98a 100%)',
          boxShadow:
            '0 0 6px rgba(255, 240, 210, 1), 0 0 14px rgba(255, 220, 160, 0.85), 0 0 26px rgba(240, 201, 138, 0.55)',
        }}
      />
    </span>
  )
}

export default function FloatingStar({ star, onSelect, side = 'right' }) {
  const labelRight = side === 'right'

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(star)}
      aria-label={`Open ${star.title}`}
      data-star-id={star.id}
      className="group absolute z-30 flex items-center"
      style={{
        left: star.x,
        top: star.y,
        transform: 'translate(-50%, -50%)',
        flexDirection: labelRight ? 'row' : 'row-reverse',
        minWidth: 44,
        minHeight: 44,
        padding: '8px 10px',
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 1.6, delay: star.delay, ease: 'easeOut' },
        scale: { duration: 1.6, delay: star.delay, ease: 'easeOut' },
        y: {
          duration: 7 + (star.delay % 1.5),
          delay: star.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <StarMark active={star.id === 'today'} />

      {/* Label block */}
      <span
        className={`flex flex-col whitespace-nowrap ${
          labelRight ? 'items-start text-left ml-3' : 'items-end text-right mr-3'
        }`}
      >
        <span
          className="font-serif text-[16px] sm:text-[18px] leading-tight transition-colors duration-500"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: 'rgba(245, 237, 222, 0.95)',
            textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            fontWeight: 400,
          }}
        >
          {star.title}
        </span>
        <span
          className="mt-0.5 text-[11px] sm:text-[12px] transition-colors duration-500"
          style={{
            color: 'rgba(245, 237, 222, 0.55)',
            textShadow: '0 1px 5px rgba(0,0,0,0.7)',
            letterSpacing: '0.02em',
          }}
        >
          {star.subtitle}
        </span>
      </span>
    </motion.button>
  )
}
