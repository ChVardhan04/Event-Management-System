import { useEffect } from "react";
import { useProfilesStore } from "./store/useProfilesStore";
import Navbar from "./components/layout/Navbar";
import CreateEventForm from "./components/events/CreateEventForm";
import EventList from "./components/events/EventList";

export default function App() {
  const fetchProfiles = useProfilesStore((s) => s.fetchProfiles);

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="container py-4">
      <Navbar />

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3">
            <CreateEventForm />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
}
