import { authenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];

export async function insertOrUpdateUser(user) {
  let api = await authenticatedApi(scope);
  return await api.put("/api/user", JSON.stringify(user));
}

export async function signUpSubject(id) {
  let api = await authenticatedApi(scope);
  return await api.post(`/api/user/subject/${id}`);
}

export async function unSignUpSubject(id) {
  let api = await authenticatedApi(scope);
  return await api.delete(`/api/user/subject/${id}`);
}

export async function getSignedSubjects() {
  let api = await authenticatedApi(scope);
  return await api.get("/api/user/subjects/");
}
