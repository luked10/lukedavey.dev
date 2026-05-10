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
      aria-labelledby="detail-title"
      className="absolute inset-0 z-30 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,14,0.34) 0%, rgba(5,5,14,0.08) 44%, rgba(5,5,14,0.28) 100%)',
        }}
      />
      <motion.button
        type="button"
        onClick={onBack}
        className="absolute left-6 top-6 z-10 inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-serif text-[15px] sm:left-12 sm:top-8 sm:text-[17px]"
        style={{
          color: 'rgba(245, 237, 222, 0.86)',
          textShadow: '0 1px 10px rgba(0,0,0,0.65)',
        }}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42, ease: 'easeOut' }}
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </motion.button>

      <motion.div
        className="absolute bottom-12 left-6 z-10 max-w-xl sm:bottom-16 sm:left-12"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.34em] sm:text-[11px]"
          style={{ color: 'rgba(240, 201, 138, 0.72)' }}
        >
          {section.subtitle}
        </p>
        <h1
          id="detail-title"
          className="mt-4 font-serif text-[52px] leading-none sm:text-[92px]"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: '#f5edde',
            fontWeight: 400,
            textShadow: '0 2px 28px rgba(0,0,0,0.62)',
          }}
        >
          {section.title}
        </h1>
        <p
          className="mt-5 max-w-md whitespace-pre-wrap text-[15px] leading-relaxed sm:text-[17px]"
          style={{
            color: 'rgba(245, 237, 222, 0.76)',
            textShadow: '0 1px 10px rgba(0,0,0,0.62)',
          }}
        >
          {section.content}
        </p>
      </motion.div>
    </motion.section>
  )
}
