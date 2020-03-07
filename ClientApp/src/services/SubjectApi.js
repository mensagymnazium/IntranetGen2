import { authenticatedApi } from "./ApiBase";

export async function getAllSubjects(token) {
  return await authenticatedApi(token).get("/api/subject");
}

export async function insertSubject(token, subject) {
  return await authenticatedApi(token).post(
    "/api/subject",
    JSON.stringify(subject)
  );
}

export async function deleteSubject(token, id) {
  return await authenticatedApi(token).delete(`/api/subject/${id}`);
}

export async function updateSubject(token, id, subject) {
  return await authenticatedApi(token).put(
    `/api/subject/${id}`,
    JSON.stringify(subject)
  );
}
