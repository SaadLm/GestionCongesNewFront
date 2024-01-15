<script>
import axios from "axios"
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            choix:'ad',
            employees:null,
            idE:null,
            showPass:true,
            newPass:null,
            oldPassAd:'',
            newPassAd:'',
            confirmationAd:'',
            admin:null,
            error:null,
        }
    },
    methods:{

        // changeShowPass(){
        //     this.showPass=!this.showPass
        // }
        // ,
      findEmpClass(){
        return{
          'fw-bolder text-dark': this.choix === 'emp',
          '': this.choix !== 'emp',
        }
      },
      findAdClass(){
        return{
          'fw-bolder text-dark': this.choix === 'ad',
          '': this.choix !== 'ad',
        }
      },
      switchToEmp(){
        this.choix='emp'
      },
      switchToAd(){
        this.choix='ad'
      },
        showSuccessMessage(message,callbackFunction) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: message,
                confirmButtonText: 'OK',
            }).then(() => {
                if (callbackFunction && typeof callbackFunction === 'function') {
                    callbackFunction();
                }
            });
        },


        changerPass(){
            if(this.newPass==null||this.newPass==''||this.idE==null){
                alert("merci de remplir le champ de mot de pass et selectioner l'employé !!")
            }
            else {
                const obj = {id_e:this.idE,pass:this.newPass}
                axios.post('http://localhost:3000/modifierpass',obj)
                    .then(results=>{
                        this.showSuccessMessage('Mot de pass changé avec succés',()=>{})
                        console.log(results.data)
                    })
                    .catch(err=>{
                        console.error(err)
                    })
            }
        },
        changerMotDePassAdmin(){
            const bod = {
                id_ad : localStorage.getItem('admin_id'),
                pass : this.oldPassAd,
                newPass:this.newPassAd
            }
            if(this.oldPassAd==''||this.newPassAd==''||this.confirmationAd==''){
                this.error='Merci de remplir les champs'
            }
            else{
                if (this.newPassAd !== this.confirmationAd) {
                    this.error = ' Merci de confirmer votre mot de pass '
                    console.log(this.error)
                }
                else{
                // console.log(bod)
                // console.log(this.admin.id_ad)
                axios.post('http://localhost:3000/verpassad',bod)
                    .then(response=>{
                        this.showSuccessMessage('Votre mot de pass a été changé avec succés',()=>{})
                        console.log(response.data)
                    })
                    .catch(err=>{
                        this.showErrorMessage('Erreur de changement de mot de pass !')
                        console.error(err)
                    })
                }
            }
        },
        showErrorMessage(message){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
            });
        },
    },
    mounted() {
        // var admin = localStorage.getItem('admin')

        axios.get('http://localhost:3000/employe')
            .then(response => {
                // console.log(response.data);
                this.employees = response.data;

            })
            .catch(error => {
                console.error('Error fetching les employees:', error);
                // Handle the error
            });

    }
}
</script>

<template>
    <div class="container-fluid mt-lg-5 mt-sm-2">
        <div class="row ">
          <div :class="findAdClass()" @click="switchToAd" class="col-md-3 offset-md-3 col-sm-12 cursor-pointer">
            <span >Changer votre mot de pass</span>
          </div>
          <div :class="findEmpClass()" class="col-md-3 col-sm-12 cursor-pointer" @click="switchToEmp">
            <span >
            Changer le mot de pass d'un enployé
            </span>
          </div>
        </div>
        <div class="row">


<!--            <div class="col-md-3 offset-4 ">-->



<!--                <label class="formbold-form-label">selectioner l'employé ! :</label>-->
<!--                <select v-model="idE" class="form-select">-->
<!--                    <option disabled selected >selectioner !</option>-->
<!--                    <option :value="emp.id_e" :key="emp.id_e" v-for="emp in employees">{{ emp.nom }} {{ emp.prenom}}</option>-->
<!--                </select>-->

<!--                <label  class="formbold-form-label">Entrer le nouveau mot de pass :</label>-->
<!--                <input class="mb-2 w-100 formbold-form-input" type="password" v-model="newPass">-->
<!--                <div class="w-25 m-auto">-->
<!--                    <span class="btn confirmer" @click="changerPass">confirmer</span>-->
<!--                </div>-->

<!--            </div>-->

            <div class="formbold-main-wrapper" v-if="choix==='emp'">
                <div class="formbold-form-wrapper">
                            <div class="formbold-steps">
                            <h2 class="text-center">Changer le mot de pass</h2>
                            <h4 class="text-center">d'un employe</h4>
                            </div>
                    <label class="formbold-form-label">Selectioner l'employé ! :</label>
                    <select v-model="idE" class="form-select">
                        <option disabled selected >selectioner !</option>
                        <option :value="emp.id_e" :key="emp.id_e" v-for="emp in employees">{{ emp.nom }} {{ emp.prenom}}</option>
                    </select>

                    <label  class="formbold-form-label mt-3">Entrer le nouveau mot de pass :</label>
                    <input class="mb-2 w-100 formbold-form-input" type="password" v-model="newPass">
<!--                    <div class="w-25 m-auto">-->
<!--                        <span class="formbold-btn" >Confirmer</span>-->
<!--                    </div>-->
                  <div class="formbold-form-btn-wrapper"><span class="text-danger fw-bolder">{{ error }}</span>
                    <span @click="changerPass" class="formbold-btn">
                                Confirmer
                            </span>
                  </div>
                </div>
            </div>




        </div>
<!--        <div v-if="this.$store.state.darkMode" class="row w-100 Whitekhett"></div>-->
<!--        <div v-if="!this.$store.state.darkMode" class="row w-100 Blackkhett"></div>-->
        <div class="row" v-if="choix==='ad'">

<!--                <div>-->
<!--                Changer votre mot de pass-->
<!--                </div>-->

                <div class="formbold-main-wrapper">
                    <div class="formbold-form-wrapper">

                        <div class="formbold-steps">
                            <h2 class="text-center">Changer votre mot de pass</h2>
                        </div>

                        <div class="formbold-form-step-1 active">


                            <div>
                                <label  class="formbold-form-label"> Ancient mot de pass :  </label>
                                <input  v-model="oldPassAd"
                                        type="password"
                                        class="formbold-form-input"
                                />
                            </div>
<!--                            <div class="formbold-input-flex mt-5">-->
                          <div class="row mt-3">
                            <div class="col-sm-12 col-md-6">
                              <label  class="formbold-form-label"> Nouveau mot de pass :</label>
                              <input v-model="newPassAd"
                                     type="password"
                                     class="formbold-form-input"
                              />
                            </div>
                            <div class="col-sm-12 col-md-6">
                              <label class="formbold-form-label"> Confirmer nouveau mot de pass : </label>
                              <input  v-model="confirmationAd"
                                      type="password"
                                      class="formbold-form-input"
                              />
                            </div>
                          </div>

<!--                            </div>-->

                        </div>





                        <div class="formbold-form-btn-wrapper"><span class="text-danger fw-bolder">{{ error }}</span>
                            <span @click="changerMotDePassAdmin" class="formbold-btn">
                                Confirmer
                            </span>
                        </div>

                    </div>
                </div>
        </div>
    </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.shadow-right-bottom {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
}
.card{
    border: none;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: "Inter", sans-serif;
}
.formbold-main-wrapper {
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

.Whitekhett{
    height: 1px;
    background-color: white;
}
.Blackkhett{
    height: 1px;
    background-color: black;
}
.bg-griyya{
  background-color: grey;
}

</style>