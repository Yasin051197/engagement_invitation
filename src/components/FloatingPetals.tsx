import { useMemo } from 'react'
import { PetalShape } from './decorations/Icons'

interface FloatingPetalsProps {
  /** Number of petals (kept low for mobile performance). Default 14. */
  count?: number
}

/** Rose, blush and jasmine-white petal tones, cycled for a natural mix. */
const PETAL_COLORS = [
  'var(--color-babypink)',
  'var(--color-rosegold-soft)',
  '#fff6ef', // soft jasmine white
]

/**
 * A fixed, decorative layer of slowly falling rose petals.
 * Purely cosmetic and aria-hidden. Hidden entirely under prefers-reduced-motion
 * (see .petals rule in global.css) so it never harms performance/accessibility.
 */
export function FloatingPetals({ count = 14 }: FloatingPetalsProps) {
  // Deterministic, evenly-spread petal configs (no Math.random — keeps SSR/build safe).
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = ((i * 8.3) % 96) + 2
      const size = 10 + ((i * 5) % 12)
      const duration = 13 + ((i * 3) % 9)
      const delay = -((i * 2.4) % 14)
      const drift = (i % 2 === 0 ? 1 : -1) * (14 + ((i * 7) % 26))
      const opacity = 0.45 + ((i % 4) * 0.12)
      return { left, size, duration, delay, drift, opacity }
    })
  }, [count])

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <PetalShape
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            color: PETAL_COLORS[i % PETAL_COLORS.length],
            opacity: p.opacity,
            filter: i % 4 === 0 ? 'blur(0.4px)' : undefined,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // Custom property consumed by the petalFall keyframes for horizontal drift.
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingPetals
