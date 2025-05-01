import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import HomeAnonyme from "@/views/HomeAnonyme.vue"
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";
import Home from "@/views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "HomeAnonyme", component: HomeAnonyme },
    { path: "/signin", name: "SignIn", component: SignIn },
    { path: "/signup", name: "SignUp", component: SignUp },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["isAuthenticated"];
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      try {
        await store.dispatch("fetchUser");
        next();
      } catch (err) {
        next("/signin");
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
