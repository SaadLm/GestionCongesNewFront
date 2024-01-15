import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Admin/Dashboard.vue";
import Tables from "../views/Admin/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Employe/ProfileNew.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import GestionConges from "@/views/Admin/GestionConges.vue";
import Demandes from "@/views/Employe/LesDemandesEmp.vue";
import AppDemande from "@/views/Employe/AppliqueDemande.vue";
import GestionDemande from "@/views/Employe/Demande.vue";
import ChangerMotDePass from "@/views/Employe/ChangerMotDePass.vue";
import GestionDesJoursFerie from "@/views/Admin/GestionDesJoursFeriés.vue";
import ChangerMotDePassAdmin from "@/views/Admin/ChangerMotDePassDUnEmploye.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/Statistique",
    name: "Statistique",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const accessAd = localStorage.getItem("adminAccess");

      if (accessAd !== '1') {
        // If the user doesn't have admin access, stay on the current page
        next(false);
        this.$router.push('/signin');
      } else {
        // If the user has admin access, proceed to the administrator page
        next();
      }
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    beforeEnter: (to, from, next) => {
      const accessAd = localStorage.getItem("adminAccess");

      if (accessAd !== '1') {
        // If the user doesn't have admin access, stay on the current page
        next(false);
        this.$router.push('/signin');
      } else {
        // If the user has admin access, proceed to the administrator page
        next();
      }
    },
  },
  {
    path: "/gestionconges",
    name: "gestionconges",
    component: GestionConges,
    beforeEnter: (to, from, next) => {
      const accessAd = localStorage.getItem("adminAccess");

      if (accessAd !== '1') {
        // If the user doesn't have admin access, stay on the current page
        next(false);
        this.$router.push('/signin');
      } else {
        // If the user has admin access, proceed to the administrator page
        next();
      }
    },
  },
  {
    path: "/gestionjourferiés",
    name: "gestionFerie",
    component: GestionDesJoursFerie,
    beforeEnter: (to, from, next) => {
      const accessAd = localStorage.getItem("adminAccess");

      if (accessAd !== '1') {
        // If the user doesn't have admin access, stay on the current page
        next(false);
        this.$router.push('/signin');
      } else {
        // If the user has admin access, proceed to the administrator page
        next();
      }
    },
  },
  {
    path: "/changermotdepassadmin",
    name: "changeradmin",
    component: ChangerMotDePassAdmin,
    beforeEnter: (to, from, next) => {
      const accessAd = localStorage.getItem("adminAccess");

      if (accessAd !== '1') {
        // If the user doesn't have admin access, stay on the current page
        next(false);
        this.$router.push('/signin');
      } else {
        // If the user has admin access, proceed to the administrator page
        next();
      }
    },
  },
  {
    path: "/demandes",
    name: "demande",
    component: Demandes,
  },
  {
    path: "/dem",
    name: "dem",
    component: GestionDemande,
  },
  {
    path: "/changermotdepass",
    name: "changer",
    component: ChangerMotDePass,
  },
  {
    path: "/appliquerdemande",
    name: "AppliquerDemande",
    component: AppDemande,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
