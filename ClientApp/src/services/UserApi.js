import { authenticatedApi } from "./ApiBase";

export async function insertOrUpdateUser(token, user) {
  return await authenticatedApi(token).put("/api/user", JSON.stringify(user));
}
