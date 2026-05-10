import { useEffect, useState } from 'react'
import DreamHero from './components/DreamHero'
import JournalPage from './components/JournalPage'

const getCurrentPath = () => window.location.pathname

export default function App() {
  const [path, setPath] = useState(getCurrentPath)
  const isJournalRoute = path === '/journal'

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath())

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleBackHome = () => {
    window.history.pushState({}, '', '/')
    setPath('/')
  }

  return (
    <main className="relative h-[100svh] w-full overflow-hidden">
      {isJournalRoute ? <JournalPage onBack={handleBackHome} /> : <DreamHero />}
    </main>
  )
}
