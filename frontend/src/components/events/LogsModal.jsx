import { useEffect } from "react";
import { useEventsStore } from "../../store/useEventsStore";
import dayjs from "dayjs";

export default function LogsModal({ eventId, onClose }) {
  const { logs, fetchLogs } = useEventsStore();

  useEffect(() => {
    fetchLogs(eventId);
  }, []);

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Event Update History</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {logs.length === 0 && (
              <div className="text-muted text-center">
                No update history yet
              </div>
            )}

            {logs.map((log) => (
              <div key={log._id} className="border rounded p-3 mb-3">
                <small className="text-muted">
                  {dayjs(log.createdAtUtc).format("MMM DD, YYYY hh:mm A")}
                </small>

                {Object.entries(log.changes).map(([key, val]) => (
                  <div key={key}>
                    <strong>{key}</strong>: {String(val.before)} →{" "}
                    {String(val.after)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
