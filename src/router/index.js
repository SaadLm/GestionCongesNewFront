// import { createRouter
//   , createWebHistory
// } from "vue-router";
import axios from 'axios'
import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Admin/Dashboard.vue";
import Tables from "../views/Admin/Tables.vue";
// import Billing from "../views/Billing.vue";
// import VirtualReality from "../views/VirtualReality.vue";
// import RTL from "../views/Rtl.vue";
import Profile from "../views/Employe/ProfileNew.vue";
// import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import GestionConges from "@/views/Admin/GestionConges.vue";
import Demandes from "@/views/Employe/LesDemandesEmp.vue";
import AppDemande from "@/views/Employe/AppliqueDemande.vue";
// import GestionDemande from "@/views/Employe/Demande.vue";
import ChangerMotDePass from "@/views/Employe/ChangerMotDePass.vue";
import GestionDesJoursFerie from "@/views/Admin/GestionDesJoursFeriés.vue";
import ChangerMotDePassAdmin from "@/views/Admin/ChangerMotDePassDUnEmploye.vue";
import AjouterConge from "@/views/Admin/AjouterConge.vue";


// export const router = createRouter({
//   mode: 'history',
//   base:process.env.BASE_URL,
async function getAccessAdmin(token, next){
    await axios.post('http://localhost:3000/checktokenadmin',{token})
        .then(response => {
            // console.log(response.data.exists)
            if(response.data.exists === true){next();}
            else{
                next('/signin')
            }
            return response.data.exists
        })
    .catch(err=>{
        console.error('aaa'+err)

        });
}
async function getAccessEmp(token,next){
    await axios.post('http://localhost:3000/checktokenemploye',{token})
        .then(response => {
            // console.log(response.data.exists)
            if(response.data.exists === true){next();}
            else{
                next('/signin')
            }
            return response.data.exists
        })
    .catch(err=>{
        console.error(err)
        });
}
const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  // {
  //   path: "/Statistique",
  //   name: "Statistique",
  //   component: Dashboard,
  //
  //   beforeEnter: (to, from, next) => {
  //     const isAdmin = localStorage.getItem("adminToken") !== null;
  //
  //     if (isAdmin) {
  //       next();
  //     } else {
  //       next('/signin');
  //     }
  //   },
  // },
  {
    path: "/Statistique",
    name: "Statistique",
    component: Dashboard,

      beforeEnter: async (to, from, next) => {

      const token = localStorage.getItem('token')
        await getAccessAdmin(token, next)
            // if(await getAccessAdmin(token) == true){next();}
            // else{
            //   next('/signin')
            // }


          // .catch(
          //   next('/error')
          // );
    },
  },
  // {
  //   path: "/Statistique",
  //   name: "Statistique",
  //   component: Dashboard,
  //   beforeEnter: (to, from, next) => {
  //     const accessAd = localStorage.getItem("adminAccess");
  //
  //     if (accessAd !== '1') {
  //       // If the user doesn't have admin access, stay on the current page
  //       next(false);
  //       this.$router.push('/signin');
  //     } else {
  //       // If the user has admin access, proceed to the administrator page
  //       next();
  //     }
  //   },
  // },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessAdmin(token, next)
      },

  },
  {
    path: "/gestionconges",
    name: "gestionconges",
    component: GestionConges,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessAdmin(token, next)
      },

  },
    {
    path: "/ajouterconge",
    name: "ajouterconge",
    component: AjouterConge,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessAdmin(token, next)
      },

  },
  {
    path: "/gestionjourferiés",
    name: "gestionFerie",
    component: GestionDesJoursFerie,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessAdmin(token, next)
      },
    // beforeEnter: (to, from, next) => {
    //   const accessAd = localStorage.getItem("adminAccess");
    //
    //   if (accessAd !== '1') {
    //     // If the user doesn't have admin access, stay on the current page
    //     next(false);
    //     this.$router.push('/signin');
    //   } else {
    //     // If the user has admin access, proceed to the administrator page
    //     next();
    //   }
    // },
  },
  {
    path: "/changermotdepassadmin",
    name: "changeradmin",
    component: ChangerMotDePassAdmin,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessAdmin(token, next)
      },
    // beforeEnter: (to, from, next) => {
    //   const accessAd = localStorage.getItem("adminAccess");
    //
    //   if (accessAd !== '1') {
    //     // If the user doesn't have admin access, stay on the current page
    //     next(false);
    //     this.$router.push('/signin');
    //   } else {
    //     // If the user has admin access, proceed to the administrator page
    //     next();
    //   }
    // },
  },
  {
    path: "/demandes",
    name: "demande",
    component: Demandes,
      beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessEmp(token, next)
      },
  },
  // {
  //   path: "/demandes",
  //   name: "demande",
  //   component: Demandes,
  //   beforeEnter: (to, from, next) => {
  //     const isAdmin = localStorage.getItem("employeeToken") !== null;
  //
  //     if (isAdmin) {
  //       next();
  //     } else {
  //       next('/signin');
  //     }
  //   },
  // },
  {
    // beforeEnter: (to, from, next) => {
    //   const accessEmp = localStorage.getItem("employeAccess");
    //
    //   if (accessEmp !== '1') {
    //     // If the user doesn't have admin access, stay on the current page
    //     next(false);
    //   } else {
    //     // If the user has admin access, proceed to the administrator page
    //     next();
    //   }
    // },
    path: "/changermotdepass",
    name: "changer",
    component: ChangerMotDePass,
    beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessEmp(token, next)
      },
  },
  {
    beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessEmp(token, next)
      },
    // beforeEnter: (to, from, next) => {
    //   const accessEmp = localStorage.getItem("employeAccess");
    //
    //   if (accessEmp !== '1') {
    //     // If the user doesn't have admin access, stay on the current page
    //     next(false);
    //   } else {
    //     // If the user has admin access, proceed to the administrator page
    //     next();
    //   }
    // },
    path: "/appliquerdemande",
    name: "AppliquerDemande",
    component: AppDemande,
  },

  {
    beforeEnter: async (to, from, next) => {

          const token = localStorage.getItem('token')
          await getAccessEmp(token, next)
      },
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  }
  ,
  {
    path: '/:path(.*)*',
    name: "NotFound",
    component: Signin,
    beforeEnter: (to, from, next) => {

        next('/signin');

    },
  }
]
// })


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});



// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes
// })
//
export default router;
