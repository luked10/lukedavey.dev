import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const metricCardsBoi = [
  { label: 'Profit', value: '—', note: 'session pnl' },
  { label: 'Avg Win/Loss', value: '— / —', note: 'per trade' },
  { label: 'Best Trade', value: '—', note: 'top realized move' },
  { label: 'Win Ratio', value: '—', note: 'closed trades' },
  { label: 'Risk/Reward', value: '—', note: 'avg ratio' },
  { label: 'Profit Factor', value: '—', note: 'gross wins / losses' },
]

const controlCardsBoi = [
  { label: 'Daily Loss Limit', value: '—', note: 'risk cap' },
  { label: 'Profit Target', value: '—', note: 'session goal' },
  { label: 'Total Balance', value: '—', note: 'incl. charges / fees' },
  { label: 'Notifications', value: 'Live', note: 'repo pulse' },
]

function formatRelativeBoi(dateString) {
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
  const [orderHistoryBoi, setOrderHistoryBoi] = useState([])
  const [feedStateBoi, setFeedStateBoi] = useState('loading')

  useEffect(() => {
    let cancelledBoi = false

    const loadOrderHistoryBoi = async () => {
      try {
        setFeedStateBoi((current) => (current === 'ready' ? 'refreshing' : 'loading'))
        const response = await fetch('https://api.github.com/repos/luked10/lukedavey.dev/commits?per_page=8')

        if (!response.ok) {
          throw new Error('repo feed unavailable')
        }

        const commits = await response.json()

        if (cancelledBoi) return

        const nextOrderHistoryBoi = commits.map((commit) => {
          const message = commit.commit?.message || 'repo update'
          const lines = message.split(String.fromCharCode(10))
          const title = lines[0] || 'repo update'
          const detail = lines.slice(1).join(' ') || 'repository decision pulse'
          const author = commit.commit?.author?.name || commit.author?.login || 'repo'

          return {
            id: commit.sha,
            title,
            detail,
            meta: author + ' · ' + shortShaBoi(commit.sha),
            time: formatRelativeBoi(commit.commit?.author?.date || new Date().toISOString()),
          }
        })

        setOrderHistoryBoi(nextOrderHistoryBoi)
        setFeedStateBoi('ready')
      } catch {
        if (!cancelledBoi) {
          setFeedStateBoi('offline')
          setOrderHistoryBoi([])
        }
      }
    }

    loadOrderHistoryBoi()
    const pollBoi = window.setInterval(loadOrderHistoryBoi, 30000)

    return () => {
      cancelledBoi = true
      window.clearInterval(pollBoi)
    }
  }, [])

  const visibleNotificationsBoi = useMemo(() => {
    const latestOrderBoi = orderHistoryBoi[0]

    return [
      {
        id: 'guardrail',
        title: 'risk guardrail armed',
        detail: 'daily loss limit and profit target are ready to wire.',
        kind: 'system',
      },
      {
        id: 'feed',
        title: feedStateBoi === 'ready' ? 'repo pulse live' : 'repo pulse waiting',
        detail: latestOrderBoi ? latestOrderBoi.title : 'no fills yet from the repo log.',
        kind: feedStateBoi,
      },
    ]
  }, [feedStateBoi, orderHistoryBoi])

  return (
    <section className='relative h-screen overflow-y-auto overflow-x-hidden bg-white text-slate-900'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.16),transparent_24%)]'
      />
      <div className='relative flex min-h-full w-full'>
        <aside className='hidden w-72 shrink-0 border-r border-slate-200 bg-slate-50/90 px-5 py-6 lg:flex lg:flex-col'>
          <div className='text-sm font-semibold tracking-tight text-slate-900'>lukedavey.dev</div>
          <div className='mt-8 space-y-6 text-sm text-slate-500'>
            <div>
              <div className='mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400'>Menu</div>
              <div className='space-y-1'>
                <div className='rounded-xl bg-white px-3 py-2 text-slate-900 shadow-sm'>Dashboard</div>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>Orders</div>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>Balances</div>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>History</div>
              </div>
            </div>
            <div>
              <div className='mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400'>Apps</div>
              <div className='space-y-1'>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>Trading</div>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>Notifications</div>
                <div className='rounded-xl px-3 py-2 hover:bg-white'>Settings</div>
              </div>
            </div>
          </div>
        </aside>

        <div className='min-w-0 flex-1'>
          <div className='mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8'>
            <motion.header
              className='flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.32, ease: 'easeOut' }}
            >
              <div className='space-y-3'>
                <div className='flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-slate-500'>
                  <span className='rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700'>
                    trading dashboard boi
                  </span>
                  <span>lukedavey.dev</span>
                  <span>clean light mode</span>
                </div>
                <div>
                  <h1 className='text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-900'>
                    Welcome back, Luke
                  </h1>
                  <p className='mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base'>
                    A clean, light trading layout with a soft sidebar, compact balance blocks, and a scrollable order feed.
                  </p>
                </div>
              </div>

              <div className='rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm'>
                <div className='text-[0.62rem] uppercase tracking-[0.24em] text-slate-400'>eastern clock boi</div>
                <div className='mt-2 text-xl font-medium text-slate-900'>
                  {new Intl.DateTimeFormat('en-US', {
                    timeZone: 'America/New_York',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  }).format(new Date())}
                </div>
                <div className='mt-2 text-xs uppercase tracking-[0.2em] text-slate-500'>live session</div>
              </div>
            </motion.header>

            <div className='mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
              <motion.section
                className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5'
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotionBoi ? 0 : 0.35, ease: 'easeOut' }}
              >
                <div className='grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
                  <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:p-6'>
                    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                      {metricCardsBoi.map((stat) => (
                        <div key={stat.label} className='rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4'>
                          <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>{stat.label}</div>
                          <div className='mt-3 text-[1.8rem] font-semibold leading-none text-slate-900'>
                            {stat.value}
                          </div>
                          <p className='mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-slate-500'>{stat.note}</p>
                        </div>
                      ))}
                    </div>

                    <div className='mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                      {controlCardsBoi.map((control) => (
                        <div key={control.label} className='rounded-[1.1rem] border border-slate-200 bg-white p-4'>
                          <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>
                            {control.label}
                          </div>
                          <div className='mt-3 text-[1.7rem] font-medium text-slate-900'>{control.value}</div>
                          <div className='mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-slate-500'>
                            {control.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='grid gap-4'>
                    <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                      <div className='flex items-center justify-between gap-3'>
                        <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>notifications</div>
                        <div className='rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[0.61rem] uppercase tracking-[0.22em] text-slate-500'>
                          {feedStateBoi}
                        </div>
                      </div>
                      <div className='mt-4 grid gap-3'>
                        {visibleNotificationsBoi.map((notice) => (
                          <div key={notice.id} className='rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4'>
                            <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>{notice.kind}</div>
                            <div className='mt-2 text-base font-medium text-slate-900'>{notice.title}</div>
                            <p className='mt-2 text-sm leading-6 text-slate-500'>{notice.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                      <div className='flex items-center justify-between gap-3'>
                        <div className='text-[0.61rem] uppercase tracking-[0.26em] text-slate-400'>order history</div>
                        <div className='text-[0.61rem] uppercase tracking-[0.22em] text-slate-500'>repo decision log / fills</div>
                      </div>
                      <div className='mt-4 space-y-3'>
                        <AnimatePresence initial={false}>
                          {orderHistoryBoi.map((entry) => (
                            <motion.article
                              key={entry.id}
                              className='rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4'
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: shouldReduceMotionBoi ? 0 : 0.2, ease: 'easeOut' }}
                            >
                              <div className='flex flex-wrap items-start justify-between gap-3'>
                                <div>
                                  <div className='text-[0.61rem] uppercase tracking-[0.24em] text-slate-400'>
                                    fill / decision
                                  </div>
                                  <h3 className='mt-2 text-sm font-medium text-slate-900'>{entry.title}</h3>
                                </div>
                                <div className='text-right text-[0.61rem] uppercase tracking-[0.22em] text-slate-500'>
                                  <div>{entry.meta}</div>
                                  <div className='mt-1 text-slate-400'>{entry.time}</div>
                                </div>
                              </div>
                              <p className='mt-3 text-sm leading-6 text-slate-500'>{entry.detail}</p>
                            </motion.article>
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
