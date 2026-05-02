import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative z-30 flex h-14 w-14 shrink-0 items-center justify-center">
      <span
        aria-hidden="true"
        className="absolute inset-[7px] rounded-full border transition-all duration-700"
        style={{
          borderColor: active
            ? 'rgba(249, 222, 176, 0.86)'
            : 'rgba(239, 201, 139, 0.46)',
          boxShadow: active
            ? '0 0 0 1px rgba(249,216,159,0.16), 0 0 34px rgba(219,145,68,0.48)'
            : '0 0 22px rgba(190,123,61,0.28)',
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
        className="absolute h-24 w-24 rounded-full blur-[20px]"
        style={{
          background:
            'radial-gradient(circle, rgba(250,226,183,0.7) 0%, rgba(214,139,63,0.24) 38%, rgba(206,133,65,0) 72%)',
        }}
        animate={{
          opacity: active ? [0.84, 1, 0.84] : [0.5, 0.68, 0.5],
          scale: active ? [1, 1.08, 1] : [0.96, 1.04, 0.96],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-11 origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(247,224,185,0.72), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-11 w-px origin-center"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(247,224,185,0.72), transparent)',
          filter: 'blur(0.2px)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-8 origin-center rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(230,174,100,0.46), transparent)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-px w-8 origin-center -rotate-45"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(230,174,100,0.46), transparent)',
        }}
      />
      <svg
        viewBox="0 0 24 24"
        className="relative h-[19px] w-[19px]"
        aria-hidden="true"
        style={{
          filter:
            'drop-shadow(0 0 3px rgba(255,244,220,0.95)) drop-shadow(0 0 11px rgba(226,162,86,0.78))',
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
    ? 'translate(-40px, -50%)'
    : 'translate(calc(-100% + 40px), -50%)'
  const transformOrigin = labelRight ? '40px 50%' : 'calc(100% - 40px) 50%'

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
        className="group absolute flex min-h-14 min-w-14 items-center rounded-full"
        style={{
          top: 0,
          left: 0,
          transform: buttonTransform,
          flexDirection: labelRight ? 'row' : 'row-reverse',
          padding: '10px 12px',
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
              boxShadow: '0 0 20px rgba(5,8,13,0.16)',
            }}
          >
            <span
              className="star-label-title font-serif text-[18px] leading-tight transition-colors duration-500 sm:text-[22px]"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'rgba(242, 226, 201, 0.9)',
                textShadow: '0 1px 10px rgba(0,0,0,0.82)',
                fontWeight: 400,
              }}
            >
              {star.title}
            </span>
            {star.subtitle && (
              <span
                className="star-label-subtitle mt-0.5 font-serif italic text-[13px] transition-colors duration-500 sm:text-[15px]"
                style={{
                  color: 'rgba(226, 198, 158, 0.56)',
                  textShadow: '0 1px 7px rgba(0,0,0,0.82)',
                  letterSpacing: '0.02em',
                }}
              >
                {star.subtitle}
              </span>
            )}
          </span>
        </motion.span>
      </button>
    </motion.div>
  )
}
