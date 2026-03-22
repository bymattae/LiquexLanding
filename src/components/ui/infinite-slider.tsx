import * as React from 'react'

import { cn } from '@/lib/utils'

type InfiniteSliderProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
  gap?: number
  reverse?: boolean
  speed?: number
  speedOnHover?: number
}

export function InfiniteSlider({
  children,
  className,
  gap = 42,
  reverse = false,
  speed = 80,
  speedOnHover,
  ...props
}: InfiniteSliderProps) {
  const sliderStyle = {
    '--duration': `${speed}s`,
    '--hover-duration': `${speedOnHover ?? speed}s`,
    gap: `${gap}px`,
  } as React.CSSProperties

  return (
    <div className={cn('relative flex w-full overflow-hidden py-4', className)} {...props}>
      <div
        className={cn(
          'flex w-max min-w-max items-center',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          speedOnHover && 'hover:[animation-duration:var(--hover-duration)]',
        )}
        style={sliderStyle}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex min-w-max items-center" style={{ gap: `${gap}px` } as React.CSSProperties}>
            {React.Children.map(children, (child, index) => (
              <div key={`${copy}-${index}`}>{child}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
