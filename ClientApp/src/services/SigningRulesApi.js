import { authenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];

export async function getAllSigningRules() {
  let api = await authenticatedApi(scope);
  return await api.get("/api/signingRules");
}

export async function insertSigningRule(signingRule) {
  let api = await authenticatedApi(scope);
  return await api.post("/api/signingRules", JSON.stringify(signingRule));
}

export async function deleteSigningRule(id) {
  let api = await authenticatedApi(scope);
  return await api.delete(`/api/signingRules/${id}`);
}

export async function updateSigningRule(id, signingRule) {
  let api = await authenticatedApi(scope);
  return await api.put(`/api/signingRules/${id}`, JSON.stringify(signingRule));
}
