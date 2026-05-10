import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import GrainOverlay from './GrainOverlay'
import VignetteOverlay from './VignetteOverlay'

const entriesStorageKey = 'lukedavey.journal.entries'
const unlockStorageKey = 'lukedavey.journal.unlocked'
const defaultJournalPassword = 'memory'

const starterEntries = [
  {
    id: 'first-page',
    title: 'First page',
    date: 'May 3, 2026',
    dateTime: '2026-05-03',
    mood: 'quiet',
    body:
      'A place for small fragments before they become anything polished. Keep it honest, simple, and close to the feeling.',
  },
]

function readStoredEntries() {
  try {
    const stored = window.localStorage.getItem(entriesStorageKey)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function formatEntryDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function JournalPage({ onBack }) {
  const shouldReduceMotion = useReducedMotion()
  const [storedEntries, setStoredEntries] = useState(readStoredEntries)
  const [isUnlocked, setIsUnlocked] = useState(
    () => window.localStorage.getItem(unlockStorageKey) === 'true',
  )
  const [password, setPassword] = useState('')
  const [unlockError, setUnlockError] = useState('')
  const [draft, setDraft] = useState({ title: '', mood: '', body: '' })
  const [isComposerOpen, setIsComposerOpen] = useState(false)

  const entries = useMemo(
    () => [...storedEntries, ...starterEntries],
    [storedEntries],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onBack])

  const handleUnlock = (event) => {
    event.preventDefault()

    const configuredPassword =
      import.meta.env.VITE_JOURNAL_PASSWORD || defaultJournalPassword

    if (password === configuredPassword) {
      window.localStorage.setItem(unlockStorageKey, 'true')
      setIsUnlocked(true)
      setIsComposerOpen(true)
      setPassword('')
      setUnlockError('')
      return
    }

    setUnlockError('That password did not open the journal.')
  }

  const handleLock = () => {
    window.localStorage.removeItem(unlockStorageKey)
    setIsUnlocked(false)
    setIsComposerOpen(false)
  }

  const handleDraftChange = (field) => (event) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: event.target.value,
    }))
  }

  const handleSaveEntry = (event) => {
    event.preventDefault()

    const trimmedBody = draft.body.trim()
    if (!draft.title.trim() || !trimmedBody) return

    const nextEntry = {
      id: `entry-${Date.now()}`,
      title: draft.title.trim(),
      date: formatEntryDate(new Date()),
      dateTime: new Date().toISOString(),
      mood: draft.mood.trim() || 'current',
      body: trimmedBody,
    }
    const nextEntries = [nextEntry, ...storedEntries]

    setStoredEntries(nextEntries)
    window.localStorage.setItem(entriesStorageKey, JSON.stringify(nextEntries))
    setDraft({ title: '', mood: '', body: '' })
    setIsComposerOpen(false)
  }

  return (
    <motion.section
      aria-labelledby="journal-title"
      className="relative h-full w-full overflow-y-auto bg-[#050509] text-[#f4ead8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: 'easeOut' }}
    >
      <img
        src="/journal.png"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 h-full w-full scale-105 object-cover opacity-60 blur-2xl"
        draggable={false}
      />
      <img
        src="/journal.png"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 h-full w-full object-cover"
        style={{ opacity: 0.7 }}
        draggable={false}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,14,0.16) 0%, rgba(5,5,14,0.44) 52%, rgba(5,5,14,0.72) 100%)',
        }}
      />
      <VignetteOverlay />
      <GrainOverlay />

      <button
        type="button"
        onClick={onBack}
        className="fixed right-5 top-5 z-30 min-h-11 rounded-full px-4 text-[0.72rem] uppercase tracking-[0.22em] text-[#f4ead8]/80 transition hover:text-[#f4ead8] sm:right-8 sm:top-8 sm:text-sm"
      >
        Back to home
      </button>

      <div className="relative z-20 flex min-h-full w-full max-w-[560px] flex-col px-6 pb-16 pt-24 sm:px-10 sm:pt-28 md:ml-[6vw] md:mr-auto md:px-0">
        <header className="max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#f4ead8]/58 sm:text-sm">
            lukedavey / journal
          </p>
          <h1
            id="journal-title"
            className="font-serif text-[clamp(4.8rem,13vw,10rem)] leading-none text-[#f4ead8]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Journal
          </h1>
          <p className="mt-4 max-w-lg font-serif text-2xl italic leading-snug text-[#f4ead8]/72">
            some thoughts
          </p>
        </header>

        <div className="mt-10 grid gap-5">
          <div className="grid gap-5">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.article
                  key={entry.id}
                  className="rounded-lg border border-[#f4ead8]/12 bg-[#050509]/46 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.42,
                    ease: 'easeOut',
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#f0c98a]/70">
                    <time dateTime={entry.dateTime || entry.date}>{entry.date}</time>
                    <span>{entry.mood}</span>
                  </div>
                  <h2
                    className="mt-4 font-serif text-3xl leading-tight text-[#f4ead8] sm:text-4xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {entry.title}
                  </h2>
                  <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-[#f4ead8]/76 sm:text-base">
                    {entry.body}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <aside>
            <div className="rounded-lg border border-[#f4ead8]/12 bg-[#050509]/52 p-5 backdrop-blur-lg sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h2
                  className="font-serif text-2xl text-[#f4ead8]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  New entry
                </h2>
                {isUnlocked && (
                  <button
                    type="button"
                    onClick={handleLock}
                    className="rounded-full border border-[#f4ead8]/14 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#f4ead8]/58 transition hover:text-[#f4ead8]"
                  >
                    Lock
                  </button>
                )}
              </div>

              {!isUnlocked && (
                <form className="mt-5 grid gap-4" onSubmit={handleUnlock}>
                  <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#f4ead8]/48">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="min-h-12 rounded-md border border-[#f4ead8]/14 bg-black/32 px-4 text-base normal-case tracking-normal text-[#f4ead8] outline-none transition placeholder:text-[#f4ead8]/28 focus:border-[#f0c98a]/45"
                      placeholder="Enter password"
                      required
                    />
                  </label>
                  {unlockError && (
                    <p className="text-sm leading-6 text-[#f0c98a]/78" role="alert">
                      {unlockError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="min-h-12 rounded-full border border-[#f4ead8]/35 px-5 text-xs uppercase tracking-[0.22em] text-[#f4ead8] transition hover:bg-[#f4ead8] hover:text-black"
                  >
                    Unlock
                  </button>
                </form>
              )}

              {isUnlocked && (
                <div className="mt-5">
                  {!isComposerOpen && (
                    <button
                      type="button"
                      onClick={() => setIsComposerOpen(true)}
                      className="min-h-12 w-full rounded-full border border-[#f4ead8]/35 px-5 text-xs uppercase tracking-[0.22em] text-[#f4ead8] transition hover:bg-[#f4ead8] hover:text-black"
                    >
                      Add entry
                    </button>
                  )}

                  <AnimatePresence initial={false}>
                    {isComposerOpen && (
                      <motion.form
                        className="grid gap-4"
                        onSubmit={handleSaveEntry}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.32,
                          ease: 'easeOut',
                        }}
                      >
                        <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#f4ead8]/48">
                          Title
                          <input
                            type="text"
                            value={draft.title}
                            onChange={handleDraftChange('title')}
                            className="min-h-12 rounded-md border border-[#f4ead8]/14 bg-black/32 px-4 text-base normal-case tracking-normal text-[#f4ead8] outline-none transition placeholder:text-[#f4ead8]/28 focus:border-[#f0c98a]/45"
                            placeholder="Entry title"
                            required
                          />
                        </label>

                        <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#f4ead8]/48">
                          Mood
                          <input
                            type="text"
                            value={draft.mood}
                            onChange={handleDraftChange('mood')}
                            className="min-h-12 rounded-md border border-[#f4ead8]/14 bg-black/32 px-4 text-base normal-case tracking-normal text-[#f4ead8] outline-none transition placeholder:text-[#f4ead8]/28 focus:border-[#f0c98a]/45"
                            placeholder="quiet"
                          />
                        </label>

                        <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#f4ead8]/48">
                          Entry
                          <textarea
                            value={draft.body}
                            onChange={handleDraftChange('body')}
                            className="min-h-40 resize-y rounded-md border border-[#f4ead8]/14 bg-black/32 px-4 py-3 text-base normal-case leading-7 tracking-normal text-[#f4ead8] outline-none transition placeholder:text-[#f4ead8]/28 focus:border-[#f0c98a]/45"
                            placeholder="Write it here"
                            required
                          />
                        </label>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="submit"
                            className="min-h-12 rounded-full border border-[#f4ead8]/35 px-5 text-xs uppercase tracking-[0.22em] text-[#f4ead8] transition hover:bg-[#f4ead8] hover:text-black"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsComposerOpen(false)}
                            className="min-h-12 rounded-full border border-[#f4ead8]/14 px-5 text-xs uppercase tracking-[0.22em] text-[#f4ead8]/62 transition hover:text-[#f4ead8]"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  )
}
