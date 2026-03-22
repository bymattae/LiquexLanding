import { PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type LogoCloudProps = React.ComponentProps<'div'>

const partnerLogos = [
  {
    src: '/VTMARKETS.png',
    alt: 'VT Markets',
    imgClassName: 'h-16 w-auto md:h-20',
  },
  {
    src: '/vantage (1).png',
    alt: 'Vantage',
    imgClassName: 'h-10 w-auto md:h-11',
  },
  {
    src: '/PUPRIME.png',
    alt: 'PU Prime',
    imgClassName: 'h-16 w-auto md:h-20',
  },
]

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        'relative grid grid-cols-1 border-x border-white/10 md:grid-cols-3',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 w-screen -translate-x-1/2 border-t border-white/10" />

      {partnerLogos.map((logo, index) => (
        <div
          key={logo.alt}
          className={cn(
            'relative flex min-h-[132px] items-center justify-center border-b border-white/10 bg-background px-8 py-10 md:min-h-[148px] md:px-10 md:py-12',
            index === 0 && 'border-r border-white/10 bg-white/[0.03]',
            index === 1 && 'md:border-r md:border-white/10',
            index === 2 && 'bg-white/[0.03]',
          )}
        >
          <img alt={logo.alt} className={cn('max-w-[230px] object-contain opacity-95', logo.imgClassName)} src={logo.src} />
          {index < partnerLogos.length - 1 ? (
            <PlusIcon className="absolute -bottom-[12.5px] -right-[12.5px] z-10 size-6 text-zinc-500" strokeWidth={1} />
          ) : null}
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-b border-white/10" />
    </div>
  )
}
