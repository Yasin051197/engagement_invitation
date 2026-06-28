import type { InvitationData } from "../data/invitationData";
import { Reveal } from "./Reveal";
import { buildGoogleCalendarLink } from "../utils/links";
import { CalendarPlusIcon } from "./decorations/Icons";

interface AddToCalendarProps {
  data: InvitationData;
}

/** Compact card with a Google Calendar "add event" link built from the data. */
export function AddToCalendar({ data }: AddToCalendarProps) {
  const calendarLink = buildGoogleCalendarLink(data);

  return (
    <Reveal className="panel" delay={2}>
      <p className="panel__lead">{data.date}</p>
      <p className="panel__contact">{data.time}</p>
      <div className="btn-row">
        <a
          className="btn btn--gold"
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Add the engagement ceremony to your Google Calendar"
        >
          <CalendarPlusIcon className="btn__icon" />
          Add to Calendar
        </a>
      </div>
    </Reveal>
  );
}

export default AddToCalendar;
