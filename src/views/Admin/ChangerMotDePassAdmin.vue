<script>
import axios from "axios"
import Swal from 'sweetalert2';
export default {
    data(){
        return{

            employees:null,
            idE:null,
            showPass:true,
            newPass:null
        }
    },
    methods:{

        // changeShowPass(){
        //     this.showPass=!this.showPass
        // }
        // ,
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
        }
    },
    mounted() {
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
    <div class="container-fluid mt-lg-5">

        <div class="row">


            <div class="col-md-3 offset-4 ">



                <label class="formbold-form-label">selectioner l'employé ! :</label>
                <select v-model="idE" class="form-select">
                    <option disabled selected >selectioner !</option>
                    <option :value="emp.id_e" :key="emp.id_e" v-for="emp in employees">{{ emp.nom }} {{ emp.prenom}}</option>
                </select>

                <label  class="formbold-form-label">Entrer le nouveau mot de pass :</label>
                <input class="mb-2 w-100 formbold-form-input" type="password" v-model="newPass">
                <div class="w-25 m-auto">
                    <span class="btn confirmer" @click="changerPass">confirmer</span>
                </div>

            </div>



        </div>
    </div>
</template>

<style scoped>

</style>