import { useEffect } from 'react'
import { motion } from 'motion/react'

export default function DetailPage({ section, onBack }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onBack])

  return (
    <motion.section
      aria-labelledby='detail-title'
      className='absolute inset-0 z-30 overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,14,0.42) 0%, rgba(5,5,14,0.08) 44%, rgba(5,5,14,0.34) 100%)',
        }}
      />
      <motion.button
        type='button'
        onClick={onBack}
        className='absolute left-6 top-6 z-10 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[13px] uppercase tracking-[0.28em] sm:left-12 sm:top-8 sm:text-[14px]'
        style={{
          color: 'rgba(245, 237, 222, 0.8)',
          textShadow: '0 1px 10px rgba(0,0,0,0.65)',
          fontFamily: '"Manrope", system-ui, sans-serif',
        }}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42, ease: 'easeOut' }}
      >
        <span aria-hidden='true'>←</span>
        <span>Back</span>
      </motion.button>

      <motion.div
        className='absolute bottom-12 left-6 z-10 max-w-2xl sm:bottom-16 sm:left-12'
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className='text-[10px] uppercase tracking-[0.42em] sm:text-[11px]'
          style={{ color: 'rgba(240, 201, 138, 0.74)', fontFamily: '"Manrope", system-ui, sans-serif' }}
        >
          {section.subtitle}
        </p>
        <h1
          id='detail-title'
          className='mt-4 text-[clamp(4.8rem,10vw,8.4rem)] leading-[0.88] tracking-[-0.06em] text-[#f5edde]'
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 500,
            textShadow: '0 2px 28px rgba(0,0,0,0.62)',
          }}
        >
          {section.title}
        </h1>
        <p
          className='mt-5 max-w-2xl whitespace-pre-wrap text-[16px] leading-8 text-[#f5edde]/78 sm:text-[18px] sm:leading-9'
          style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            textShadow: '0 1px 10px rgba(0,0,0,0.62)',
          }}
        >
          {section.content}
        </p>
      </motion.div>
    </motion.section>
  )
}
