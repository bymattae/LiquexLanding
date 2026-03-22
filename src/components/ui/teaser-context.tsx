import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useContext, useMemo, useState } from 'react'

type TeaserContextValue = {
  showTeaser: (label?: string) => void
}

const TeaserContext = createContext<TeaserContextValue | null>(null)

export function TeaserProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      showTeaser: (label?: string) => {
        setMessage(label ?? "We're working on something cool")
        window.clearTimeout((window as Window & { __liquexTeaserTimeout?: number }).__liquexTeaserTimeout)
        ;(window as Window & { __liquexTeaserTimeout?: number }).__liquexTeaserTimeout = window.setTimeout(() => {
          setMessage(null)
        }, 2200)
      },
    }),
    [],
  )

  return (
    <TeaserContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {message ? (
          <motion.div
            className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(10,10,12,0.92)] px-4 py-2.5 text-sm text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <motion.span
                className="text-base"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              >
                👀
              </motion.span>
              <span className="text-white/88">{message}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TeaserContext.Provider>
  )
}

export function useTeaser() {
  const context = useContext(TeaserContext)

  if (!context) {
    throw new Error('useTeaser must be used within a TeaserProvider')
  }

  return context
}
