import {getRequest, postRequest} from "@/services/axios.services";

async function postUserFromAPI(data) {
    return postRequest("/signup", data, "POSTUSER");
}
async function getHomeFromAPI() {
    return getRequest("/home","GETHOME");
}
async function getLogoutFromAPI() {
    return postRequest("/logout", {}, "GETLOGOUT");
}
async function postAuthenticateUserFromAPI(data) {
    return postRequest("/signin", data, "POSTAUTHENTICATEUSER");
}

export async function postUser(data) {
    return await postUserFromAPI(data);
}
export async function getHome(){
    return await getHomeFromAPI();
}
export async function getLogout(){
    return await getLogoutFromAPI();
}
export async function postAuthenticateUser(data) {
    return await postAuthenticateUserFromAPI(data);
}