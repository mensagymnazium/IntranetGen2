import axios from "axios";
import { getTokenByScope } from "./../helpers/TokenHelper";

const baseUrl = "https://localhost:5001/";

export async function authenticatedApi(scope) {
  const token = await getTokenByScope(scope);
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json"
    }
  });
}

export async function downloadAuthenticatedApi(scope) {
  const token = await getTokenByScope(scope);
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      responseType: "blob"
    }
  });
}

export async function uploadAuthenticatedApi(scope) {
  const token = await getTokenByScope(scope);
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "content-type": "multipart/form-data"
    }
  });
}
