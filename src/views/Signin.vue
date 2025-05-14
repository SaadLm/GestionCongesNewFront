<template>
<!--  <div class="container top-0 position-sticky z-index-sticky">-->
<!--    <div class="row">-->
<!--      <div class="col-12">-->
<!--        <navbar-->
<!--          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"-->
<!--          v-bind:darkMode="true"-->
<!--          isBtn="bg-gradient-success"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder text-center">Page d'Authentification</h4>
<!--                    <p class="mb-0 text-center">Entrer votre email et votre mot de pass</p>-->
                </div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <!-- Other form fields go here if needed -->

                    <div class="mb-3">
<!--                      <argon-input v-model="email" type="text" placeholder="Email"  size="lg" />-->
                      <input v-model="email" class="form-control" type="text" placeholder="Email" size="lg" />
                    </div>
                    <div class="mb-3">
                      <input v-model="pass" class="form-control" type="password" placeholder="Mot de pass" size="lg" />
<!--                      <argon-input v-model="pass" type="password" placeholder="Password" size="lg" />-->
                    </div>
<!--                    <argon-switch id="rememberMe">Remember me</argon-switch>-->
                    <span class="text-danger fw-bold">{{error}}</span>
                    <div class="text-center">
                      <argon-button
                              @click.prevent="login"
                              class="mt-4 text-white"
                              style="background-color: #283777"
                              variant="gradient"
                              color="#283777"
                              fullWidth
                              size="lg"
                      >Sign in</argon-button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
<!--                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"-->
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden back"


              >
<!--                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');-->
<!--          background-size: cover;"-->
<!--                <span class="mask bg-gradient-primary opacity-6"></span>-->
                <span class="mask bg-primary opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >Application de gestion des congés</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
// import ArgonInput from "@/components/ArgonInput.vue";
// import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import axios from 'axios'
// import jwt_decode from "jsonwebtoken/decode";
// import router from "@/router";
const body = document.getElementsByTagName("body")[0];

export default {
    data(){
        return{
            error:'',
            email:'',
            pass:''
        }
    },
  name: "signin",
  components: {
    // Navbar,
    // ArgonInput,
    // ArgonSwitch,
    ArgonButton,
  },
    methods:{
        login() {
            if( this.email == ''||this.pass==''){
                this.error='Merci de remplir les champs !!'
            }
            else{

                const userData = {
                    email: this.email,
                    pass: this.pass,
                };
                // console.log(userData)




                axios.post('http://localhost:3000/login', userData)
                    .then(response => {
                        if (response.data.success) {

                            // const user = response.data.user;
                            const role = response.data.role;
                            // const user = response.data.user;
                            const token = response.data.token;


                            // console.log(role)
                            // console.log(user)

                            if (role === 'admin') {

                              // this.$store.state.role='admin'
                              // this.$store.commit('setUserRole', 'admin');
                              const userRole = document.querySelector('meta[name="role"]')
                              userRole.content = 'admin'
                              // localStorage.setItem("adminAccess", 1);
                              // localStorage.setItem("admin", JSON.stringify(user));
                              // localStorage.setItem("adminToken", token);
                              localStorage.setItem('token', token)
                              // const id = JSON.stringify(user.id_ad);
                              // localStorage.setItem("admin_id", id);
                              // console.log('dazet')
                              this.$router.push('/Statistique');

                                // localStorage.setItem("adminAccess", 1);
                                // const admin = JSON.stringify(user);
                                // const id = JSON.stringify(user.id_ad);
                                // localStorage.setItem("admin", admin);
                                 // localStorage.setItem("admin_id", id);
                                // this.$router.push('/Statistique');
                            }
                            if (role === 'employe') {
                              // this.$store.state.role='employe'
                              // this.$store.commit('setUserRole', 'employe');
                              const userRole = document.querySelector('meta[name="role"]')
                              userRole.content = 'employe'

                              // localStorage.setItem("employeAccess", 1);
                              // const employe = JSON.stringify(user);
                              // localStorage.setItem("employe", employe);
                              //localStorage.setItem("employee", JSON.stringify(user));
                              // localStorage.setItem("employeeToken", token);
                              localStorage.setItem('token', token)
                              this.$router.push('/demandes');
                              //   console.log('hada employe')
                              //   localStorage.setItem("employeAccess", 1);
                              // localStorage.setItem("employeeToken", token);
                              //   const employe = JSON.stringify(user);
                              //   localStorage.setItem("employe", employe);
                              //   this.$router.push('/demandes');
                            }
                          // if (role === 'admin') {
                          //   // console.log('hada admin')
                          //   localStorage.setItem("adminAccess", 1);
                          //   const admin = JSON.stringify(user);
                          //   const id = JSON.stringify(user.id_ad);
                          //   localStorage.setItem("admin", admin);
                          //   localStorage.setItem("admin_id", id);
                          //   this.$router.push('/Statistique');
                          // }
                          // if (role === 'employe') {
                          //   // console.log('hada employe')
                          //   localStorage.setItem("employeAccess", 1);
                          //   const employe = JSON.stringify(user);
                          //   localStorage.setItem("employe", employe);
                          //   this.$router.push('/demandes');
                          // }
                        } else {
                            // Failed login
                            this.error='Identifiant ou mot de passe incorrect';
                        }
                    })
                    .catch(error => {
                        console.error('Login error:', error);
                        this.error='Identifiant ou mot de passe incorrect';
                    });



            }
        }
    },
    mounted() {


      // localStorage.setItem("adminAccess", 0);
      // localStorage.setItem("employeAccess", 0);
      // localStorage.setItem("admin", null);
      // localStorage.setItem("employe", null);
      // localStorage.removeItem("adminToken");
      // localStorage.removeItem("employeeToken");
      // this.$store.commit('setUserRole', '');
      // localStorage.removeItem("token");

        },
    created() {

      document.title = 'Gestion des congés';



      this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {




    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
