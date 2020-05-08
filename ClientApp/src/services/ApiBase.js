import axios from "axios";
import { getTokenByScope } from "./../helpers/TokenHelper";

export async function authenticatedApi(scope) {
  const token = await getTokenByScope(scope);
  return axios.create({
    baseURL: "https://localhost:5001/",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json"
    }
  });
}