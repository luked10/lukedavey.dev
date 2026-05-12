import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const metricCards = [
  { label: 'Profit', value: '—' },
  { label: 'Avg Win/Loss', value: '— / —' },
  { label: 'Best Trade', value: '—' },
  { label: 'Win Ratio', value: '—' },
  { label: 'Risk/Reward', value: '—' },
  { label: 'Profit Factor', value: '—' },
]

const controlCards = [
  { label: 'Daily Loss Limit', value: '—' },
  { label: 'Profit Target', value: '—' },
  { label: 'Total Balance', value: '—' },
]

const sidebarGroups = [
  {
    heading: 'Menu',
    items: ['Dashboard', 'Orders', 'Balances', 'History'],
  },
  {
    heading: 'Apps',
    items: ['Trading', 'Notifications', 'Settings'],
  },
]

function formatRelative(dateString) {
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

function shortSha(value = '') {
  return value.slice(0, 7)
}

function ChartLine() {
  const points = [
    [0, 72],
    [12, 68],
    [24, 71],
    [36, 60],
    [48, 63],
    [60, 48],
    [72, 52],
    [84, 41],
    [96, 46],
    [108, 34],
    [120, 30],
    [132, 38],
    [144, 26],
    [156, 20],
    [168, 18],
    [180, 24],
    [192, 16],
    [204, 12],
    [216, 17],
    [228, 8],
    [240, 10],
  ]

  const linePath = points.map((p, index) => (index === 0 ? 'M' : 'L') + p[0] + ' ' + p[1]).join(' ')
  const areaPath = linePath + ' L 240 100 L 0 100 Z'

  return (
    <svg viewBox='0 0 240 100' className='h-full w-full overflow-visible'>
      <defs>
        <linearGradient id='balanceFill' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='rgba(59, 130, 246, 0.24)' />
          <stop offset='100%' stopColor='rgba(59, 130, 246, 0.02)' />
        </linearGradient>
      </defs>
      <path d={areaPath} fill='url(#balanceFill)' />
      <path d={linePath} fill='none' stroke='rgb(59, 130, 246)' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
      {points.map((point, index) => (
        <circle key={index} cx={point[0]} cy={point[1]} r='2.8' fill='rgb(59, 130, 246)' />
      ))}
    </svg>
  )
}

export default function DashboardBoi() {
  const shouldReduceMotion = useReducedMotion()
  const [clock, setClock] = useState(new Date())
  const [orderHistory, setOrderHistory] = useState([])
  const [feedState, setFeedState] = useState('loading')

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadOrderHistory = async () => {
      try {
        setFeedState((current) => (current === 'ready' ? 'refreshing' : 'loading'))
        const response = await fetch('https://api.github.com/repos/luked10/lukedavey.dev/commits?per_page=8')

        if (!response.ok) {
          throw new Error('repo feed unavailable')
        }

        const commits = await response.json()

        if (cancelled) return

        const nextOrderHistory = commits.map((commit) => {
          const message = commit.commit?.message || 'repo update'
          const lines = message.split(String.fromCharCode(10))
          const title = lines[0] || 'repo update'
          const detail = lines.slice(1).join(' ') || 'decision pulse'
          const author = commit.commit?.author?.name || commit.author?.login || 'repo'

          return {
            id: commit.sha,
            title,
            detail,
            meta: author + ' · ' + shortSha(commit.sha),
            time: formatRelative(commit.commit?.author?.date || new Date().toISOString()),
            status: detail.toLowerCase().includes('fix') ? 'Closed' : 'Open',
          }
        })

        setOrderHistory(nextOrderHistory)
        setFeedState('ready')
      } catch {
        if (!cancelled) {
          setFeedState('offline')
          setOrderHistory([])
        }
      }
    }

    loadOrderHistory()
    const poll = window.setInterval(loadOrderHistory, 30000)

    return () => {
      cancelled = true
      window.clearInterval(poll)
    }
  }, [])

  const notifications = useMemo(() => {
    const latest = orderHistory[0]

    return [
      {
        id: 'guardrail',
        title: 'Risk guardrail armed',
        detail: 'Daily loss limit and profit target ready.',
      },
      {
        id: 'feed',
        title: feedState === 'ready' ? 'Repo pulse live' : 'Repo pulse waiting',
        detail: latest ? latest.title : 'No fills yet from the repo log.',
      },
    ]
  }, [feedState, orderHistory])

  const visibleOrderHistory = orderHistory.slice(0, 6)

  return (
    <section className='relative h-screen overflow-y-auto overflow-x-hidden bg-white text-slate-900'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.16),transparent_24%)]'
      />
      <div className='relative flex min-h-full w-full'>
        <aside className='hidden w-72 shrink-0 border-r border-slate-200 bg-slate-50/90 px-5 py-6 lg:flex lg:flex-col'>
          <div className='text-sm font-semibold tracking-tight text-slate-900'>Luke’s Trading Dashboard</div>
          <div className='mt-8 space-y-6 text-sm text-slate-500'>
            {sidebarGroups.map((group) => (
              <div key={group.heading}>
                <div className='mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400'>{group.heading}</div>
                <div className='space-y-1'>
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className={item === 'Dashboard' ? 'rounded-xl bg-white px-3 py-2 text-slate-900 shadow-sm' : 'rounded-xl px-3 py-2 hover:bg-white'}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className='min-w-0 flex-1'>
          <div className='mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8'>
            <motion.header
              className='grid gap-5 border-b border-slate-200 pb-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: 'easeOut' }}
            >
              <div className='space-y-3'>
                <div className='flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-slate-500'>
                  <span className='rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700'>
                    Trading Dashboard
                  </span>
                  <span>lukedavey.dev</span>
                  <span>live session</span>
                </div>
                <div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end'>
                  <div>
                    <h1 className='text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-900'>
                      Luke’s Trading Dashboard
                    </h1>
                  </div>
                  <div className='rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm'>
                    <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>Eastern Clock</div>
                    <div className='mt-2 text-xl font-medium text-slate-900'>
                      {new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/New_York',
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      }).format(clock)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.header>

            <div className='mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
              <motion.section
                className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6'
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
              >
                <div className='grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
                  <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:p-6'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>Total Balance</div>
                        <div className='mt-2 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold leading-none text-slate-900'>
                          —
                        </div>
                      </div>
                      <div className='rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-slate-500'>
                        Charges / Fees
                      </div>
                    </div>
                    <div className='mt-5 h-64 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4'>
                      <ChartLine />
                    </div>
                  </div>

                  <div className='grid gap-4'>
                    <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                      <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>Profit Target</div>
                      <div className='mt-4 text-3xl font-semibold text-slate-900'>—</div>
                      <div className='mt-4 h-2 overflow-hidden rounded-full bg-slate-100'>
                        <div className='h-full w-[36%] rounded-full bg-blue-500' />
                      </div>
                    </div>
                    <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                      <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>Daily Loss Limit</div>
                      <div className='mt-4 text-3xl font-semibold text-slate-900'>—</div>
                      <div className='mt-4 h-2 overflow-hidden rounded-full bg-slate-100'>
                        <div className='h-full w-[18%] rounded-full bg-rose-500' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {metricCards.map((stat) => (
                    <div key={stat.label} className='rounded-[1.15rem] border border-slate-200 bg-white p-4'>
                      <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>{stat.label}</div>
                      <div className='mt-3 text-[1.8rem] font-semibold leading-none text-slate-900'>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6'
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: 'easeOut', delay: 0.03 }}
              >
                <div className='grid gap-4'>
                  <div className='rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm'>
                    <div className='flex items-center justify-between gap-3'>
                      <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>Notifications</div>
                      <div className='rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[0.61rem] uppercase tracking-[0.22em] text-slate-500'>
                        {feedState}
                      </div>
                    </div>
                    <div className='mt-4 grid gap-3'>
                      {notifications.map((notice) => (
                        <div key={notice.id} className='rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4'>
                          <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>Alert</div>
                          <div className='mt-2 text-base font-medium text-slate-900'>{notice.title}</div>
                          <p className='mt-2 text-sm leading-6 text-slate-500'>{notice.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm'>
                    <div className='flex items-center justify-between gap-3'>
                      <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>Order History</div>
                      <div className='text-[0.61rem] uppercase tracking-[0.22em] text-slate-500'>Repo decision log / fills</div>
                    </div>
                    <div className='mt-4 overflow-hidden rounded-[1rem] border border-slate-200'>
                      <div className='grid grid-cols-[1.15fr_0.9fr_0.55fr_0.55fr] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[0.61rem] uppercase tracking-[0.22em] text-slate-400'>
                        <div>Trade</div>
                        <div>Meta</div>
                        <div>Time</div>
                        <div>Status</div>
                      </div>
                      <div className='max-h-[24rem] overflow-y-auto'>
                        <AnimatePresence initial={false}>
                          {visibleOrderHistory.map((entry) => (
                            <motion.div
                              key={entry.id}
                              className='grid grid-cols-[1.15fr_0.9fr_0.55fr_0.55fr] gap-3 border-b border-slate-100 px-4 py-3 text-sm last:border-b-0'
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                            >
                              <div className='font-medium text-slate-900'>{entry.title}</div>
                              <div className='text-slate-500'>{entry.meta}</div>
                              <div className='text-slate-500'>{entry.time}</div>
                              <div>
                                <span
                                  className={[
                                    'inline-flex rounded-full px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em]',
                                    entry.status === 'Closed'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-rose-100 text-rose-700',
                                  ].join(' ')}
                                >
                                  {entry.status}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
