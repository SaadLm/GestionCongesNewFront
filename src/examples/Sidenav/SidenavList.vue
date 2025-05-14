<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
<!--    <ul class="navbar-nav">-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/dashboard-default"-->
<!--          :class="getRoute() === 'dashboard-default' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Tableau de Bord'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--&lt;!&ndash;            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>&ndash;&gt;-->
<!--              <i class="bi bi-graph-up text-primary text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--        <li class="nav-item">-->
<!--            <sidenav-item-->
<!--                    url="/gestionconges"-->
<!--                    :class="getRoute() === 'gestionconges' ? 'active' : ''"-->
<!--                    :navText="this.$store.state.isRTL ? 'الفواتیر' : 'gestion des congés'"-->
<!--            >-->
<!--                <template v-slot:icon>-->
<!--                    <i class="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>-->
<!--                </template>-->
<!--            </sidenav-item>-->
<!--        </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/tables"-->
<!--          :class="getRoute() === 'tables' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'الجداول' : ' Gestion des Employés'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--            <i-->
<!--              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"-->
<!--            ></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/billing"-->
<!--          :class="getRoute() === 'billing' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Billing'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--              <i class="bi bi-gear text-success text-sm opacity-10"></i>-->
<!--&lt;!&ndash;            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>&ndash;&gt;-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/virtual-reality"-->
<!--          :class="getRoute() === 'virtual-reality' ? 'active' : ''"-->
<!--          :navText="-->
<!--            this.$store.state.isRTL ? 'الواقع الافتراضي' : 'Virtual Reality'-->
<!--          "-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--            <i class="ni ni-app text-info text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/rtl-page"-->
<!--          :class="getRoute() === 'rtl-page' ? 'active' : ''"-->
<!--          navText="RTL"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--            <i class="ni ni-world-2 text-danger text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="mt-3 nav-item">-->
<!--        <h6-->
<!--          v-if="this.$store.state.isRTL"-->
<!--          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"-->
<!--          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"-->
<!--        >-->
<!--          صفحات المرافق-->
<!--        </h6>-->
<!--        <h6-->
<!--          v-else-->
<!--          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"-->
<!--          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"-->
<!--        >-->
<!--          ACCOUNT PAGES-->
<!--        </h6>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/profile"-->
<!--          :class="getRoute() === 'profile' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->
<!--          url="/signin"-->
<!--          :class="getRoute() === 'signin' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'تسجيل الدخول' : 'Sign In'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <sidenav-item-->

<!--          url="/"-->
<!--          :class="getRoute() === 'signup' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'خروج' : 'Log Out'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--              <i class="bi bi-box-arrow-in-left text-info text-sm opacity-10"></i>-->
<!--&lt;!&ndash;            <i class="ni ni-collection text-info text-sm opacity-10"></i>&ndash;&gt;-->
<!--          </template>-->
<!--        </sidenav-item>-->
<!--      </li>-->
<!--    </ul>-->

<!--        ///////////////////////////////       ADMIN SideBar          //////////////////////////////////////////-->

      <ul v-if="isRole==='admin'" class="navbar-nav">
<!--      <ul v-if="isAdmin" class="navbar-nav">-->
          <h6
                  class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                  :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
              Tableau de Bord
          </h6>
      <li class="nav-item">
        <sidenav-item
          url="/Statistique"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Statistiques'"
        >
          <template v-slot:icon>
<!--            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>-->
              <i class="bi bi-graph-up text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
          <h6
                  class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                  :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
              Gestion des Congés
          </h6>
        <li class="nav-item">
            <sidenav-item
                    url="/gestionconges"
                    :class="getRoute() === 'gestionconges' ? 'active' : ''"
                    :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Gestion des congés'"
            >
                <template v-slot:icon>
                    <i class="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
                </template>
            </sidenav-item>
        </li>
        <li class="nav-item">
            <sidenav-item
                    url="/ajouterconge"
                    :class="getRoute() === 'ajouterconge' ? 'active' : ''"
                    navText='Ajouter un Congé'
            >
                <template v-slot:icon>
                    <i class="ni ni-calendar-grid-58 text-success text-sm opacity-10"></i>
                </template>
            </sidenav-item>
        </li>
          <h6
                  class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                  :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
              Gestion des Employés
          </h6>
      <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : ' Gestion des employés'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-primary text-sm opacity-10"
            ></i>
<!--            <i  -->
<!--              class="fa-solid fa-people-group text-warning text-sm opacity-10"-->
<!--            ></i>-->
          </template>
        </sidenav-item>
      </li>
      <h6
              class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
              :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
          Paramètres
      </h6>
      <li class="nav-item">
          <sidenav-item
                  url="/gestionjourferiés"
                  :class="getRoute() === 'gestionFerie' ? 'active' : ''"
                  :navText="this.$store.state.isRTL ? 'الجداول' : ' Gestion des jours feriés'"
          >
              <template v-slot:icon>
                  <i
                          class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
                  ></i>
