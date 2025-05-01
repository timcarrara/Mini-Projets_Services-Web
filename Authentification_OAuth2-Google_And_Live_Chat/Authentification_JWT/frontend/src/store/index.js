import Vue from "vue";
import Vuex from "vuex";
import { postAuthenticateUser, postUser } from "@/services/auth.services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem("userToken")) || null,
    isLoggedIn: !!sessionStorage.getItem("userToken"),
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
  },
  mutations: {
    setUserToken(state, token) {
      if (token) {
        sessionStorage.setItem("userToken", JSON.stringify(token));
      } else {
        sessionStorage.removeItem("userToken");
      }
    },
    updateUserInfo(state, userData) {
      state.user = userData;
    },
    updateAuthStatus(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    async authenticate({ commit }, credentials) {
      try {
        const response = await postAuthenticateUser(credentials);
        if (response.error !== 1) {
          commit("setUserToken", response);
          commit("updateUserInfo", response);
        }
        return response;
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return { error: 1, message: "Erreur lors de la connexion" };
      }
    },
    async register({ commit }, userData) {
      try {
        const response = postUser(userData);
        if (response.error !== 1) {
          commit("updateAuthStatus", false);
        }
        return response;
      } catch (error) {
        console.error("Erreur lors de la création du compte:", error);
        return { error: 1, message: "Erreur lors de la création du compte" };
      }
    },
    async logout({ commit }) {
      commit("setUserToken", null);
      commit("updateUserInfo", null);
      commit("updateAuthStatus", false);
    },
  },
});
