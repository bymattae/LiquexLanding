import * as React from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div className={cn('z-10 mt-10 w-full overflow-hidden sm:mt-24', className)} {...props}>
      <div className="relative flex w-full overflow-hidden py-5">
        <div
          className={cn(
            'flex w-max min-w-max animate-marquee gap-16 sm:gap-20',
            pauseOnHover && 'hover:[animation-play-state:paused]',
            direction === 'right' && 'animate-marquee-reverse',
          )}
          style={{ '--duration': `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}
