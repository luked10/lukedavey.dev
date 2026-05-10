import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import GrainOverlay from './GrainOverlay'
import VignetteOverlay from './VignetteOverlay'

export default function SectionPreview({ section, onBack }) {
  const [imageMissing, setImageMissing] = useState(false)
  const isJournal = section.id === 'journal'

  useEffect(() => {
    setImageMissing(false)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [section.background, onBack])

  const containerClass = isJournal
    ? 'relative z-20 flex min-h-screen items-end px-6 pt-24 pb-[13vh] sm:px-10 sm:pb-[14vh] md:px-16 md:pb-[15vh]'
    : 'relative z-20 flex min-h-screen items-end px-6 pt-24 pb-10 sm:px-10 sm:pb-12 md:px-16 md:pb-16'

  return (
    <motion.section
      aria-labelledby='section-preview-title'
      className='absolute inset-0 z-50 min-h-screen overflow-hidden bg-black text-[#f4ead8]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.62, ease: 'easeOut' }}
    >
      {!imageMissing && (
        <motion.img
          src={section.background}
          alt=''
          className='absolute inset-0 z-0 h-full w-full object-cover'
          style={{ filter: 'brightness(1.08) saturate(1.05)' }}
          draggable={false}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onError={() => {
            console.error('Missing background:', section.background)
            setImageMissing(true)
          }}
        />
      )}

      {imageMissing && (
        <div className='absolute inset-0 z-0 flex items-center justify-center bg-[#050509] px-6 text-center'>
          <p className='max-w-md rounded-xl border border-[#f4ead8]/15 bg-black/35 px-5 py-4 font-serif text-lg text-[#f4ead8]/85 backdrop-blur-md'>
            Background image missing: {section.background}
          </p>
        </div>
      )}

      <div aria-hidden='true' className='absolute inset-0 z-10' style={{ background: 'rgba(0, 0, 0, 0.22)' }} />
      {!isJournal && (
        <div
          aria-hidden='true'
          className='absolute inset-0 z-10'
          style={{
            background:
              'radial-gradient(circle at 70% 42%, rgba(244, 181, 98, 0.16) 0%, rgba(244, 181, 98, 0.08) 18%, rgba(244, 181, 98, 0) 42%)',
            mixBlendMode: 'screen',
          }}
        />
      )}
      <VignetteOverlay />
      <GrainOverlay />
      <div
        aria-hidden='true'
        className='absolute inset-0 z-10'
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,14,0.24) 0%, rgba(5,5,14,0.04) 48%, rgba(5,5,14,0.22) 100%)',
        }}
      />

      <button
        type='button'
        onClick={onBack}
        className='absolute right-5 top-5 z-30 min-h-11 rounded-full px-4 text-[0.72rem] uppercase tracking-[0.22em] text-[#f4ead8]/80 transition hover:text-[#f4ead8] sm:right-8 sm:top-8 sm:text-sm'
      >
        Back to home
      </button>

      <div className={containerClass}>
        <motion.div
          className={isJournal ? 'max-w-3xl -translate-x-2 sm:-translate-x-4' : 'max-w-xl'}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={
              isJournal
                ? 'mb-4 text-[11px] uppercase tracking-[0.42em] text-[#f4ead8]/65 sm:text-xs'
                : 'mb-5 text-xs uppercase tracking-[0.28em] text-[#f4ead8]/60 sm:text-sm'
            }
          >
            {section.eyebrow}
          </p>

          <h1
            id='section-preview-title'
            className={
              isJournal
                ? 'font-serif text-[clamp(4.9rem,10vw,8.9rem)] leading-[0.88] tracking-[-0.06em] text-[#f4ead8]'
                : 'font-serif text-6xl leading-none text-[#f4ead8] sm:text-7xl md:text-8xl'
            }
            style={isJournal ? { fontFamily: '"Cormorant Garamond", Georgia, serif' } : undefined}
          >
            {section.title}
          </h1>

          {section.subtitle && (
            <p
              className={
                isJournal
                  ? 'mt-4 max-w-2xl font-sans text-[0.82rem] uppercase tracking-[0.34em] text-[#f4ead8]/72 sm:text-[0.9rem]'
                  : 'mt-3 font-serif text-2xl italic text-[#f4ead8]/75'
              }
              style={isJournal ? { fontFamily: '"Manrope", system-ui, sans-serif' } : undefined}
            >
              {section.subtitle}
            </p>
          )}

          {isJournal ? (
            <>
              <p
                className='mt-6 max-w-xl font-serif text-[1.95rem] italic leading-snug text-[#f4ead8]/78 sm:text-[2.55rem]'
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                {section.description}
              </p>
              {section.content && (
                <div className='mt-10 max-h-[40vh] max-w-2xl overflow-y-auto rounded-[28px] border border-[#f4ead8]/10 bg-black/18 px-5 py-5 pr-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:px-7 sm:py-6'>
                  <div
                    className='whitespace-pre-wrap text-[16px] leading-8 text-[#f4ead8]/82 sm:text-[18px] sm:leading-9'
                    style={{ fontFamily: '"Manrope", system-ui, sans-serif' }}
                  >
                    {section.content}
                  </div>
                </div>
              )}
            </>
          ) : section.description ? (
            <p className='mt-6 max-w-md text-base leading-7 text-[#f4ead8]/75'>
              {section.description}
            </p>
          ) : null}

          {!isJournal && (
            <div className='mt-8 grid gap-3'>
              {section.links?.map((link) => (
                <div key={link.label} className='rounded-xl border border-[#f4ead8]/12 bg-black/25 px-4 py-3 backdrop-blur-md'>
                  <div className='text-xs uppercase tracking-[0.22em] text-[#f4ead8]/45'>
                    {link.label}
                  </div>
                  <div className='mt-1 text-sm text-[#f4ead8]/85'>{link.value}</div>
                </div>
              ))}
            </div>
          )}

          {!isJournal && (
            <div className='mt-8 flex flex-wrap gap-4'>
              <a
                href={section.route}
                className='rounded-full border border-[#f4ead8]/35 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#f4ead8] transition hover:bg-[#f4ead8] hover:text-black'
              >
                {section.buttonLabel} →
              </a>

              <button
                type='button'
                onClick={onBack}
                className='rounded-full border border-[#f4ead8]/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#f4ead8]/65 transition hover:text-[#f4ead8]'
              >
                Back
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
