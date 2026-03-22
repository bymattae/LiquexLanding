import { Outlet, useLocation } from 'react-router-dom'

import AnoAIBackground from '@/components/ui/ano-ai-background'
import { SiteDock } from '@/components/ui/site-dock'
import { TeaserProvider } from '@/components/ui/teaser-context'
import { TopBar } from '@/components/ui/top-bar'
import { cn } from '@/lib/utils'

export function AppShell() {
  const location = useLocation()
  const isIBs = location.pathname === '/affiliateos'

  return (
    <main className={cn('relative min-h-screen overflow-hidden text-white', isIBs && 'theme-ibs')}>
      <AnoAIBackground variant={isIBs ? 'ibs' : 'home'} />

      <TeaserProvider>
        <div className="relative z-10 min-h-screen">
          <TopBar />
          <div className="relative min-h-[calc(100vh-3.5rem)]">
            <Outlet />
          </div>

          <SiteDock />
        </div>
      </TeaserProvider>
    </main>
  )
}
