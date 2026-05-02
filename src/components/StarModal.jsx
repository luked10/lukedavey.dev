import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function StarModal({ star, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!star) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // Lock scroll
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Send focus to close button so keyboard users can act immediately
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      clearTimeout(t)
    }
  }, [star, onClose])

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseDown={(e) => {
            // Close on outside click — only when the press starts on the backdrop
            if (e.target === e.currentTarget) onClose()
          }}
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'rgba(5,5,9,0.55)',
              backdropFilter: 'blur(14px) saturate(120%)',
              WebkitBackdropFilter: 'blur(14px) saturate(120%)',
            }}
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="star-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border p-7 sm:p-9 text-cream"
            style={{
              borderColor: 'rgba(242, 234, 220, 0.12)',
              background:
                'linear-gradient(160deg, rgba(20,18,30,0.7) 0%, rgba(10,10,20,0.78) 100%)',
              boxShadow:
                '0 40px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
              color: '#f2eadc',
            }}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Soft amber glow accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(240,201,138,0.55), transparent 70%)' }}
            />

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-cream/60 hover:text-cream transition-colors"
              style={{ color: 'rgba(242, 234, 220, 0.6)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            <p
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{ color: 'rgba(240, 201, 138, 0.7)' }}
            >
              {star.subtitle}
            </p>
            <h2
              id="star-modal-title"
              className="mt-3 font-serif text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {star.title}
            </h2>
            <p
              className="mt-5 text-[15px] leading-relaxed"
              style={{ color: 'rgba(242, 234, 220, 0.78)' }}
            >
              {star.content}
            </p>

            <div
              className="mt-8 h-px w-full"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(242,234,220,0.18), transparent)',
              }}
            />
            <p
              className="mt-4 text-[10px] uppercase tracking-[0.28em]"
              style={{ color: 'rgba(242, 234, 220, 0.35)' }}
            >
              press esc to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
