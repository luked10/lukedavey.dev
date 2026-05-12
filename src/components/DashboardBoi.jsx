import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const phaseOrderBoi = ['pre-market', 'execution', 'midday', 'close']

const phaseConfigBoi = {
  'pre-market': {
    label: 'Pre-market boi',
    window: '04:00–09:29 ET',
    summary: 'Map the board, mark levels, and warm the thesis stack before the open.',
    objective: 'Build the watchlist and confirm the opening bias.',
    nextAction: 'Review catalyst notes and tighten levels before the bell.',
    accent: 'from-cyan-400/60 via-sky-400/40 to-indigo-500/40',
  },
  execution: {
    label: 'Execution boi',
    window: '09:30–11:59 ET',
    summary: 'Fast context, fast decisions, and disciplined size with a live fill loop.',
    objective: 'Protect entry quality and keep the inventory clean.',
    nextAction: 'Watch slippage, verify fills, and reduce hesitation.',
    accent: 'from-emerald-400/60 via-teal-400/40 to-cyan-500/40',
  },
  midday: {
    label: 'Midday boi',
    window: '12:00–15:29 ET',
    summary: 'Let the market breathe, manage risk, and re-rate the trade book.',
    objective: 'Hold only the strongest ideas and re-check exposure.',
    nextAction: 'Trim weak positions and prep for the last push.',
    accent: 'from-amber-400/60 via-orange-400/40 to-rose-500/40',
  },
  close: {
    label: 'Close boi',
    window: '15:30–20:00 ET',
    summary: 'Flatten the day, write the postmortem, and hand the system to tomorrow.',
    objective: 'Lock in the session outcome and archive the decisions.',
    nextAction: 'Finalize notes, performance, and next-session flags.',
    accent: 'from-fuchsia-400/60 via-violet-500/40 to-sky-400/40',
  },
}

const manualDecisionBoi = [
  {
    id: 'decision-session-architecture',
    title: 'session architecture locked',
    detail: 'four-phase flow keeps the dashboard aligned with operator intent',
    meta: 'decision log / dashboard-plan.md',
    kind: 'decision',
  },
  {
    id: 'decision-audit-trail',
    title: 'audit trail wired to repo activity',
    detail: 'live commits can surface the latest repo change as a decision feed',
    meta: 'decision log / repo pulse',
    kind: 'signal',
  },
  {
    id: 'decision-performance',
    title: 'broker-neutral metrics layer defined',
    detail: 'the performance panel stays portable across execution venues',
    meta: 'decision log / normalized performance',
    kind: 'risk',
  },
]

const performanceBoi = [
  { label: 'PnL', value: '+8.4%', note: '+1.2% today', progress: 84 },
  { label: 'Win rate', value: '61%', note: '32 trades reviewed', progress: 61 },
  { label: 'Avg win / loss', value: '1.8R', note: 'positive expectancy', progress: 72 },
  { label: 'Exposure', value: '38%', note: 'balanced across themes', progress: 38 },
  { label: 'Drawdown', value: '-2.1%', note: 'within guardrails', progress: 21 },
  { label: 'Fill quality', value: '92%', note: 'slippage controlled', progress: 92 },
]

const sessionRowsBoi = [
  { phase: 'Pre-market', pnl: '+0.8%', slippage: '0.12%', quality: '96%' },
  { phase: 'Execution', pnl: '+4.1%', slippage: '0.28%', quality: '91%' },
  { phase: 'Midday', pnl: '+1.6%', slippage: '0.18%', quality: '94%' },
  { phase: 'Close', pnl: '+1.9%', slippage: '0.10%', quality: '97%' },
]

function getEasternClockBoi(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function getSessionPhaseBoi(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(date)
  const hour = Number(parts.find((part) => part.type === 'hour')?.value || '0')
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || '0')
  const minutesSinceMidnight = hour * 60 + minute

  if (minutesSinceMidnight >= 570 && minutesSinceMidnight < 720) return 'execution'
  if (minutesSinceMidnight >= 720 && minutesSinceMidnight < 930) return 'midday'
  if (minutesSinceMidnight >= 210 && minutesSinceMidnight < 570) return 'pre-market'
  return 'close'
}

function formatRepoTimeBoi(dateString) {
  const date = new Date(dateString)
  const diffSeconds = Math.round((Date.now() - date.getTime()) / 1000)

  if (Number.isNaN(diffSeconds)) return 'just now'
  if (diffSeconds < 60) return Math.max(diffSeconds, 1) + 's ago'
  const diffMinutes = Math.round(diffSeconds / 60)
  if (diffMinutes < 60) return diffMinutes + 'm ago'
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return diffHours + 'h ago'
  return Math.round(diffHours / 24) + 'd ago'
}

function shortShaBoi(value = '') {
  return value.slice(0, 7)
}

