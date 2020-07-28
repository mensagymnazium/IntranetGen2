import { uploadAuthenticatedApi } from "./ApiBase";

let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];

export async function uploadFile(file, onUploadProgress) {
  let api = await uploadAuthenticatedApi(scope);
  const formData = new FormData();
  formData.append("body", file);
  return await api.post("/api/upload", formData, {
    onUploadProgress: progressEvent => {
      var result = (progressEvent.loaded / progressEvent.total) * 100;
      onUploadProgress(result);
    }
  });
}
