import { useEffect, useState } from "react";
import { useProfilesStore } from "../../store/useProfilesStore";
import { useEventsStore } from "../../store/useEventsStore";

const TIMEZONES = [
  { label: "India (IST)", value: "Asia/Kolkata" },
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "London (GMT)", value: "Europe/London" },
];

export default function CreateEventForm() {
  const { profiles, currentProfileId } = useProfilesStore();
  const createEvent = useEventsStore((s) => s.createEvent);

  const [profileIds, setProfileIds] = useState([]);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [startLocal, setStartLocal] = useState("");
  const [endLocal, setEndLocal] = useState("");


  useEffect(() => {
    if (currentProfileId) {
      setProfileIds([currentProfileId]);
    }
  }, [currentProfileId]);

  const submit = async () => {
    if (!profileIds.length || !startLocal || !endLocal) {
      alert("Fill all fields");
      return;
    }

    await createEvent({
      profileIds,
      timezone,
      startLocal,
      endLocal,
    });

    setStartLocal("");
    setEndLocal("");
  };

  return (
    <div className="card p-3">
      <h5>Create Event</h5>

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


      <label className="form-label">Start Date & Time</label>
      <input
        type="datetime-local"
        className="form-control mb-3"
        value={startLocal}
        onChange={(e) => setStartLocal(e.target.value)}
      />


      <label className="form-label">End Date & Time</label>
      <input
        type="datetime-local"
        className="form-control mb-3"
        value={endLocal}
        onChange={(e) => setEndLocal(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={submit}>
        Create Event
      </button>
    </div>
  );
}
