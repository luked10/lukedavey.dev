import { motion } from 'motion/react'

function StarMark({ active = false }) {
  return (
    <span className="relative z-30 flex h-[72px] w-[72px] shrink-0 items-center justify-center sm:h-20 sm:w-20">
      <span
        aria-hidden="true"
        className="absolute inset-[14px] rounded-full border transition-all duration-700"
        style={{
          opacity: active ? 1 : 0.7,
          borderColor: active
            ? 'rgba(249, 222, 176, 0.82)'
            : 'rgba(239, 201, 139, 0.34)',
          boxShadow: active
            ? '0 0 0 1px rgba(249,216,159,0.18)'
            : '0 0 0 1px rgba(190,123,61,0.12)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute h-2.5 w-2.5 rounded-full"
        style={{
          background: active ? '#f9dfae' : 'rgba(249, 223, 174, 0.62)',
          boxShadow: '0 0 10px rgba(255, 233, 198, 0.2)',
        }}
      />
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
    ? 'translate(-52px, -50%)'
    : 'translate(calc(-100% + 52px), -50%)'
  const transformOrigin = labelRight ? '52px 50%' : 'calc(100% - 52px) 50%'

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
        y: isHidden ? 0 : [0, -(star.float || 6), 0],
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
        y: {
          duration: star.floatDuration || 6.8,
          delay: star.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <button
        type='button'
        disabled={isHidden}
        onClick={(event) => onSelect(star, event)}
        aria-label={'Open ' + star.title}
        className='group absolute flex min-h-[72px] min-w-[72px] items-center rounded-full sm:min-h-20 sm:min-w-20'
        style={{
          top: 0,
          left: 0,
          transform: buttonTransform,
          flexDirection: labelRight ? 'row' : 'row-reverse',
          padding: '12px 14px',
        }}
      >
        <motion.span
          className='flex items-center'
          style={{
            flexDirection: labelRight ? 'row' : 'row-reverse',
            transformOrigin,
          }}
          animate={{
            scale: isTransitioning && isActive ? [1, 1.06, 1] : 1,
          }}
          transition={{
            duration: isTransitioning && isActive ? 0.16 : 0.5,
            ease: 'easeOut',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <StarMark active={isActive} />

          <span
            className={
              'relative z-40 flex flex-col whitespace-nowrap rounded-lg bg-[rgba(5,8,13,0.18)] px-2 py-1 backdrop-blur-[2px] transition-colors duration-500 ' +
              (labelRight ? 'ml-2 items-start text-left' : 'mr-2 items-end text-right')
            }
            style={{
              boxShadow: '0 0 12px rgba(5,8,13,0.12)',
            }}
          >
            <span
              className='star-label-title font-serif text-[19px] leading-tight transition-colors duration-500 group-hover:text-[#fff1d2] sm:text-[24px]'
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'rgba(242, 226, 201, 0.94)',
                textShadow: '0 1px 10px rgba(0,0,0,0.82)',
                fontWeight: 400,
              }}
            >
              {star.title}
            </span>
            {star.subtitle && (
              <span
                className='star-label-subtitle mt-0.5 font-serif italic text-[13px] transition-colors duration-500 sm:text-[15px]'
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
