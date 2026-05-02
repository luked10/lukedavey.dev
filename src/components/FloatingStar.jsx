import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative flex h-11 w-11 items-center justify-center">
      {/* Outer thin ring */}
      <span
        aria-hidden="true"
        className="absolute inset-1 rounded-full border transition-all duration-700"
        style={{
          borderColor: active
            ? 'rgba(255, 222, 170, 0.82)'
            : 'rgba(255, 222, 170, 0.48)',
          boxShadow: active
            ? '0 0 0 1px rgba(255,222,170,0.12), 0 0 32px rgba(240,178,91,0.42)'
            : '0 0 22px rgba(240,178,91,0.22)',
        }}
      />
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: 'rgba(255, 222, 170, 0.22)',
            transform: 'scale(1.34)',
          }}
        />
      )}
      {/* Soft amber glow */}
      <span
        aria-hidden="true"
        className="absolute h-20 w-20 rounded-full blur-[18px] opacity-90"
        style={{
          background:
            'radial-gradient(circle, rgba(255,232,184,0.9) 0%, rgba(240,172,83,0.3) 34%, rgba(240,201,138,0) 72%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-10 origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,238,204,0.82), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-10 w-px origin-center"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(255,238,204,0.82), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-7 origin-center rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,216,158,0.58), transparent)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-7 origin-center -rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,216,158,0.58), transparent)',
        }}
      />
      {/* Five-point star, not a dot */}
      <svg
        viewBox="0 0 24 24"
        className="relative h-[19px] w-[19px]"
        aria-hidden="true"
        style={{
          filter:
            'drop-shadow(0 0 3px rgba(255,250,230,1)) drop-shadow(0 0 10px rgba(255,218,150,0.95)) drop-shadow(0 0 20px rgba(240,170,85,0.9))',
        }}
      >
        <path
          d="M12 1.7 14.65 8.55 22 8.95 16.3 13.6 18.2 20.7 12 16.75 5.8 20.7 7.7 13.6 2 8.95 9.35 8.55 12 1.7Z"
          fill="#fff9e8"
        />
      </svg>
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
      className="group floating-star absolute z-30 flex items-center"
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
          className="font-serif text-[16px] leading-tight transition-colors duration-500 sm:text-[19px]"
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
          className="mt-0.5 font-serif italic text-[12px] transition-colors duration-500 sm:text-[14px]"
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