<!--                <i-->
<!--                    class="bi bi-calendar-week mb-1 text-warning text-sm fw-bold opacity-10"-->
<!--                ></i>-->
              </template>
          </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/changermotdepassadmin"
          :class="getRoute() === 'changeradmin' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Changer le mot de passe'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>



      <li class="cursor-pointer" @click="deconnecter()"><!--   -->


        <div class="nav-link" >
          <div
              class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
          >
            <slot name="icon">
              <i class="bi bi-box-arrow-in-left text-info text-sm opacity-10"></i>

            </slot>
          </div>
          <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
          >Déconnexion</span
          >
          <div class="text-black ms-2">
            <slot name="arrow">
            </slot>
          </div>
        </div>
<!--        <sidenav-item-->
<!--          url="/signin"-->
<!--          :class="getRoute() === 'signup' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'خروج' : 'Déconnexion'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--              <i class="bi bi-box-arrow-in-left text-info text-sm opacity-10"></i>-->
<!--&lt;!&ndash;            <i class="ni ni-collection text-info text-sm opacity-10"></i>&ndash;&gt;-->
<!--          </template>-->
<!--        </sidenav-item>-->
      </li>
    </ul>


<!--    /////////////////////////                     Employe SideBar             /////////////////////////////////////////////  -->


    <ul v-if="isRole==='employe'" class="navbar-nav">
<!--    <ul v-if="isEmploye" class="navbar-nav">-->

        <li class="nav-item">
            <sidenav-item
                    url="/demandes"
                    :class="getRoute() === 'gestionconges' ? 'active' : ''"
                    :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Mes demandes'"
            >
                <template v-slot:icon>
                    <i class="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
                </template>
            </sidenav-item>
        </li>
        <h6
                class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
            Demande de Congé
        </h6>
      <li class="nav-item">
        <sidenav-item
          url="/appliquerdemande"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'طلب اجازة' : 'Ajouter une demande'"
        >
          <template v-slot:icon>
<!--            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>-->
              <i class="bi bi-graph-up text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

<!--        <h6-->
<!--                class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"-->
<!--                :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"-->
<!--        >-->
<!--            Solde des Congés-->
<!--        </h6>-->
        <h6
                class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
            Profile
        </h6>
        <li class="nav-item">
            <sidenav-item
              url="/profile"
              :class="getRoute() === 'profile' ? 'active' : ''"
              :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'"
            >
              <template v-slot:icon>
                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
              </template>
            </sidenav-item>
        </li>
      <li class="nav-item">
        <sidenav-item
          url="/changermotdepass"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : ' Changer mot de passe '"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
        <h6
                class="text-xs ps-4 mt-3 text-uppercase font-weight-bolder opacity-6"
                :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
            Déconnexion
        </h6>
      <li class="cursor-pointer" @click="deconnecter()"><!--   -->


        <div class="nav-link" >
          <div
              class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
          >
            <slot name="icon">
              <i class="bi bi-box-arrow-in-left text-info text-sm opacity-10"></i>

            </slot>
          </div>
          <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
          >Déconnexion</span
          >
          <div class="text-black ms-2">
            <slot name="arrow">
            </slot>
          </div>
        </div>
<!--        <sidenav-item-->
<!--          url="/signin"-->
<!--          :class="getRoute() === 'signup' ? 'active' : ''"-->
<!--          :navText="this.$store.state.isRTL ? 'خروج' : 'Déconnexion'"-->
<!--        >-->
<!--          <template v-slot:icon>-->
<!--              <i class="bi bi-box-arrow-in-left text-info text-sm opacity-10"></i>-->
<!--          </template>-->
<!--        </sidenav-item>-->
      </li>

    </ul>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import SidenavItem from "./SidenavItem.vue";
import axios from 'axios'
import jwt_decode from 'jsonwebtoken/decode';
import router from '@/router'

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      isAdmin:false,
      isEmploye:false,
      expanded: false,
      role:null,
      id:null
    };
  },
  computed: {
    // ...mapState(['userRole']),
    isRole(){
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt_decode(token);

        return decodedToken.role;
      } else {
        return null; // or a default role value if no token is present
      }

    }
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
      toggleSubmenu() {
          this.expanded = !this.expanded;
      },
    deconnecter(){
      // console.log('sidebar deco')

      const token =localStorage.getItem('token')

      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      const id = decodedToken.id;

      const auth= {userId:id,role:role}
      axios.post('http://localhost:3000/logout',auth)
          .then(response=>{
            console.log(response.data.message)
            localStorage.removeItem("token");
            router.push('/')
          })
          .catch(err=>console.error(err))
    }
  },
    mounted() {
        // const token =localStorage.getItem('token')
        //
        // const decodedToken = jwt_decode(token);
        // this.role = decodedToken.role;
        // this.id = decodedToken.id;

        // this.role = document.querySelector('meta[name="role"]').getAttribute('content')
        // const accessAd = localStorage.getItem("adminAccess")
        // const accessEm = localStorage.getItem("employeAccess")


        // if(accessAd!=1&&accessEm!=1){
        //     this.$router.push('/')
        // }

        // if(accessAd==1){
        //     this.isAdmin=true
        // }
        // if(accessEm==1){
        //     this.isEmploye=true
        // }
    }
};
</script>
<style>
.dark{

    list-style: none; /* Remove default list styles */

}
.icon {
  font-size: 24px; /* Adjust the font size as needed */
  cursor: pointer; /* Change the cursor to indicate it's clickable */
  transition: color 0.3s ease; /* Add a smooth color transition */
}

.icon:hover {
  color: #007bff; /* Change the color on hover */
}
</style>