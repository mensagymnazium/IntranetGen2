import { authenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];

export async function getAllSubjects() {
  let api = await authenticatedApi(scope);
  return await api.get("/api/subject");
}

export async function insertSubject(subject) {
  let api = await authenticatedApi(scope);
  return await api.post("/api/subject", JSON.stringify(subject));
}

export async function deleteSubject(id) {
  let api = await authenticatedApi(scope);
  return await api.delete(`/api/subject/${id}`);
}

export async function updateSubject(id, subject) {
  let api = await authenticatedApi(scope);
  return await api.put(`/api/subject/${id}`, JSON.stringify(subject));
}
