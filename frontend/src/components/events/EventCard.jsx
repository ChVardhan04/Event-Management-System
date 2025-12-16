import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import EditEventModal from "./EditEventModal";
import LogsModal from "./LogsModal";
import { useEventsStore } from "../../store/useEventsStore";

dayjs.extend(utc);
dayjs.extend(tz);

export default function EventCard({ event, viewTimezone }) {
  const deleteEvent = useEventsStore((s) => s.deleteEvent);

  const [showEdit, setShowEdit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const start = dayjs
    .utc(event.startUtc)
    .tz(viewTimezone)
    .format("MMM DD, YYYY hh:mm A");

  const end = dayjs
    .utc(event.endUtc)
    .tz(viewTimezone)
    .format("MMM DD, YYYY hh:mm A");

  const createdAt = dayjs
    .utc(event.createdAtUtc)
    .tz(viewTimezone)
    .format("MMM DD, YYYY hh:mm A");

  const updatedAt = dayjs
    .utc(event.updatedAtUtc)
    .tz(viewTimezone)
    .format("MMM DD, YYYY hh:mm A");

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;
    await deleteEvent(event._id);
  };

  return (
    <>
      <div className="border rounded p-3 mb-3">
    
        <div className="mb-2">
          <strong>
            {event.profiles.map((p) => p.name).join(", ")}
          </strong>
        </div>

        
        <div className="mb-1">
          <small className="text-muted">Start:</small> {start}
        </div>
        <div className="mb-2">
          <small className="text-muted">End:</small> {end}
        </div>

      
        <div className="text-muted small mb-3">
          Created: {createdAt} <br />
          Updated: {updatedAt}
        </div>


        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowLogs(true)}
          >
            View Logs
          </button>

          <button
            className="btn btn-outline-danger btn-sm ms-auto"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {showEdit && (
        <EditEventModal
          event={event}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showLogs && (
        <LogsModal
          eventId={event._id}
          onClose={() => setShowLogs(false)}
        />
      )}
    </>
  );
}
