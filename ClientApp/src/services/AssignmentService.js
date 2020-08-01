import { authenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];

export async function getAllAssignments() {
  let api = await authenticatedApi(scope);
  return await api.get("/api/assignment");
}