export default function DashboardBoi() {
  const shouldReduceMotionBoi = useReducedMotion()
  const [clockBoi, setClockBoi] = useState(new Date())
  const [repoFeedBoi, setRepoFeedBoi] = useState([])
  const [repoStateBoi, setRepoStateBoi] = useState('loading')

  useEffect(() => {
    const timerBoi = window.setInterval(() => setClockBoi(new Date()), 1000)
    return () => window.clearInterval(timerBoi)
  }, [])

  useEffect(() => {
    let cancelledBoi = false

    const loadRepoFeedBoi = async () => {
      try {
        setRepoStateBoi((current) => (current === 'ready' ? 'refreshing' : 'loading'))
        const response = await fetch('https://api.github.com/repos/luked10/lukedavey.dev/commits?per_page=6')

        if (!response.ok) {
          throw new Error('repo feed unavailable')
        }

        const commits = await response.json()

        if (cancelledBoi) return

        const nextFeedBoi = commits.map((commit) => ({
          id: commit.sha,
          title: commit.commit?.message?.split('
')?.[0] || 'repo update',
          detail:
            commit.commit?.message?.split('
')?.slice(1).join(' ') || 'source-linked commit surfaced from the repository',
          meta: (commit.commit?.author?.name || commit.author?.login || 'repo') + ' · ' + shortShaBoi(commit.sha),
          time: formatRepoTimeBoi(commit.commit?.author?.date || new Date().toISOString()),
          kind: 'repo',
        }))

        setRepoFeedBoi(nextFeedBoi)
        setRepoStateBoi('ready')
      } catch {
        if (!cancelledBoi) {
          setRepoStateBoi('offline')
          setRepoFeedBoi([])
        }
      }
    }

    loadRepoFeedBoi()
    const pollBoi = window.setInterval(loadRepoFeedBoi, 30000)

    return () => {
      cancelledBoi = true
      window.clearInterval(pollBoi)
    }
  }, [])

  const activePhaseBoi = useMemo(() => {
    const phaseId = getSessionPhaseBoi(clockBoi)
    return phaseConfigBoi[phaseId]
  }, [clockBoi])

  const feedBoi = useMemo(() => {
    const repoEntriesBoi = repoFeedBoi.map((entry) => ({
      ...entry,
      kind: 'repo',
    }))

    return [...repoEntriesBoi, ...manualDecisionBoi].slice(0, 8)
  }, [repoFeedBoi])

  return (
    <section className='relative min-h-screen overflow-hidden bg-[#03040a] text-[#f4f0e9]'>
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(circle at top left, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0) 32%), radial-gradient(circle at top right, rgba(168, 85, 247, 0.16) 0%, rgba(168, 85, 247, 0) 34%), linear-gradient(180deg, #090b12 0%, #03040a 52%, #020308 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.18]'
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_58%)]'
      />

      <div className='relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10'>
        <header className='grid gap-5 border-b border-white/10 pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
          <div className='space-y-3'>
            <div className='flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/70'>
              <span className='rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-cyan-100/90'>
                opus session console boi
              </span>
              <span>lukedavey.dev</span>
              <span>live repo / live session</span>
            </div>
            <div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end'>
              <div>
                <h1 className='max-w-4xl text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white'>
                  session-driven dashboard boi
                </h1>
                <p className='mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base'>
                  A broker-neutral control room with an active session state, a repo-fed decision log, and a normalized
                  performance layer wrapped in a vibe-coded interface.
                </p>
              </div>
              <div className='rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl'>
                <div className='text-[0.64rem] uppercase tracking-[0.28em] text-slate-400'>eastern clock boi</div>
                <div className='mt-2 text-2xl font-medium text-white'>{getEasternClockBoi(clockBoi)}</div>
                <div className='mt-2 text-xs uppercase tracking-[0.22em] text-cyan-200/70'>
                  {activePhaseBoi.label}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
          <div className='grid gap-6'>
            <motion.section
              className='rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.45, ease: 'easeOut' }}
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <p className='text-[0.64rem] uppercase tracking-[0.26em] text-cyan-200/70'>active session boi</p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl'>
                    {activePhaseBoi.label}
                  </h2>
                </div>
                <div className='rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-slate-200/80'>
                  {activePhaseBoi.window}
                </div>
              </div>

              <div className='mt-5 grid gap-3 md:grid-cols-4'>
                {phaseOrderBoi.map((phaseId) => {
                  const phase = phaseConfigBoi[phaseId]
                  const isActive = phaseId === getSessionPhaseBoi(clockBoi)

                  return (
                    <div
                      key={phaseId}
                      className={[
                        'rounded-2xl border p-4 backdrop-blur-md transition',
                        isActive
                          ? 'border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.1)]'
                          : 'border-white/8 bg-black/18',
                      ].join(' ')}
                    >
                      <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>{phase.label}</div>
                      <div className='mt-3 text-sm leading-6 text-slate-200/90'>{phase.window}</div>
                      <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-white/8'>
                        <div
                          className={[
                            'h-full rounded-full bg-gradient-to-r',
                            phase.accent,
                            isActive ? 'opacity-100' : 'opacity-40',
                          ].join(' ')}
                          style={{ width: isActive ? '100%' : '42%' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={activePhaseBoi.label}
                  className='mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotionBoi ? 0 : 0.28, ease: 'easeOut' }}
                >
                  <div className='rounded-3xl border border-white/10 bg-black/28 p-5'>
                    <div className='text-[0.64rem] uppercase tracking-[0.26em] text-slate-400'>current objective boi</div>
                    <p className='mt-3 text-2xl leading-9 text-white sm:text-[1.7rem]'>
                      {activePhaseBoi.objective}
                    </p>
                    <p className='mt-4 text-sm leading-7 text-slate-300'>{activePhaseBoi.summary}</p>
                  </div>
                  <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
                    <div className='rounded-3xl border border-white/10 bg-white/5 p-5'>
                      <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>next action boi</div>
                      <p className='mt-3 text-base leading-7 text-white/90'>{activePhaseBoi.nextAction}</p>
                    </div>
                    <div className='rounded-3xl border border-white/10 bg-white/5 p-5'>
                      <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>session mode boi</div>
                      <p className='mt-3 text-base leading-7 text-white/90'>
                        live, session-aware, and built to keep the flow readable while the market moves.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.section>

            <motion.section
              className='rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.5, ease: 'easeOut', delay: 0.06 }}
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <p className='text-[0.64rem] uppercase tracking-[0.26em] text-cyan-200/70'>audit trail boi</p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-[-0.04em] text-white'>
                    real-time repo decision log
                  </h2>
                </div>
                <div className='rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-slate-200/80'>
                  {repoStateBoi}
                </div>
              </div>

              <div className='mt-5 grid gap-3'>
                <AnimatePresence initial={false}>
                  {feedBoi.map((entry) => (
                    <motion.article
                      key={entry.id}
                      className='rounded-2xl border border-white/10 bg-black/28 p-4'
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: shouldReduceMotionBoi ? 0 : 0.24, ease: 'easeOut' }}
                    >
                      <div className='flex flex-wrap items-start justify-between gap-4'>
                        <div>
                          <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>
                            {entry.kind === 'repo' ? 'repo pulse boi' : entry.kind}
                          </div>
                          <h3 className='mt-2 text-lg font-medium text-white'>{entry.title}</h3>
                        </div>
                        <div className='text-right text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>
                          <div>{entry.meta}</div>
                          <div className='mt-1 text-cyan-200/70'>{entry.time || 'now'}</div>
                        </div>
                      </div>
                      <p className='mt-3 text-sm leading-7 text-slate-300'>{entry.detail}</p>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>

          <div className='grid gap-6'>
            <motion.section
              className='rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.48, ease: 'easeOut', delay: 0.08 }}
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <p className='text-[0.64rem] uppercase tracking-[0.26em] text-cyan-200/70'>performance boi</p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-[-0.04em] text-white'>
                    broker-agnostic overview
                  </h2>
                </div>
                <div className='rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-emerald-100/90'>
                  normalized across venues
                </div>
              </div>

              <div className='mt-5 grid gap-3 sm:grid-cols-2'>
                {performanceBoi.map((metric) => (
                  <div key={metric.label} className='rounded-2xl border border-white/10 bg-black/24 p-4'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>
                          {metric.label}
                        </div>
                        <div className='mt-2 text-2xl font-semibold text-white'>{metric.value}</div>
                      </div>
                      <div className='text-right text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70'>
                        {metric.note}
                      </div>
                    </div>
                    <div className='mt-4 h-2 overflow-hidden rounded-full bg-white/8'>
                      <div
                        className='h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400'
                        style={{ width: metric.progress + '%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-5 rounded-3xl border border-white/10 bg-black/28 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='text-[0.64rem] uppercase tracking-[0.26em] text-slate-400'>session breakdown boi</div>
                  <div className='text-[0.64rem] uppercase tracking-[0.24em] text-slate-400'>pnl / slippage / fill quality</div>
                </div>
                <div className='mt-4 grid gap-3'>
                  {sessionRowsBoi.map((row) => (
                    <div
                      key={row.phase}
                      className='grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.7fr))] gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm'
                    >
                      <div className='font-medium text-white'>{row.phase}</div>
                      <div className='text-cyan-200/80'>{row.pnl}</div>
                      <div className='text-slate-300'>{row.slippage}</div>
                      <div className='text-slate-300'>{row.quality}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              className='rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              <div className='text-[0.64rem] uppercase tracking-[0.26em] text-cyan-200/70'>vibe code boi</div>
              <p className='mt-3 text-base leading-7 text-slate-300'>
                Dark graphite, electric accents, glass panels, and crisp hierarchy tuned for a hand-built control room
                rather than a generic SaaS dashboard.
              </p>
              <div className='mt-4 flex flex-wrap gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-slate-300'>
                <span className='rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-2'>glass boi</span>
                <span className='rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-2'>signal boi</span>
                <span className='rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2'>clean boi</span>
                <span className='rounded-full border border-white/10 bg-white/5 px-3 py-2'>broker-neutral boi</span>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </section>
  )
}
