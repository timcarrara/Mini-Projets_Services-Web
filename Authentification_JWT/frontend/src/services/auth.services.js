import { postRequest } from "@/services/axios.services";

async function postAuthenticateUserFromAPI(data) {
  return postRequest("/auth/signin", data, "POSTAUTHENTICATEUSER");
}
async function postUserFromAPI(data) {
  return postRequest("/auth/signup", data, "POSTUSER");
}

export async function postAuthenticateUser(data) {
  return await postAuthenticateUserFromAPI(data);
}
export async function postUser(data) {
  return await postUserFromAPI(data);
}
