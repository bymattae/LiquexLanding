import * as React from 'react'
import { DoorOpen, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { ProductIcon } from '@/components/ui/product-icon'
import { useTeaser } from '@/components/ui/teaser-context'
import { cn } from '@/lib/utils'

type DockItem = {
  id: string
  label: string
  icon: React.ReactNode
  to?: string
}

const dockItems: DockItem[] = [
  { id: 'home', icon: <Home size={20} />, label: 'Home', to: '/' },
  { id: 'affiliate', icon: <ProductIcon name="affiliate" size="sm" className="shadow-none" />, label: 'Affiliate OS', to: '/ibs' },
  { id: 'broker', icon: <ProductIcon name="broker" size="sm" className="shadow-none" />, label: 'Broker OS' },
  { id: 'creator', icon: <ProductIcon name="creator" size="sm" className="shadow-none" />, label: 'Creator OS' },
  { id: 'login', icon: <DoorOpen size={18} />, label: 'Login', to: 'https://app.liquex.co/auth' },
]

export function SiteDock() {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const location = useLocation()
  const { showTeaser } = useTeaser()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-3 sm:bottom-5 sm:px-4">
      <div className="relative pointer-events-auto">
        <div
          className={cn(
            'flex items-end gap-2 rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,15,18,0.86),rgba(10,10,12,0.74))] px-3 py-2 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.34)] transition-transform duration-300 ease-out before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:content-[\"\"] sm:gap-4 sm:rounded-[1.35rem] sm:px-5 sm:py-3',
            hoveredItem && 'scale-[1.03]',
          )}
        >
          {dockItems.map((item) => {
            const isActive = item.to ? location.pathname === item.to : false
            const isHovered = hoveredItem === item.id

            const itemClasses = cn(
              'relative flex h-9 w-9 items-center justify-center rounded-[0.8rem] border border-white/6 bg-white/[0.03] backdrop-blur-[2px] transition-all duration-300 ease-out sm:h-12 sm:w-12 sm:rounded-[1rem]',
              isActive && 'border-emerald-300/18 bg-emerald-300/10 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.12)]',
              isHovered
                ? 'scale-110 -translate-y-1 border-white/14 bg-white/[0.06]'
                : 'hover:scale-105 hover:-translate-y-0.5 hover:bg-white/[0.05]',
            )

            const content = (
              <>
                <div className={cn('text-white transition-all duration-300', isHovered && 'scale-105')}>
                  {item.icon}
                </div>
                {isActive ? <div className="absolute -bottom-1.5 h-1 w-4 rounded-full bg-emerald-300/85 shadow-[0_0_12px_rgba(110,231,183,0.55)]" /> : null}
                <div
                  className={cn(
                    'pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/5 bg-black/72 px-2 py-1 text-[11px] text-white/85 opacity-0 shadow-sm backdrop-blur transition-all duration-200 sm:block',
                    isHovered && 'translate-y-0 opacity-100',
                    !isHovered && 'translate-y-1',
                  )}
                >
                  {item.label}
                  <div className="absolute left-1/2 top-full -translate-x-1/2">
                    <div className="h-2 w-2 rotate-45 border-b border-r border-white/5 bg-black/70" />
                  </div>
                </div>
              </>
            )

            const sharedProps = {
              className: itemClasses,
              onMouseEnter: () => setHoveredItem(item.id),
              onMouseLeave: () => setHoveredItem(null),
            }

            if (item.to) {
              const isExternal = item.to.startsWith('http')

              if (isExternal) {
                return (
                  <a key={item.id} href={item.to} aria-label={item.label} {...sharedProps}>
                    {content}
                  </a>
                )
              }

              return (
                <Link key={item.id} to={item.to} aria-label={item.label} {...sharedProps}>
                  {content}
                </Link>
              )
            }

            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => showTeaser("We're working on something cool 👀")}
                {...sharedProps}
              >
                {content}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
