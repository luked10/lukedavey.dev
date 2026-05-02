import { useState } from 'react'
import { motion } from 'motion/react'
import { starNodes } from '../data/starNodes'
import FloatingStar from './FloatingStar'
import StarModal from './StarModal'
import GrainOverlay from './GrainOverlay'
import VignetteOverlay from './VignetteOverlay'
import ConstellationLines from './ConstellationLines'

const navItems = ['About', 'Journal', 'Photography', 'Listening', 'Archive']

// Side determines which side of the star the label sits on
const labelSide = {
  about: 'right',
  journal: 'right',
  photography: 'left',
  listening: 'left',
  today: 'left',
  archive: 'left',
}

export default function DreamHero() {
  const [selectedStar, setSelectedStar] = useState(null)

  return (
    <>
      <section
        aria-label="desiderium — fragments of me"
        className="relative h-full w-full overflow-hidden"
      >
        {/* z-0 background image — full bleed */}
        <img
          src="/dream-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* z-10 very light matte for text legibility, mostly preserves image vibrance */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{ background: 'rgba(5, 5, 14, 0.18)' }}
        />

        {/* z-10 vignette */}
        <VignetteOverlay />

        {/* z-10 grain */}
        <GrainOverlay />

        {/* z-20 constellation arcs (under stars and labels) */}
        <ConstellationLines />

        {/* z-20 nav + brand */}
        <motion.header
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
        >
          <span
            className="font-serif italic text-[18px] sm:text-[20px]"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'rgba(245, 237, 222, 0.95)',
              textShadow: '0 1px 10px rgba(0,0,0,0.7)',
            }}
          >
            desiderium
          </span>
          <nav aria-label="Primary">
            <ul className="hidden md:flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-serif text-[15px] transition-colors duration-500"
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: 'rgba(245, 237, 222, 0.78)',
                      textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'rgba(245, 237, 222, 1)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(245, 237, 222, 0.78)')
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <span
              className="md:hidden text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: 'rgba(245, 237, 222, 0.6)',
                textShadow: '0 1px 6px rgba(0,0,0,0.7)',
              }}
            >
              menu
            </span>
          </nav>
        </motion.header>

        {/* z-20 headline + cta */}
        <motion.div
          className="absolute z-20 left-6 sm:left-12 bottom-10 sm:bottom-16 max-w-[88%] sm:max-w-[55%]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.5 }}
        >
          <h1
            className="font-serif tracking-tight"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#f5edde',
              textShadow: '0 2px 28px rgba(0,0,0,0.55)',
              fontWeight: 400,
              fontSize: 'clamp(48px, 7.6vw, 110px)',
              lineHeight: 0.96,
            }}
          >
            <span className="block">Fragments</span>
            <span className="block" style={{ color: 'rgba(245, 237, 222, 0.92)' }}>
              of me.
            </span>
          </h1>
          <p
            className="mt-5 sm:mt-6 max-w-md text-[14px] sm:text-[15px] leading-relaxed"
            style={{
              color: 'rgba(245, 237, 222, 0.72)',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            }}
          >
            Thoughts, photos, and memories from a life in progress.
          </p>

          <a
            href="#about"
            className="group mt-6 sm:mt-8 inline-flex items-center gap-2 font-serif text-[15px] sm:text-[16px] transition-all duration-500"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'rgba(245, 237, 222, 0.92)',
            }}
          >
            <span
              className="relative pb-1"
              style={{
                borderBottom: '1px solid rgba(240, 201, 138, 0.5)',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}
            >
              Explore
            </span>
            <span
              className="transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* z-30 floating stars */}
        {starNodes.map((star) => (
          <FloatingStar
            key={star.id}
            star={star}
            side={labelSide[star.id] || 'right'}
            onSelect={setSelectedStar}
          />
        ))}
      </section>

      {/* z-50 modal */}
      <StarModal star={selectedStar} onClose={() => setSelectedStar(null)} />
    </>
  )
}
