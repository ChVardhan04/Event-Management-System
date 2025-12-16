import axios from "./axiosInstance";

export const getEvents = async (profileId) => {
  const { data } = await axios.get(`/events?profileId=${profileId}`);
  return data;
};

export const createEvent = async (payload) => {
  const { data } = await axios.post("/events", payload);
  return data;
};

export const updateEvent = async (id, payload) => {
  const { data } = await axios.put(`/events/${id}`, payload);
  return data;
};

export const getLogs = async (id) => {
  const { data } = await axios.get(`/events/${id}/logs`);
  return data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`/events/${id}`);
  return res.data;
};