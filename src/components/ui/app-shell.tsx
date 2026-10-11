import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { Footer, Header } from '@/components/site/chrome'

const ease = [0.16, 1, 0.3, 1] as const

/** Glide to a #section once it exists on the page. */
function scrollToHash(hash: string, smooth = true) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  return !!el
}

export function AppShell() {
  const location = useLocation()
  const outlet = useOutlet()
  const prevPath = useRef(location.pathname)

  // Same page clicked again: glide to the #section asked for, or back to the top.
  useEffect(() => {
    if (prevPath.current === location.pathname) {
      if (!(location.hash && scrollToHash(location.hash))) window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    prevPath.current = location.pathname
  }, [location.key]) // eslint-disable-line react-hooks/exhaustive-deps

  // New page: once the old one has faded out, start at the top — or at the #section asked for.
  const onSwap = () => {
    if (location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      setTimeout(() => scrollToHash(location.hash), 120)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }

  return (
    <main className="theme-ibs relative min-h-screen overflow-hidden bg-black text-white">
      <div className="relative z-10 min-h-screen">
        <Header />
        <AnimatePresence mode="wait" initial={false} onExitComplete={onSwap}>
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease } }} exit={{ opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }}>
            {outlet}
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
