import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative z-30 flex h-10 w-10 shrink-0 items-center justify-center">
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
  const buttonTransform = labelRight
    ? 'translate(-30px, -50%)'
    : 'translate(calc(-100% + 30px), -50%)'
  const transformOrigin = labelRight ? '30px 50%' : 'calc(100% - 30px) 50%'

  return (
    <motion.div
      data-star-id={star.id}
      className="floating-star absolute z-30"
      aria-hidden={isHidden}
      style={{
        left: star.x,
        top: star.y,
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: isHidden ? 0.4 : 1.6,
          delay: isHidden ? 0.15 : star.delay,
          ease: 'easeOut',
        },
        scale: {
          duration: 1.6,
          delay: star.delay,
          ease: 'easeOut',
        },
      }}
    >
      <button
        type="button"
        disabled={isHidden}
        onClick={(event) => onSelect(star, event)}
        aria-label={`Open ${star.title}`}
        className="group absolute flex min-h-11 min-w-11 items-center rounded-full"
        style={{
          top: 0,
          left: 0,
          transform: buttonTransform,
          flexDirection: labelRight ? 'row' : 'row-reverse',
          padding: '8px 10px',
        }}
      >
        <motion.span
          className="flex items-center"
          style={{
            flexDirection: labelRight ? 'row' : 'row-reverse',
            transformOrigin,
          }}
          animate={{
            scale: isTransitioning && isActive ? [1, 1.18, 1.04] : 1,
          }}
          transition={{
            duration: isTransitioning && isActive ? 0.16 : 0.5,
            ease: 'easeOut',
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <StarMark active={isActive} />

          {/* Label block */}
          <span
            className={`relative z-40 flex flex-col whitespace-nowrap rounded-lg bg-[rgba(5,8,13,0.22)] px-2 py-1 backdrop-blur-[3px] transition-colors duration-500 ${
              labelRight ? 'ml-2 items-start text-left' : 'mr-2 items-end text-right'
            }`}
            style={{
              boxShadow: '0 0 18px rgba(5,8,13,0.12)',
            }}
          >
            <span
              className="star-label-title font-serif text-[16px] leading-tight transition-colors duration-500 sm:text-[19px]"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'rgba(242, 226, 201, 0.9)',
                textShadow: '0 1px 10px rgba(0,0,0,0.82)',
                fontWeight: 400,
              }}
            >
              {star.title}
            </span>
            <span
              className="star-label-subtitle mt-0.5 font-serif italic text-[12px] transition-colors duration-500 sm:text-[14px]"
              style={{
                color: 'rgba(226, 198, 158, 0.56)',
                textShadow: '0 1px 7px rgba(0,0,0,0.82)',
                letterSpacing: '0.02em',
              }}
            >
              {star.subtitle}
            </span>
          </span>
        </motion.span>
      </button>
    </motion.div>
  )
}
