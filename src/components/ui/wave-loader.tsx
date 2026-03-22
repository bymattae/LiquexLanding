import { cva } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'

import { cn } from '@/lib/utils'

const waveLoaderVariants = cva('flex items-center justify-center gap-2', {
  variants: {
    messagePlacement: {
      bottom: 'flex-col',
      right: 'flex-row',
      left: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    messagePlacement: 'bottom',
  },
})

export interface WaveLoaderProps {
  bars?: number
  message?: string
  messagePlacement?: 'bottom' | 'left' | 'right'
}

export function WaveLoader({
  bars = 5,
  message,
  messagePlacement,
  className,
  ...props
}: HTMLMotionProps<'div'> & WaveLoaderProps) {
  return (
    <div className={cn(waveLoaderVariants({ messagePlacement }))}>
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: bars }).map((_, index) => (
          <motion.div
            key={index}
            className={cn('h-5 w-2 origin-bottom bg-foreground', className)}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.1,
            }}
            {...props}
          />
        ))}
      </div>
      {message ? <div>{message}</div> : null}
    </div>
  )
}
