import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
  postUser,
  postAuthenticateUser,
  getHome,
  getLogout
} from "@/services/auth.services";

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    authError: state => state.error,
    isLoading: state => state.loading
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    async register({ commit }, userData) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        await postUser(userData);
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || "Erreur à l'inscription");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async login({ commit }, credentials) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        await postAuthenticateUser(credentials);
        const response = await getHome();
        commit("SET_USER", response.data);
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || "Erreur à la connexion");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchUser({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await getHome();
        commit("SET_USER", response.data);
      } catch (error) {
        commit("LOGOUT");
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async logout({ commit }) {
      try {
        await getLogout();
      } finally {
        commit("LOGOUT");
      }
    }
  },
  modules: {
  }
})
