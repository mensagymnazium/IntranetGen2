import { authenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];

export async function getAllAssignments() {
  let api = await authenticatedApi(scope);
  return await api.get("/api/assignment");
}

export async function insertOrUpdateAssignment(assignment) {
  let api = await authenticatedApi(scope);
  return await api.put("/api/assignment", JSON.stringify(assignment));
}

export async function deleteAssignment(id) {
  let api = await authenticatedApi(scope);
  return await api.delete(`/api/assignment/${id}`);
}
