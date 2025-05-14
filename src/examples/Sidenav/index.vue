<template>
  <div
      v-show="this.$store.state.layout === 'default'"
      class="min-height-100 position-absolute w-100"
      :class="`${this.$store.state.darkMode ? 'bg-transparent' : ''}`"
      :style="getBackground(this.$store.state.darkMode)"
  />

  <!--  //    hadi li lfooo9 hiya li bddelt biha b background dyal navbar-->






  <aside
      class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
      :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    }
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.sidebarType}`"
      id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
          class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
      ></i>
      <router-link class="m-0 navbar-brand" to="/Statistique">
        <img
            :src="
            this.$store.state.darkMode ||
            this.$store.state.sidebarType === 'bg-default'
              ? logoWhite
              : logo
          "
            class="navbar-brand-img ms-0 h-100"
            alt="main_logo"
        />
        <!--        <span class="ms-2 font-weight-bold me-2">Gestion des congés</span>-->
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/IsmagiLOGO.png";
import logoWhite from "@/assets/img/IsmagiLOGO.png";
// import logo from "@/assets/img/logo2.png";
// import logoWhite from "@/assets/img/logo2.png";

export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoWhite
    };
  },
  methods:{
    getBackground(dark){
      if(!dark){
        return `background-color: #283777;`
      }
    }
  }
  ,
  props: ["custom_class", "layout"]
};
</script>
<style>
.bg-primary{
  background-color: #283777;
}
</style>