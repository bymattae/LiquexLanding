const homeStreaks = [
  { top: '6%', left: '-8%', width: 240, delay: '0s', duration: '8s', color: 'from-violet-500 via-blue-400 to-transparent', opacity: '0.95' },
  { top: '12%', left: '8%', width: 180, delay: '1.2s', duration: '9s', color: 'from-blue-400 via-cyan-300 to-transparent', opacity: '0.8' },
  { top: '18%', left: '26%', width: 210, delay: '2.4s', duration: '10s', color: 'from-indigo-500 via-blue-500 to-transparent', opacity: '0.75' },
  { top: '10%', left: '72%', width: 260, delay: '0.4s', duration: '8.5s', color: 'from-violet-500 via-indigo-400 to-transparent', opacity: '0.95' },
  { top: '28%', left: '-4%', width: 320, delay: '3.1s', duration: '11s', color: 'from-violet-600 via-blue-500 to-transparent', opacity: '0.9' },
  { top: '36%', left: '12%', width: 220, delay: '1.8s', duration: '9.5s', color: 'from-blue-400 via-cyan-300 to-transparent', opacity: '0.78' },
  { top: '52%', left: '58%', width: 290, delay: '2.7s', duration: '10.5s', color: 'from-violet-500 via-indigo-500 to-transparent', opacity: '0.82' },
  { top: '70%', left: '-10%', width: 260, delay: '0.9s', duration: '8.8s', color: 'from-violet-500 via-blue-400 to-transparent', opacity: '0.92' },
  { top: '84%', left: '18%', width: 230, delay: '3.6s', duration: '9.2s', color: 'from-indigo-500 via-blue-400 to-transparent', opacity: '0.72' },
  { top: '78%', left: '70%', width: 280, delay: '1.4s', duration: '10.8s', color: 'from-violet-600 via-indigo-500 to-transparent', opacity: '0.68' },
]

const ibsStreaks = [
  { top: '8%', left: '-6%', width: 220, delay: '0.5s', duration: '12s', color: 'from-emerald-300/30 via-blue-400/55 to-transparent', opacity: '0.45' },
  { top: '18%', left: '12%', width: 160, delay: '2.2s', duration: '13s', color: 'from-blue-400/45 via-cyan-300/50 to-transparent', opacity: '0.38' },
  { top: '14%', left: '74%', width: 230, delay: '1.1s', duration: '11.5s', color: 'from-violet-400/40 via-blue-400/48 to-transparent', opacity: '0.4' },
  { top: '52%', left: '58%', width: 250, delay: '3.2s', duration: '14s', color: 'from-emerald-200/24 via-blue-400/35 to-transparent', opacity: '0.34' },
  { top: '74%', left: '-8%', width: 230, delay: '1.8s', duration: '12.5s', color: 'from-blue-300/40 via-cyan-200/45 to-transparent', opacity: '0.36' },
  { top: '80%', left: '72%', width: 240, delay: '2.9s', duration: '13.5s', color: 'from-emerald-300/22 via-violet-400/26 to-transparent', opacity: '0.28' },
]

export default function AnoAIBackground({ variant = 'home' }: { variant?: 'home' | 'ibs' }) {
  const streaks = variant === 'ibs' ? ibsStreaks : homeStreaks
  const beamShadow =
    variant === 'ibs'
      ? '0 0 10px rgba(110,231,183,0.14), 0 0 24px rgba(59,130,246,0.12)'
      : '0 0 12px rgba(99,102,241,0.45), 0 0 28px rgba(59,130,246,0.22)'

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      {streaks.map((streak, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: streak.top,
            left: streak.left,
            animationDelay: streak.delay,
            animationDuration: streak.duration,
          }}
        >
          <div
            className={`animate-[meteor_9s_linear_infinite] h-[2px] rounded-full bg-gradient-to-r ${streak.color}`}
            style={{
              width: `${streak.width}px`,
              opacity: streak.opacity,
              transform: 'rotate(32deg)',
              boxShadow: beamShadow,
            }}
          />
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 rounded-full bg-white/70 blur-sm animate-[meteor_9s_linear_infinite]"
            style={{
              width: `${Math.max(36, Math.floor(streak.width * 0.16))}px`,
              animationDelay: streak.delay,
              animationDuration: streak.duration,
              transform: 'rotate(32deg)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
