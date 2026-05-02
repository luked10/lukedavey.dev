import { useState } from 'react'
import { motion } from 'motion/react'
import { starNodes } from '../data/starNodes'
import FloatingStar from './FloatingStar'
import StarModal from './StarModal'
import GrainOverlay from './GrainOverlay'
import VignetteOverlay from './VignetteOverlay'

const navItems = ['About', 'Journal', 'Photography', 'Listening', 'Archive']

export default function DreamHero() {
  const [selectedStar, setSelectedStar] = useState(null)

  return (
    <>
      <section
        aria-label="desiderium — fragments of me"
        className="relative w-full max-w-[1200px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]"
        style={{
          aspectRatio: '16 / 9',
          minHeight: '560px',
        }}
      >
        {/* z-0 background image */}
        <img
          src="/dream-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* z-10 matte overlay */}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-black/25" />

        {/* z-10 vignette */}
        <VignetteOverlay />

        {/* z-10 grain */}
        <GrainOverlay />

        {/* z-20 nav + brand */}
        <motion.header
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 sm:px-9 pt-5 sm:pt-7"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
        >
          <span
            className="font-serif italic text-[15px] sm:text-[17px] tracking-wide"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'rgba(242, 234, 220, 0.92)',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            }}
          >
            desiderium
          </span>
          <nav aria-label="Primary">
            <ul className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[10px] uppercase tracking-[0.32em] transition-colors duration-500"
                    style={{
                      color: 'rgba(242, 234, 220, 0.55)',
                      textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(242, 234, 220, 0.92)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242, 234, 220, 0.55)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            {/* Mobile: condensed nav indicator */}
            <span
              className="md:hidden text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(242, 234, 220, 0.45)' }}
            >
              menu
            </span>
          </nav>
        </motion.header>

        {/* z-20 headline + cta */}
        <motion.div
          className="absolute z-20 left-5 sm:left-9 bottom-6 sm:bottom-9 max-w-[88%] sm:max-w-[60%]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.5 }}
        >
          <h1
            className="font-serif leading-[0.95] tracking-tight text-[44px] sm:text-[68px] md:text-[84px]"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#f2eadc',
              textShadow: '0 2px 24px rgba(0,0,0,0.55)',
              fontWeight: 400,
            }}
          >
            <span className="block">Fragments</span>
            <span className="block italic" style={{ color: 'rgba(242, 234, 220, 0.85)' }}>
              of me.
            </span>
          </h1>
          <p
            className="mt-4 sm:mt-5 max-w-md text-[13px] sm:text-[14px] leading-relaxed"
            style={{
              color: 'rgba(242, 234, 220, 0.68)',
              textShadow: '0 1px 8px rgba(0,0,0,0.55)',
            }}
          >
            Thoughts, photos, and memories from a life in progress.
          </p>

          <a
            href="#about"
            className="group mt-5 sm:mt-7 inline-flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.32em] transition-all duration-500"
            style={{ color: 'rgba(242, 234, 220, 0.85)' }}
          >
            <span
              className="relative pb-1"
              style={{
                borderBottom: '1px solid rgba(240, 201, 138, 0.35)',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}
            >
              Explore
            </span>
            <span
              className="transition-transform duration-500 group-hover:translate-x-1"
              style={{ color: 'rgba(240, 201, 138, 0.85)' }}
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* z-30 floating stars */}
        {starNodes.map((star) => (
          <FloatingStar key={star.id} star={star} onSelect={setSelectedStar} />
        ))}
      </section>

      {/* z-50 modal */}
      <StarModal star={selectedStar} onClose={() => setSelectedStar(null)} />
    </>
  )
}
