import { create } from "zustand";
import * as api from "../api/eventsApi";
import { useProfilesStore } from "./useProfilesStore";

export const useEventsStore = create((set) => ({
  events: [],
  logs: [],

  fetchEvents: async () => {
    const profileId = useProfilesStore.getState().currentProfileId;
    if (!profileId) return;
    const events = await api.getEvents(profileId);
    set({ events });
  },

  createEvent: async (data) => {
    await api.createEvent(data);
    await useEventsStore.getState().fetchEvents();
  },

  updateEvent: async (id, data) => {
    await api.updateEvent(id, data);
    await useEventsStore.getState().fetchEvents();
  },

  fetchLogs: async (eventId) => {
    const logs = await api.getLogs(eventId);
    set({ logs });
  },

  deleteEvent: async (id) => {
    await api.deleteEvent(id);
    await useEventsStore.getState().fetchEvents();
  },
  
}));
