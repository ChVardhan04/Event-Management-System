import { useState, useEffect } from "react";
import { useProfilesStore } from "../../store/useProfilesStore";

export default function Navbar() {
  const {
    profiles,
    currentProfileId,
    setCurrentProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useProfilesStore();

  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const current = profiles.find((p) => p._id === currentProfileId);
    setEditName(current ? current.name : "");
  }, [currentProfileId, profiles]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    await createProfile(newName, "Asia/Kolkata");
    setNewName("");
  };

  const handleUpdate = async () => {
    if (!currentProfileId || !editName.trim()) return;
    await updateProfile(currentProfileId, editName);
  };

  const handleDelete = async () => {
    if (!currentProfileId) return;

    const ok = window.confirm(
      "Deleting a profile will remove it from all events. Continue?"
    );
    if (!ok) return;

    await deleteProfile(currentProfileId);
  };

  return (
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h4 className="mb-0">Event Management</h4>
        <small className="text-muted">
          Manage events across timezones
        </small>
      </div>

      <div style={{ width: 320 }}>
     
        <select
          className="form-select mb-2"
          value={currentProfileId}
          onChange={(e) => setCurrentProfile(e.target.value)}
        >
          <option value="">Select profile</option>
          {profiles.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        
        {currentProfileId && (
          <div className="input-group mb-2">
            <input
              className="form-control"
              placeholder="Edit profile name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}

        <div className="input-group">
          <input
            className="form-control"
            placeholder="New profile"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
          <button
            className="btn btn-outline-danger"
            disabled={!currentProfileId}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
