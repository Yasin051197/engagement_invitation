import { useEffect, useRef, useState } from 'react'
import type { InvitationData } from '../data/invitationData'
import { CrescentStarIcon, FloralFlourish } from './decorations/Icons'

interface EnvelopeIntroProps {
  data: InvitationData
  /** Begin revealing the page underneath (call as the cover starts to fade). */
  onReveal: () => void
  /** The cover has fully faded out and should now unmount. */
  onDone: () => void
}

/**
 * A sealed envelope cover. On tap, the flap lifts open and the letter slides
 * up out of the pocket to present the couple's names, then the whole cover
 * fades away to reveal the invitation. The cover is fully opaque the entire
 * time, so none of the page content shows through while it opens.
 * Skipped under prefers-reduced-motion (see InvitationPage).
 */
export function EnvelopeIntro({ data, onReveal, onDone }: EnvelopeIntroProps) {
  const [ready, setReady] = useState(false)
  const [opening, setOpening] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Trigger the entrance transition on the next frame after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    btnRef.current?.focus()
    return () => cancelAnimationFrame(id)
  }, [])

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    // Timeline is choreographed in enhancements.css (.intro.is-opening):
    // flap opens → letter lifts → cover fades. Start the page reveal as the
    // cover begins to fade so the two cross-fade, then unmount once it's gone.
    window.setTimeout(onReveal, 1700)
    window.setTimeout(onDone, 2500)
  }

  const className = ['intro', ready && 'is-ready', opening && 'is-opening']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      role="dialog"
      aria-modal="true"
      aria-label="Open the engagement invitation"
    >
      <div className="intro__backdrop" aria-hidden="true" />

      <div className="intro__content">
        <CrescentStarIcon className="intro__crescent" />
        <p className="intro__eyebrow">{data.eventTitle}</p>
        <p className="intro__hint">You are cordially invited</p>

        <div className="envelope" aria-hidden="true">
          {/* The letter that slides up out of the pocket */}
          <div className="envelope__letter">
            <p className="envelope__letter-eyebrow">With the blessings of Allah</p>
            <p className="envelope__names">
              {data.groomName} <span>&amp;</span> {data.brideName}
            </p>
            <FloralFlourish className="envelope__flourish" />
            <p className="envelope__date">{data.date}</p>
          </div>
          {/* Pocket front (hides the lower part of the letter) */}
          <div className="envelope__front" />
          {/* Triangular lid that lifts open */}
          <div className="envelope__flap">
            <span className="envelope__seal">
              <CrescentStarIcon className="envelope__seal-icon" />
            </span>
          </div>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="btn btn--primary intro__btn"
          onClick={handleOpen}
          aria-label="Open the invitation"
        >
          Open Invitation
        </button>
      </div>
    </div>
  )
}

export default EnvelopeIntro
