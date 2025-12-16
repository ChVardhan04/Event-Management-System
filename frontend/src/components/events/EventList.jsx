import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import { useEventsStore } from "../../store/useEventsStore";
import { useProfilesStore } from "../../store/useProfilesStore";
import EventCard from "./EventCard";

dayjs.extend(utc);
dayjs.extend(tz);

export default function EventList() {
  const { events, fetchEvents } = useEventsStore();
  const { currentProfileId } = useProfilesStore();

  const [viewTimezone, setViewTimezone] = useState("Asia/Kolkata");

  useEffect(() => {
    if (currentProfileId) {
      fetchEvents();
    }
  }, [currentProfileId]);

  if (!currentProfileId) {
    return (
      <div className="card p-3 text-muted">
        Select a profile to view events
      </div>
    );
  }

  return (
    <div className="card p-3">
      <h5 className="mb-3">Events</h5>

     
      <label className="form-label">View in Timezone</label>
      <select
        className="form-select mb-3"
        value={viewTimezone}
        onChange={(e) => setViewTimezone(e.target.value)}
      >
        <option value="Asia/Kolkata">India (IST)</option>
        <option value="America/New_York">Eastern Time (ET)</option>
        <option value="Europe/London">London (GMT)</option>
      </select>

      {events.length === 0 && (
        <div className="text-muted text-center mt-4">
          No events found
        </div>
      )}

      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          viewTimezone={viewTimezone}
        />
      ))}
    </div>
  );
}
