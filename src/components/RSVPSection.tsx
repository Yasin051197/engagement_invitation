import type { InvitationData } from "../data/invitationData";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { buildWhatsAppRsvpLink, buildTelLink } from "../utils/links";
import { WhatsAppIcon, PhoneIcon } from "./decorations/Icons";

interface RSVPSectionProps {
  data: InvitationData;
}

/** RSVP panel: WhatsApp with a pre-filled message, plus a tap-to-call button. */
export function RSVPSection({ data }: RSVPSectionProps) {
  const whatsappLink = buildWhatsAppRsvpLink(data);
  const telLink = buildTelLink(data.rsvpPhone);

  return (
    <section className="section" aria-labelledby="rsvp-heading">
      <div className="container">
        <SectionTitle kicker="Kindly Respond" heading="RSVP" headingId="rsvp-heading" />

        <Reveal className="panel">
          <p className="panel__lead">Your confirmation helps us welcome you warmly, In Sha Allah.</p>
          <p className="panel__contact">
            Please RSVP to <strong>{data.rsvpName}</strong>
            <br />
            <strong>{data.rsvpPhone}</strong>
          </p>

          <div className="btn-row">
            <a
              className="btn btn--primary"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Send an RSVP message to ${data.rsvpName} on WhatsApp`}
            >
              <WhatsAppIcon className="btn__icon" />
              RSVP on WhatsApp
            </a>
            <a
              className="btn btn--ghost"
              href={telLink}
              aria-label={`Call ${data.rsvpName} at ${data.rsvpPhone}`}
            >
              <PhoneIcon className="btn__icon" />
              Call to Confirm
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default RSVPSection;
