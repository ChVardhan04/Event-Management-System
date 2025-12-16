import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import { useEventsStore } from "../../store/useEventsStore";
import { useProfilesStore } from "../../store/useProfilesStore";

dayjs.extend(utc);
dayjs.extend(tz);

const TIMEZONES = [
  { label: "India (IST)", value: "Asia/Kolkata" },
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "London (GMT)", value: "Europe/London" },
];

export default function EditEventModal({ event, onClose }) {
  const updateEvent = useEventsStore((s) => s.updateEvent);
  const { profiles } = useProfilesStore();

  const [profileIds, setProfileIds] = useState(
    event.profiles.map((p) => p._id)
  );

  const [timezone, setTimezone] = useState(event.timezone);

  const [startLocal, setStartLocal] = useState(
    dayjs.utc(event.startUtc).tz(event.timezone).format("YYYY-MM-DDTHH:mm")
  );

  const [endLocal, setEndLocal] = useState(
    dayjs.utc(event.endUtc).tz(event.timezone).format("YYYY-MM-DDTHH:mm")
  );

  const submit = async () => {
    await updateEvent(event._id, {
      profileIds,
      timezone,
      startLocal,
      endLocal,
    });
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Profiles</label>
            <select
              multiple
              className="form-select mb-3"
              value={profileIds}
              onChange={(e) =>
                setProfileIds(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
            >
              {profiles.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <label className="form-label">Timezone</label>
            <select
              className="form-select mb-3"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {TIMEZONES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <label className="form-label">Start</label>
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={startLocal}
              onChange={(e) => setStartLocal(e.target.value)}
            />

            <label className="form-label">End</label>
            <input
              type="datetime-local"
              className="form-control"
              value={endLocal}
              onChange={(e) => setEndLocal(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit}>
              Update Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
