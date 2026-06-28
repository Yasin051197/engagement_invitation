import type { InvitationData } from '../data/invitationData'
import { buildWhatsAppRsvpLink } from '../utils/links'
import { BismillahHeader } from './BismillahHeader'
import {
  LanternIcon,
  LocationIcon,
  WhatsAppIcon,
  CrescentStarIcon,
} from './decorations/Icons'

interface HeroProps {
  data: InvitationData
}

/** Soft Mughal (onion-ogee) arch outline used as the Bismillah niche. */
const ARCH_PATH =
  'M44 286 L44 150 C44 92 128 86 168 62 C190 49 196 30 200 16 C204 30 210 49 232 62 C272 86 356 92 356 150 L356 286 Z'

/**
 * Hero: Mughal-arch framed card with the Bismillah, greeting, couple names,
 * a shayari line, the date/time, and the two primary CTAs.
 * Entrance animations run on load via CSS (see .hero__* keyframes).
 */
export function HeroSection({ data }: HeroProps) {
  const whatsappRsvp = buildWhatsAppRsvpLink(data)

  return (
    <header className="hero" aria-labelledby="couple-heading">
      <div className="hero__card">
        <LanternIcon className="hero__lantern hero__lantern--left" />
        <LanternIcon className="hero__lantern hero__lantern--right" />

        <div className="hero__niche">
          <svg
            className="hero__niche-frame"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="heroJaali"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <path
                  className="hero__niche-jaali"
                  d="M10 1c4.5 4.5 4.5 8.5 0 13-4.5-4.5-4.5-8.5 0-13ZM1 10c4.5-4.5 8.5-4.5 13 0-4.5 4.5-8.5 4.5-13 0Z"
                />
              </pattern>
              <clipPath id="heroArchClip">
                <path d={ARCH_PATH} />
              </clipPath>
            </defs>
            <path className="hero__niche-fill" d={ARCH_PATH} />
            <g className="hero__niche-mesh" clipPath="url(#heroArchClip)">
              <rect x="0" y="0" width="400" height="300" fill="url(#heroJaali)" />
            </g>
            <path className="hero__niche-line" pathLength={1} d={ARCH_PATH} />
          </svg>

          <CrescentStarIcon className="hero__finial" aria-hidden="true" />

          <div className="hero__niche-body">
            <BismillahHeader
              arabic={data.bismillahArabic}
              english={data.bismillahEnglish}
            />
          </div>
        </div>

        <p className="hero__dua">“{data.duas[0]}”</p>

        <p className="hero__greeting">{data.greeting}</p>

        <p className="hero__title">{data.eventTitle}</p>
        <p className="hero__subtitle">{data.eventSubtitle}</p>

        <h1 id="couple-heading" className="hero__names">
          {data.groomName}
          <span className="hero__amp">&amp;</span>
          {data.brideName}
        </h1>

        <p className="hero__parents">Hosted with love by {data.hostedBy}</p>

        <p className="hero__shayari">“{data.shayariLines[0]}”</p>

        <div className="hero__datetime">
          <span className="hero__date">{data.date}</span>
          <span className="hero__time">{data.time}</span>
        </div>

        <div className="hero__cta btn-row">
          <a
            className="btn btn--primary"
            href={data.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View location of ${data.venueName} on the map`}
          >
            <LocationIcon className="btn__icon" />
            View Location
          </a>
          <a
            className="btn btn--gold"
            href={whatsappRsvp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSVP for the engagement ceremony on WhatsApp"
          >
            <WhatsAppIcon className="btn__icon" />
            RSVP on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
