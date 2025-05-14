<template>
  <main>
    <div class="py-5 container-fluid">
      <div class="row">

        <div class="col-md-3 offset-md-1 col-sm-8 mt-7 ms-sm-1 mb-1">
          <div class="card shadow-right-bottom p-3">
            <span class="text-primary fw-bolder ">Reliquat de Congé :</span> <br>
            <span class="text-center fw-bolder">{{ employe.soldeConge}} jours</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="card mt-5">

            <div class="card-body">
              <p class="text-uppercase text-sm">Données de l'ustilisateur</p>
              <div class="row">
                <div class="col-md-6 d-block">
                  <label for="example-text-input" class="form-control-label"
                  >Nom :</label>
                  <!--                  <argon-input type="text" value="lucky.jesse" />-->
                  <input type="text" class="form-control" v-model="employe.nom" disabled>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                  >Prenom :</label
                  >
                  <input type="email" v-model="employe.prenom" class="form-control" disabled>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                  >Fonction :</label
                  >
                  <input class="form-control" type="text" v-model="employe.fonction" disabled/>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                  >Email :</label
                  >
                  <input class="form-control" type="text" v-model="employe.email" disabled/>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                  >Address</label
                  >
                  <input
                      class="form-control" disabled
                      type="text"
                      v-model="employe.adresse"
                  />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                  >Date de recrutemnet</label
                  >
                  <input class="form-control" type="text" :value="localString(employe.dateRecrutement)" disabled />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                  >CIN</label
                  >
                  <input class="form-control" type="text" v-model="employe.cin" disabled />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                  >CNSS</label
                  >
                  <input class="form-control" type="text" v-model="employe.cnss" disabled />
                </div>
              </div>
              <hr class="horizontal dark" />
              <!--              <p class="text-uppercase text-sm">About me</p>-->
              <div class="row">

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import axios from 'axios'
import moment from "moment/moment";
import jwt_decode from "jsonwebtoken/decode";
// import ProfileCard from "../components/ProfileCard.vue";
// import ArgonInput from "@/components/ArgonInput.vue";
// import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      employe:{
        nom:null,
        prenom:null,
        email:null,
        adresse:null,
        cin:null,
        cnss:null,
        dateRecrutement: null,
        soldeConge:null
      }
    };
  },
  methods:{
    localString(d){
      const formattedDate = moment(d).format('YYYY-MM-DD');
      return formattedDate;
    },
  },
// components: { ProfileCard, ArgonInput, ArgonButton },

  mounted() {
    // const user=localStorage.getItem('employe')
    // this.employe=JSON.parse(user);

    const token =localStorage.getItem('token')

    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;

    axios.post('http://localhost:3000/emp',{id_e:id})
        .then(response=>{
          this.employe=response.data.employeeData
          console.log(this.employe.soldeConge)
        })
        .catch(err=>alert(err))





    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    // this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  },
  created() {
    document.title = 'Profile ';
  }
};
</script>
<style>
.formbold-main-wrapper {
  margin-left: 30pc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.formbold-form-wrapper {
  margin: 0 auto;
  max-width: 550px;
  width: 100%;

}

.formbold-steps {
  padding-bottom: 18px;
  margin-bottom: 35px;
  border-bottom: 1px solid #DDE3EC;
}
.formbold-steps ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 40px;
}
.formbold-steps li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}
.formbold-steps li span {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #DDE3EC;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}
.formbold-steps li.active {
  color: #07074D;;
}
.formbold-steps li.active span {
  background: #6A64F1;
  color: #FFFFFF;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 22px;
}
.formbold-input-flex > div {
  width: 50%;
}
.formbold-form-input {
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #DDE3EC;
  background: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  color: #536387;
  outline: none;
  resize: none;
}
.formbold-form-input:focus {
  border-color: #6a64f1;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
.formbold-form-label {
  color: #07074D;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
}

.formbold-form-confirm {
  border-bottom: 1px solid #DDE3EC;
  padding-bottom: 35px;
}
.formbold-form-confirm p {
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  margin-bottom: 22px;
  width: 75%;
}
.formbold-form-confirm > div {
  display: flex;
  gap: 15px;
}

.formbold-confirm-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 0.5px solid #DDE3EC;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  cursor: pointer;
  padding: 10px 20px;
  transition: all .3s ease-in-out;
}
.formbold-confirm-btn {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
}
.formbold-confirm-btn.active {
  background: #6A64F1;
  color: #FFFFFF;
}

.formbold-form-step-1,
.formbold-form-step-2,
.formbold-form-step-3 {
  display: none;
}
.formbold-form-step-1.active,
.formbold-form-step-2.active,
.formbold-form-step-3.active {
  display: block;
}

.formbold-form-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  margin-top: 25px;
}
.formbold-back-btn {
  cursor: pointer;
  background: #FFFFFF;
  border: none;
  color: #07074D;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: none;
}
.formbold-back-btn.active {
  display: block;
}
.formbold-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 25px;
  border: none;
  font-weight: 500;
  background-color: #6A64F1;
  color: white;
  cursor: pointer;
}
.formbold-btn:hover {
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

</style>