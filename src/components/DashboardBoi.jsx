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
    <section className='relative h-screen overflow-y-auto overflow-x-hidden bg-black text-zinc-100'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]'
      />
      <div className='relative mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8'>
        <motion.section
          className='rounded-[1.6rem] border border-white/8 bg-[#090909] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:p-5'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotionBoi ? 0 : 0.35, ease: 'easeOut' }}
        >
          <div className='grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
            <div className='rounded-[1.4rem] border border-white/8 bg-[#0d0d0d] p-5 sm:p-6'>
              <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {metricCardsBoi.map((stat) => (
                  <div key={stat.label} className='rounded-[1.1rem] border border-white/8 bg-[#111111] p-4'>
                    <div className='text-[0.61rem] uppercase tracking-[0.24em] text-zinc-500'>{stat.label}</div>
                    <div className='mt-3 text-[1.9rem] font-semibold leading-none text-zinc-100'>{stat.value}</div>
                    <p className='mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500'>{stat.note}</p>
                  </div>
                ))}
              </div>

              <div className='mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                {controlCardsBoi.map((control) => (
                  <div key={control.label} className='rounded-[1.1rem] border border-white/8 bg-[#111111] p-4'>
                    <div className='text-[0.61rem] uppercase tracking-[0.24em] text-zinc-500'>{control.label}</div>
                    <div className='mt-3 text-[1.7rem] font-medium text-zinc-100'>{control.value}</div>
                    <div className='mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500'>{control.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[1.4rem] border border-white/8 bg-[#0d0d0d] p-5 sm:p-6'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='text-[0.61rem] uppercase tracking-[0.26em] text-zinc-500'>notifications</div>
                  <div className='rounded-full border border-white/8 bg-[#111111] px-3 py-2 text-[0.61rem] uppercase tracking-[0.22em] text-zinc-500'>
                    {feedStateBoi}
                  </div>
                </div>
                <div className='mt-4 grid gap-3'>
                  {visibleNotificationsBoi.map((notice) => (
                    <div key={notice.id} className='rounded-[1.1rem] border border-white/8 bg-[#111111] p-4'>
                      <div className='text-[0.61rem] uppercase tracking-[0.24em] text-zinc-500'>{notice.kind}</div>
                      <div className='mt-2 text-base font-medium text-zinc-100'>{notice.title}</div>
                      <p className='mt-2 text-sm leading-6 text-zinc-400'>{notice.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='rounded-[1.4rem] border border-white/8 bg-[#0d0d0d] p-5 sm:p-6'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='text-[0.61rem] uppercase tracking-[0.26em] text-zinc-500'>order history</div>
                  <div className='text-[0.61rem] uppercase tracking-[0.22em] text-zinc-500'>repo decision log / fills</div>
                </div>
                <div className='mt-4 space-y-3'>
                  <AnimatePresence initial={false}>
                    {orderHistoryBoi.map((entry) => (
                      <motion.article
                        key={entry.id}
                        className='rounded-[1.1rem] border border-white/8 bg-[#111111] p-4'
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: shouldReduceMotionBoi ? 0 : 0.2, ease: 'easeOut' }}
                      >
                        <div className='flex flex-wrap items-start justify-between gap-3'>
                          <div>
                            <div className='text-[0.61rem] uppercase tracking-[0.24em] text-zinc-500'>fill / decision</div>
                            <h3 className='mt-2 text-sm font-medium text-zinc-100'>{entry.title}</h3>
                          </div>
                          <div className='text-right text-[0.61rem] uppercase tracking-[0.22em] text-zinc-500'>
                            <div>{entry.meta}</div>
                            <div className='mt-1 text-zinc-400'>{entry.time}</div>
                          </div>
                        </div>
                        <p className='mt-3 text-sm leading-6 text-zinc-400'>{entry.detail}</p>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  )
}
