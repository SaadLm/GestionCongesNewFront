<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggle"
    >
      <i class="py-2 fa fa-cog"></i>
    </a>
    <div class="shadow-lg card">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div
          class=""
          :class="this.$store.state.isRTL ? 'float-end' : 'float-start'"
        >
          <h5 class="mt-3 mb-0">Configurer votre interface</h5>
        </div>
        <div
          class="mt-4"
          @click="toggle"
          :class="this.$store.state.isRTL ? 'float-start' : 'float-end'"
        >
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">
        <!-- Sidebar Backgrounds -->
        <div>
          <h6 class="mb-0">Sidebar Colors</h6>
        </div>
        <a class="switch-trigger background-color">
          <div
            class="my-2 badge-colors"
            :class="this.$store.state.isRTL ? 'text-end' : ' text-start'"
          >
            <span
              class="badge filter bg-gradient-primary active"
              data-color="primary"
              @click="sidebarColor('primary')"
            ></span>
            <span
              class="badge filter bg-gradient-dark"
              data-color="dark"
              @click="sidebarColor('dark')"
            ></span>
            <span
              class="badge filter bg-gradient-info"
              data-color="info"
              @click="sidebarColor('info')"
            ></span>
            <span
              class="badge filter bg-gradient-success"
              data-color="success"
              @click="sidebarColor('success')"
            ></span>
            <span
              class="badge filter bg-gradient-warning"
              data-color="warning"
              @click="sidebarColor('warning')"
            ></span>
            <span
              class="badge filter bg-gradient-danger"
              data-color="danger"
              @click="sidebarColor('danger')"
            ></span>
          </div>
        </a>
        <!-- Sidenav Type -->
<!--        <div class="mt-3">-->
<!--          <h6 class="mb-0">Sidenav Type</h6>-->
<!--          <p class="text-sm">Choose between 2 different sidenav types.</p>-->
<!--        </div>-->
<!--        <div class="d-flex gap-2">-->
<!--          <button-->
<!--            id="btn-white"-->
<!--            class="btn w-100 px-3 mb-2"-->
<!--            :class="-->
<!--              this.$store.state.sidebarType === 'bg-white'-->
<!--                ? 'bg-gradient-success'-->
<!--                : 'btn-outline-success'-->
<!--            "-->
<!--            @click="sidebarType('bg-white')"-->
<!--          >-->

<!--            White-->
<!--          </button>-->
<!--          <button-->
<!--            id="btn-dark"-->
<!--            class="btn w-100 px-3 mb-2"-->
<!--            :class="-->
<!--              this.$store.state.sidebarType === 'bg-default'-->
<!--                ? 'bg-gradient-success'-->
<!--                : 'btn-outline-success'-->
<!--            "-->
<!--            @click="sidebarType('bg-default')"-->
<!--          >-->
<!--            Dark-->
<!--          </button>-->
<!--        </div>-->
        <p class="mt-2 text-sm d-xl-none d-block">
          You can change the sidenav type just on desktop view.
        </p>
        <!-- Navbar Fixed -->
        <!-- Navbar Fixed -->
        <div class="mt-3 d-flex">
          <h6 class="mb-0">Navbar Fixed</h6>
          <div class="form-check form-switch ps-0 ms-auto my-auto">
            <input
              class="mt-1 form-check-input"
              :class="
                this.$store.state.isRTL ? 'float-end  me-auto' : ' ms-auto'
              "
              type="checkbox"
              id="navbarFixed"
              :checked="this.$store.state.isNavFixed"
              @click="setNavbarFixed"
            />
          </div>
        </div>

        <hr class="horizontal dark my-4" />
        <div class="mt-2 mb-5 d-flex">
          <h6 class="mb-0" :class="this.$store.state.isRTL ? 'ms-2' : ''">
            Light / Dark
          </h6>
          <div class="form-check form-switch ps-0 ms-auto my-auto">
            <input
              class="form-check-input mt-1 ms-auto"
              type="checkbox"
              :checked="this.$store.state.darkMode"
              @click="setDarkMode"
            />
          </div>
        </div>
        <div
            class="mt-lte7t"
            @click="toggle"
            :class="this.$store.state.isRTL ? 'float-start' : 'float-end'"
        >
<!--          <span class="me-4 text-dark fw-bolder cursor-pointer hover-movement">Fermer</span>-->
          <span v-if="this.$store.state.darkMode" class="me-4 text-white fw-bolder cursor-pointer hover-movement">Fermer</span>

          <span v-if="!this.$store.state.darkMode" class="me-4 text-dark fw-bolder cursor-pointer hover-movement">Fermer</span>
<!--          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">-->
<!--            <i class="fa fa-close"></i>-->
<!--          </button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
export default {
  name: "configurator",
  props: ["toggle"],
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = `card-background-mask-${color}`;
    },
    sidebarType(type) {
      this.$store.state.sidebarType = type;
    },
    setNavbarFixed() {
      if (
        this.$route.name !== "Profile" ||
        this.$route.name !== "All Projects"
      ) {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },
    setDarkMode() {
      if (this.$store.state.darkMode) {
        this.$store.state.darkMode = false;
        this.$store.state.sidebarType = "bg-white";
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.darkMode = true;
        this.$store.state.sidebarType = "bg-default";
        activateDarkMode();
      }
    },
    sidenavTypeOnResize() {
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        white.classList.add("disabled");
      } else {
        white.classList.remove("disabled");
      }
    }
  },
  computed: {
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  }
};
</script>
<style>
.mt-lte7t{
  margin-top: 100%;
}
.hover-movement {
  transition: transform 0.3s;
}

.hover-movement:hover {
  transform: translateY(5px); /* Adjust the amount of movement */
}
</style>