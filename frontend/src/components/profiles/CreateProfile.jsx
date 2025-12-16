import { useState } from "react";
import { useProfilesStore } from "../../store/useProfilesStore";
import { allTimezones } from "../../utils/timezones";

export default function CreateProfile() {
  const createProfile = useProfilesStore((s) => s.createProfile);
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const submit = () => {
    if (!name) return;
    createProfile(name, timezone);
    setName("");
  };

  return (
    <div>
      <input
        placeholder="Profile name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        {allTimezones.map((tz) => (
          <option key={tz}>{tz}</option>
        ))}
      </select>

      <button onClick={submit}>Create</button>
    </div>
  );
}
