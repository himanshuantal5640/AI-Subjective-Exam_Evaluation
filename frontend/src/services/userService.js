import API from "./api";

export const getProfile = () => API.get("/users/me");

export const updateProfile = (data) =>
  API.put("/users/update", data);

export const uploadProfileImage = (formData) =>
  API.post("/users/upload-image", formData);