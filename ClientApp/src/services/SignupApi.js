import { authenticatedApi } from "./ApiBase";

export async function signUp(token, data) {
  return await authenticatedApi(token).post(
    "/api/signup",
    JSON.stringify(data)
  );
}

export async function unSignUp(token, data) {
  return await authenticatedApi(token).delete(
    "/api/signup",
    JSON.stringify(data)
  );
}
