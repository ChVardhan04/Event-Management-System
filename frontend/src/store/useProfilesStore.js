import { create } from "zustand";
import * as api from "../api/profilesApi";

export const useProfilesStore = create((set) => ({
  profiles: [],
  currentProfileId: "",

  fetchProfiles: async () => {
    const profiles = await api.getProfiles();
    set({ profiles });
  },

  createProfile: async (name, timezone) => {
    const profile = await api.createProfile({ name, timezone });
    set((s) => ({
      profiles: [...s.profiles, profile],
      currentProfileId: profile._id,
    }));
  },

  updateProfile: async (id, name) => {
    const updated = await api.updateProfile(id, { name });
    set((s) => ({
      profiles: s.profiles.map((p) =>
        p._id === id ? updated : p
      ),
    }));
  },

  deleteProfile: async (id) => {
    await api.deleteProfile(id);
    set((s) => ({
      profiles: s.profiles.filter((p) => p._id !== id),
      currentProfileId: "",
    }));
  },

  setCurrentProfile: (id) => set({ currentProfileId: id }),
}));
