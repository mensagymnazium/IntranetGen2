import { authenticatedApi } from "./ApiBase";

export async function getAllSubjects(token) {
  return await authenticatedApi(token).get("/api/subject");
}
