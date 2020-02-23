import axios from "axios";

// a simple class wrapper around the API service.
class Api {
  constructor(token) {
    if (!token) {
      throw new Error("the auth token was not provided");
    }

    const apiUrl = "https://localhost:44392/";

    this.AuthenticatedApi = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  }

  // the authenticated api
  AuthenticatedApi;
}

export default Api;
