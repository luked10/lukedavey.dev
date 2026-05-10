import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { starNodes } from '../data/starNodes'
import { sections } from '../data/sections'
import FloatingStar from './FloatingStar'
import GrainOverlay from './GrainOverlay'
import VignetteOverlay from './VignetteOverlay'
import ConstellationLines from './ConstellationLines'
import MemoryTransitionOverlay from './MemoryTransitionOverlay'
import PasswordGate from './PasswordGate'
import SectionPreview from './SectionPreview'

const defaultBackgroundImage = '/ld.webp'
const JOURNAL_PASSWORD = 'living'

// Side determines which side of the star the label sits on
const labelSide = {
  about: 'right',
  journal: 'right',
  photography: 'right',
  listening: 'right',
  archive: 'left',
}

export default function DreamHero() {
  const shouldReduceMotion = useReducedMotion()
  const transitionTimers = useRef([])
  const [selectedSection, setSelectedSection] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isJournalUnlocked, setIsJournalUnlocked] = useState(false)
  const [isJournalGateOpen, setIsJournalGateOpen] = useState(false)
  const [transitionOrigin, setTransitionOrigin] = useState(null)
  const activeSectionData = activeSection ? sections[activeSection] : null
  const transitionSectionData = selectedSection ? sections[selectedSection.id] : null
  const uiHidden = isTransitioning || Boolean(activeSectionData) || isJournalGateOpen
  const activeBackgroundImage =
    (isTransitioning ? transitionSectionData?.background : isJournalGateOpen ? transitionSectionData?.background : null) ||
    defaultBackgroundImage

  useEffect(() => {
    return () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const handleSelectSection = (star, event) => {
    if (isTransitioning) return

    if (star.id === 'journal' && !isJournalUnlocked) {
      const rect = event.currentTarget.getBoundingClientRect()
      setTransitionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
      setSelectedSection(star)
      setIsJournalGateOpen(true)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setTransitionOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setSelectedSection(star)

    if (shouldReduceMotion) {
      setActiveSection(star.id)
      setIsTransitioning(false)
      return
    }

    setIsTransitioning(true)
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer))
    transitionTimers.current = [
      window.setTimeout(() => setActiveSection(star.id), 780),
      window.setTimeout(() => setIsTransitioning(false), 1350),
    ]
  }

  const handleBack = () => {
    if (isTransitioning) return
    setActiveSection(null)
    setSelectedSection(null)
    setIsJournalGateOpen(false)
    setTransitionOrigin(null)
  }

  const handleJournalUnlock = async (password) => {
    if (password !== JOURNAL_PASSWORD) return false

    setIsJournalUnlocked(true)
    setIsJournalGateOpen(false)
    setActiveSection('journal')
    return true
  }

  const handleJournalGateCancel = () => {
    if (isTransitioning) return
    setIsJournalGateOpen(false)
    setSelectedSection(null)
    setTransitionOrigin(null)
  }

  return (
    <>
      <section
        aria-label="lukedavey — fragments of me"
        className="relative h-full w-full overflow-hidden"
      >
        {/* z-0 background image */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            scale: isTransitioning ? 1.1 : 1,
            filter: isTransitioning
              ? 'brightness(1.12) saturate(1.05) blur(1.5px)'
              : 'brightness(1.12) saturate(1.05) blur(0px)',
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={activeBackgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-75 blur-2xl"
            draggable={false}
          />
          <img
            src={activeBackgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />
        </motion.div>

        {/* z-10 very light matte for text legibility, mostly preserves image vibrance */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ background: 'rgba(5, 5, 14, 0.18)' }}
        />

        {/* z-10 vignette */}
        <VignetteOverlay />

        {/* z-10 grain */}
        <GrainOverlay />

        {/* z-20 constellation arcs (under stars and labels) */}
        <ConstellationLines isHidden={uiHidden} />

        {/* z-40 brand */}
        <motion.header
          className="absolute left-0 top-0 z-40 flex items-center px-6 pt-6 sm:px-12 sm:pt-8"
          aria-hidden={uiHidden}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: uiHidden ? 0 : 1, y: uiHidden ? -8 : 0 }}
          transition={{
            opacity: { duration: uiHidden ? 0.4 : 1.6, delay: uiHidden ? 0.15 : 0.2, ease: 'easeOut' },
            y: { duration: 0.6, ease: 'easeOut' },
          }}
          style={{ pointerEvents: uiHidden ? 'none' : 'auto' }}
        >
          <span
            className="font-serif"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#f4ead8',
              fontSize: 'clamp(1.35rem, 2vw, 2rem)',
              letterSpacing: '0.18em',
              textShadow: '0 1px 10px rgba(0,0,0,0.7)',
            }}
          >
            lukedavey
          </span>
        </motion.header>

        {/* z-40 headline + cta */}
        <motion.div
          className="absolute z-40 bottom-10 left-6 max-w-[88%] sm:bottom-16 sm:left-12 sm:max-w-[55%]"
          aria-hidden={uiHidden}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: uiHidden ? 0 : 1, y: uiHidden ? 12 : 0 }}
          transition={{
            opacity: { duration: uiHidden ? 0.4 : 1.8, delay: uiHidden ? 0.15 : 0.5, ease: 'easeOut' },
            y: { duration: 0.55, ease: 'easeOut' },
          }}
          style={{ pointerEvents: uiHidden ? 'none' : 'auto' }}
        >
          {/*
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
          */}
        </motion.div>

        {/* z-30 floating stars, z-40 labels within each control */}
        {starNodes.map((star) => (
          <FloatingStar
            key={star.id}
            star={star}
            side={labelSide[star.id] || 'right'}
            activeStarId={selectedSection?.id}
            isHidden={uiHidden}
            isTransitioning={isTransitioning}
            onSelect={handleSelectSection}
          />
        ))}

        <AnimatePresence>
          {activeSectionData && (
            <SectionPreview section={activeSectionData} onBack={handleBack} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isJournalGateOpen && selectedSection?.id === 'journal' && (
            <PasswordGate
              title={sections.journal.title}
              subtitle='protected journal'
              onSubmit={handleJournalUnlock}
              onCancel={handleJournalGateCancel}
            />
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {isTransitioning && <MemoryTransitionOverlay origin={transitionOrigin} />}
      </AnimatePresence>
    </>
  )
}
