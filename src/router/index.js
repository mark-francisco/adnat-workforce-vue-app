import Vue from "vue";
import VueRouter from "vue-router";
import Portal from "../views/Portal.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Organizations from "../views/Organizations.vue";
import OrganizationsNew from "../views/OrganizationsNew.vue";
import OrganizationsEdit from "../views/OrganizationsEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/portal",
    name: "Portal",
    component: Portal,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: Organizations,
  },
  {
    path: "/organizations/new",
    name: "OrganizationsNew",
    component: OrganizationsNew,
  },
  {
    path: "/organizations/:id/edit",
    name: "OrganizationsEdit",
    component: OrganizationsEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
