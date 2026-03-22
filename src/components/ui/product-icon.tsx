import { Building2, Clapperboard, Handshake } from 'lucide-react'

import { cn } from '@/lib/utils'

type ProductIconName = 'affiliate' | 'broker' | 'creator'
type ProductIconSize = 'sm' | 'md' | 'lg'

const accentClasses: Record<ProductIconName, string> = {
  affiliate: 'from-emerald-300 to-green-500',
  broker: 'from-sky-300 to-blue-500',
  creator: 'from-violet-300 to-fuchsia-500',
}

const sizeClasses: Record<ProductIconSize, string> = {
  sm: 'h-10 w-10 rounded-[0.8rem]',
  md: 'h-14 w-14 rounded-[0.95rem] sm:h-[76px] sm:w-[76px] sm:rounded-[1.3rem]',
  lg: 'h-[76px] w-[76px] rounded-[1.3rem]',
}

const iconSizes: Record<ProductIconSize, string> = {
  sm: 'size-[18px]',
  md: 'size-7 sm:size-8',
  lg: 'size-8',
}

const iconByName = {
  affiliate: Handshake,
  broker: Building2,
  creator: Clapperboard,
} as const

export function ProductIcon({
  name,
  size = 'md',
  className,
}: {
  name: ProductIconName
  size?: ProductIconSize
  className?: string
}) {
  const Icon = iconByName[name]

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br ring-1 ring-white/18 shadow-[0_20px_40px_rgba(0,0,0,0.24)]',
        sizeClasses[size],
        accentClasses[name],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.30),transparent_42%)] opacity-80" />
      <div className="absolute inset-[1px] rounded-[inherit] border border-white/12" />
      <Icon className={cn('relative z-10 text-white drop-shadow-[0_1px_6px_rgba(255,255,255,0.18)]', iconSizes[size])} strokeWidth={2.1} />
    </div>
  )
}
