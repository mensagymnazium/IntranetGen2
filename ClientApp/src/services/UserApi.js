import { authenticatedApi } from "./ApiBase";

export async function insertOrUpdateUser(token, user) {
  return await authenticatedApi(token).put("/api/user", JSON.stringify(user));
}

export async function signUpSubject(token, id) {
  return await authenticatedApi(token).post(`/api/user/subject/${id}`);
}

export async function unSignUpSubject(token, id) {
  return await authenticatedApi(token).delete(`/api/user/subject/${id}`);
}

export async function getSignedSubjects(token) {
  return await authenticatedApi(token).get("/api/user/subjects/");
}
