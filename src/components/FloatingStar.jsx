import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center">
      <span
        aria-hidden="true"
        className="absolute inset-[5px] rounded-full border transition-all duration-700"
        style={{
          borderColor: active
            ? 'rgba(249, 216, 159, 0.78)'
            : 'rgba(232, 194, 132, 0.32)',
          boxShadow: active
            ? '0 0 0 1px rgba(249,216,159,0.12), 0 0 28px rgba(211,137,62,0.38)'
            : '0 0 16px rgba(181,118,58,0.18)',
        }}
      />
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: 'rgba(249, 216, 159, 0.18)',
            transform: 'scale(1.24)',
          }}
        />
      )}
      <motion.span
        aria-hidden="true"
        className="absolute h-16 w-16 rounded-full blur-[16px]"
        style={{
          background:
            'radial-gradient(circle, rgba(247,216,166,0.66) 0%, rgba(206,133,65,0.18) 38%, rgba(206,133,65,0) 72%)',
        }}
        animate={{
          opacity: active ? [0.78, 1, 0.78] : [0.42, 0.58, 0.42],
          scale: active ? [1, 1.08, 1] : [0.96, 1.04, 0.96],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-8 origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(244,218,174,0.5), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-8 w-px origin-center"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(244,218,174,0.5), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-6 origin-center rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(229,176,104,0.36), transparent)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-6 origin-center -rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(229,176,104,0.36), transparent)',
        }}
      />
      <svg
        viewBox="0 0 24 24"
        className="relative h-[15px] w-[15px]"
        aria-hidden="true"
        style={{
          filter:
            'drop-shadow(0 0 2px rgba(255,241,210,0.88)) drop-shadow(0 0 8px rgba(222,160,86,0.66))',
        }}
      >
        <path
          d="M12 1.7 14.65 8.55 22 8.95 16.3 13.6 18.2 20.7 12 16.75 5.8 20.7 7.7 13.6 2 8.95 9.35 8.55 12 1.7Z"
          fill="#f9dfae"
        />
      </svg>
    </span>
  )
}

export default function FloatingStar({
  star,
  onSelect,
  side = 'right',
  activeStarId,
  isHidden = false,
  isTransitioning = false,
}) {
  const labelRight = side === 'right'
  const isActive = activeStarId === star.id

  return (
    <motion.button
      type="button"
      onClick={(event) => onSelect(star, event)}
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
        opacity: isHidden ? 0 : 1,
        scale: isTransitioning && isActive ? [1, 1.2, 1.04] : 1,
      }}
      transition={{
        opacity: {
          duration: isHidden ? 0.4 : 1.6,
          delay: isHidden ? 0.15 : star.delay,
          ease: 'easeOut',
        },
        scale: {
          duration: isTransitioning && isActive ? 0.16 : 1.6,
          delay: isTransitioning && isActive ? 0 : star.delay,
          ease: 'easeOut',
        },
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <StarMark active={isActive} />

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
            color: 'rgba(242, 226, 201, 0.88)',
            textShadow: '0 1px 10px rgba(0,0,0,0.75)',
            fontWeight: 400,
          }}
        >
          {star.title}
        </span>
        <span
          className="mt-0.5 font-serif italic text-[12px] transition-colors duration-500 sm:text-[14px]"
          style={{
            color: 'rgba(226, 198, 158, 0.5)',
            textShadow: '0 1px 7px rgba(0,0,0,0.78)',
            letterSpacing: '0.02em',
          }}
        >
          {star.subtitle}
        </span>
      </span>
    </motion.button>
  )
}
