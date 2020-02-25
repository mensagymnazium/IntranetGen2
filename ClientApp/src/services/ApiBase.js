import axios from "axios";

export const authenticatedApi = token => {
  return axios.create({
    baseURL: "https://localhost:44392/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
