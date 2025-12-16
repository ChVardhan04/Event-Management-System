import axios from "./axiosInstance";

export const getProfiles = async () => {
  const res = await axios.get("/profiles");
  return res.data;
};

export const createProfile = async (data) => {
  const res = await axios.post("/profiles", data);
  return res.data;
};

export const updateProfile = async (id, data) => {
  const res = await axios.put(`/profiles/${id}`, data);
  return res.data;
};

export const deleteProfile = async (id) => {
  const res = await axios.delete(`/profiles/${id}`);
  return res.data;
};
