<script>
import axios from "axios"
import moment from 'moment';
import Swal from 'sweetalert2';
import FlatPickr from 'vue-flatpickr-component';
export default {
    components: {
        flatPickr: FlatPickr,
    },
    data(){
        return{
            showAjouter:false,
            showModifier:false,
            employees:[],
            employeData:{
              nom:null,
              prenom:null,
              status:null,
              tel:null,
              email:null,
              pass:null,
              adresse:null,
              dateRecrutement:null,
              cin:null,
              typeContrat:null,
              cnss:null,
              fonction:null
          },
            typeContrat: null,
            err:null,
            errModifier:null,
            isDateValid: true,
            currentPage: 1,
            totalPages: 1,
            datePickerConfig: {
                dateFormat: 'd/m/Y', // Format for display
            },

        }
    },
    methods:{
        ajouterEmploye(){
            // console.log("----------------------------")
            // console.log(this.employeData.nom)
            // console.log(this.employeData.prenom)
            // console.log(this.employeData.status)
            // console.log(this.employeData.tel)
            // console.log(this.employeData.email)
            // console.log(this.employeData.pass)
            // console.log(this.employeData.adresse)
            // console.log(this.employeData.typeContrat)
            // console.log(this.employeData.dateRecrutement)
            // console.log(this.employeData.cin)
            // console.log(this.employeData.cnss)
            // console.log(this.employeData.tel)
            // console.log("----------------------------")




            if (
                this.employeData.nom == null ||
                this.employeData.nom == '' ||
                this.employeData.prenom == null ||
                this.employeData.prenom == "" ||
                this.employeData.status == null ||
                this.employeData.status == '' ||
                this.employeData.tel == null ||
                this.employeData.tel == '' ||
                this.employeData.email == null ||
                this.employeData.email == '' ||
                this.employeData.pass == null ||
                this.employeData.pass == '' ||
                this.employeData.adresse == null ||
                this.employeData.adresse == '' ||
                this.employeData.typeContrat == 0 ||
                this.employeData.typeContrat == null ||
                this.employeData.dateRecrutement == null ||
                this.employeData.cin == null ||
                this.employeData.cin == '' ||
                this.employeData.cnss == null||
                this.employeData.cnss == ''||
                this.employeData.fonction == null||
                this.employeData.fonction == ''

                )
            {
                this.err = 'Merci de remplir les champs';
                console.log(this.err)
            }

            else {

                // const dateRecrutement = moment(this.employeData.dateRecrutement, 'DD/MM/YYYY');
                // const formattedDateRecrutement = dateRecrutement.format('YYYY-MM-DD');
                // this.employeData.dateRecrutement=formattedDateRecrutement
                // console.log(this.employeData.dateRecrutement)
                fetch('http://localhost:3000/employe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.employeData)
            }).then(response =>{
                    if (response.ok) {
                        this.fetchData()
                        this.showSuccessMessage('employé ajouté avec success')
                        return response.json();
                    } else {
                        this.showErrorMessage('Email deja enregistré !')
                        console.log('Failed to create employe');
                        throw new Error('Failed to create employe')
                    }
                }
            )

            }




        },
        showSuccessMessage(message) {
            this.showAjouter=false
            this.showModifier=false
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: message,
                confirmButtonText: 'OK',
            });
        },
        showErrorMessage(message){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
            });
        },
        modifierEmploye(){


            if (
                this.employeData.nom == null ||
                this.employeData.nom == '' ||
                this.employeData.prenom == null ||
                this.employeData.prenom == "" ||
                this.employeData.status == null ||
                this.employeData.status == '' ||
                this.employeData.tel == null ||
                this.employeData.tel == '' ||
                this.employeData.email == null ||
                this.employeData.email == '' ||
                // this.employeData.pass === '' ||
                this.employeData.adresse == null ||
                this.employeData.adresse == '' ||
                this.employeData.typeContrat == 0 ||
                this.employeData.typeContrat == null ||
                this.employeData.dateRecrutement == null ||
                this.employeData.cin == null ||
                this.employeData.cin == '' ||
                this.employeData.cnss == null||
                this.employeData.cnss == ''||
                this.employeData.fonction == null||
                this.employeData.fonction == ''
            )
            {
                this.errModifier = 'Merci de remplir les champs';
                console.log(this.errModifier)
            }
            else {
              this.employeData.dateRecrutement=this.localString(this.employeData.dateRecrutement)
                // console.log(this.employeData.dateRecrutement)
                axios.put('http://localhost:3000/editemploye',this.employeData)
                    .then(response=>{
                        // console.log('employé modifier avec succés')
                        this.fetchData()
                        this.showSuccessMessage('employé modifier avec succés')
                        console.log(response.data.message)

                    }
                    )
                    .catch(error=>{
                        console.log("employé n'a pas modifier , ", error);
                        this.showErrorMessage("Employé n'a pas modifier !")

                    }
                    )

                  }
        },
        localString(d){
            const formattedDate = moment(d).format('YYYY-MM-DD');
            return formattedDate;
        },
        handleChange() {
            // Update the data-date attribute using moment.js
            this.$el.querySelector('input').setAttribute(
                'data-date',
                moment(this.employeData.dateRecrutement, 'YYYY-MM-DD').format('YYYY-MM-DD')
            );
        },





        changeAjouter(){
            this.showAjouter=!this.showAjouter,
            this.err=''
            this.employeData={
                nom:null,
                prenom:null,
                status:null,
                tel:null,
                email:null,
                pass:null,
                adresse:null,
                dateRecrutement:null,
                cin:null,
                typeContrat:null,
                cnss:null
          }

        },
        changeModifier(emp){
            this.employeData=emp
            this.errModifier=''
            this.employeData.pass=''
            this.showModifier=!this.showModifier

        },
        typeCont(type){
                    // console.log(typeof(type))
            const a =  parseInt(type)
            switch (a) {
                case 1:
                    return 'CDI';
                case 2:
                    return 'CDD';
                case 3:
                    return 'CTT';
            }
        },
        fetchEmployes(){
            axios.get('http://localhost:3000/employe')
                .then(response => {
                    // console.log(response.data);
                    this.employees = response.data;

                })
                .catch(error => {
                    console.error('Error fetching les employees:', error);
                    // Handle the error
                });
        },
        async fetchData() {
            try {
                const obj = {page: this.currentPage}
                const response = await axios.post(`http://localhost:3000/employepage`, obj);
                const data = response.data;
                // console.log("hada total : ", data.total)
                // console.log("hadi page : ", this.currentPage)
                // Assuming the total count is sent from the server
                this.totalPages = Math.ceil(data.total / 10);
                // console.log('totalPages = ',this.totalPages)
                this.employees = data.res;
            } catch (error) {
                console.error(error);
            }
        },
        prevPage() {
            if (this.currentPage >= 2) {
                console.log('prev')
                this.currentPage -= 1;
                console.log(this.currentPage)
                this.fetchData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
                console.log(this.currentPage)
                this.fetchData();
            }

        },
      getStatus(status){
          if(status==='inactif'){
            return 'background-color:red'
          }
          if(status==='Actif'){
            return 'background-color:#283777'
          }
      }
    },
    mounted() {
        axios.get('http://localhost:3000/typecontrat')
            .then(response=>{
                this.typeContrat=response.data
                // console.log(this.typeContrat)
            })
            .catch(error=>{
                console.error('error feching les type de contrats',error)
            })
        // this.fetchEmployes()
        this.fetchData()

    },
  created() {
    document.title = 'Gestion des congés';
  }
}
</script>

<template>
    <div v-if="showAjouter" class="container-fluid position-absolute showAjouter" style="z-index: 10">
    <div class="row">
        <div class=" innerCard col-md-5 col-lg-9 col-xl-7 offset-md-1">
            <div class="card shadow-2-strong" style="border-radius: 10px;">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Forme d'ajoutement d'un employé</h3>

                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Nom : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.nom" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">Prenom :<span class="text-danger">*</span></label>
                                    <input v-model="employeData.prenom" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Status :<span class="text-danger">*</span></label>
                                    <select class="form-select form-select-lg mb-3" v-model="employeData.status">
                                        <option value="Actif">Actif</option>
                                        <option value="inactif">Inactif</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">Telephone :<span class="text-danger">*</span></label>
                                    <input v-model="employeData.tel" type="tel" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Email :<span class="text-danger">*</span></label>
                                    <input v-model="employeData.email" type="text"  class="form-control form-control-lg" />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Mote de passe :<span class="text-danger">*</span></label>
                                    <input v-model="employeData.pass" type="password"  class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div><div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">adresse :<span class="text-danger">*</span></label>
                                    <input v-model="employeData.adresse" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Type de contrat <span class="text-danger">*</span></label>
                                    <select  class="form-select form-select-lg mb-3" v-model="employeData.typeContrat">
                                        <option v-for="type in typeContrat" :key="type.id_contrat" :value="type.id_contrat">{{ type.nom }}</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
<!--                                    <input v-model="employeData.dateRecrutement" type="date" data-date="" data-date-format="DD MMMM YYYY" @input="handleChange" class="form-control form-control-lg" />-->
                                    <label class="form-label" >Date de recrutement : <span class="text-danger">*</span></label>
                                    <flat-pickr

                                        v-model="employeData.dateRecrutement"
                                        :config="DatePickerConfig"
                                        class="form-control form-control-sm"
                                    ></flat-pickr>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">CIN : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.cin" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6  mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Numero CNSS : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.cnss" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                          <div class="col-md-6  mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Fonction  : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.fonction" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>

                        </div>
                    <span class="text-danger fw-bolder">{{err}}</span>

                    <div class="row w-100">
                        <div class="col-md-9 offset-3 p-1 ">
                            <button @click="ajouterEmploye" class="btn btn-primary">Ajouter</button>
                            <button @click="changeAjouter" class="btn btn-warning ms-md-1">Back</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
    <div v-if="showModifier" class="container-fluid position-absolute showAjouter" style="z-index: 10">
    <div class="row">
        <div class=" innerCard col-md-5 col-lg-9 col-xl-7 offset-md-1">
            <div class="card bg-gradient shadow-2-strong" style="border-radius: 10px;">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Forme de modification d'un employé</h3>

                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Nom : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.nom" type="text"  class="form-control form-control-lg" />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">Prenom : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.prenom" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Status : <span class="text-danger">*</span></label>
                                    <select class="form-select form-select-lg mb-3" v-model="employeData.status">
                                        <option value="Actif">Actif</option>
                                        <option value="inactif">Inactif</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">Telephone : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.tel" type="tel" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Email : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.email" type="text"  class="form-control form-control-lg" />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Mote de passe :</label>
                                    <input v-model="employeData.pass" type="password"  class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div><div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">adresse : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.adresse" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" >Type de contrat <span class="text-danger">*</span></label>
                                    <select  class="form-select form-select-lg mb-3" v-model="employeData.typeContrat">
                                        <option v-for="type in typeContrat"
                                                :key="type.id_contrat"
                                                :value="type.id_contrat">{{ type.nom }}
                                        </option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
<!--                                    <input v-model="employeData.dateRecrutement" type="date" data-date="" data-date-format="DD MMMM YYYY" @input="handleChange" class="form-control form-control-lg" />-->
                                    <label class="form-label" >Date de recrutement : <span class="text-danger">*</span></label>
                                    <flat-pickr

                                        v-model="employeData.dateRecrutement"
                                        class="form-control form-control-sm"
                                    ></flat-pickr>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">CIN : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.cin" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="login">Numero CNSS : <span class="text-danger">*</span></label>
                                    <input v-model="employeData.cnss" type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
                          <div class="col-md-6  mb-4">
                            <div class="form-outline">
                              <label class="form-label" >Fonction  : <span class="text-danger">*</span></label>
                              <input v-model="employeData.fonction" type="text" class="form-control form-control-lg" />
                            </div>
                          </div>



                        </div>
                        <span class="text-danger fw-bolder">{{errModifier}}</span>
                        <div class="row w-100">
                            <div class="col-md-10 offset-3 p-1 ">
                                <button @click="modifierEmploye" class="btn btn-primary ">Modifier</button>
                                <button @click="changeModifier" class="btn btn-warning ms-md-1 ">Back</button>
                            </div>
                        </div>
<!--                        <div class="mt-4 pt-2">-->
<!--                        </div>-->

                </div>
            </div>
        </div>
    </div>
</div>




  <div class="d-flex mt-6 ms-4">
            <h2>Les employées :</h2> <button class="formbold-btn btn ms-3 px-3 py-1" @click="changeAjouter" style="z-index: 0 ; background-color: #283777;width: fit-content"><i class="fas fa-plus me-2"></i> Ajouter </button>

  </div>

<!--<div class="container-fluid">-->

<!--    <div class="row w-100 mt-5 me-2">-->
<!--        <div class="col-md-9">-->

<!--            <h2>Les employées :</h2>-->
<!--            <span class="formbold-btn btn z0" @click="changeAjouter" style="z-index: 0 ; background-color: #283777">Ajouter</span>-->

<!--            <table class="table table-rounded table-flush mt-5">-->


<!--                <tbody>-->
<!--                <tr class="text-danger border-bottom border-gray-200 ">-->
<!--                    <td>Nom :</td>-->
<!--                    <td>Prenom :</td>-->
<!--                    <td>Status :</td>-->
<!--                    <td>Téléphone :</td>-->
<!--                    <td>Email :</td>-->
<!--                    <td>Solde :</td>-->
<!--                    <td>Date de recrutement :</td>-->
<!--                    <td>N° CIN :</td>-->
<!--                    <td>Type de contrat :</td>-->
<!--                    <td>N° CNSS :</td>-->
<!--                </tr>-->

<!--                  <tr v-for="emp in employees" :key="emp.id_e">-->
<!--                    <td>{{ emp.nom }}</td>-->
<!--                    <td>{{ emp.prenom }}</td>-->
<!--                    <td>{{ emp.status }} </td>-->
<!--                    <td>{{ emp.tel }} </td>-->
<!--                    <td>{{ emp.email }} </td>-->
<!--                    <td>{{ emp.soldeConge }} </td>-->
<!--                    <td>{{ localString(emp.dateRecrutement) }} </td>-->
<!--                    <td>{{ emp.cin }} </td>-->
<!--                    <td>{{ typeCont(emp.typeContrat) }} </td>-->
<!--                    <td>{{ emp.cnss }} </td>-->
<!--                    <td><span @click="changeModifier(emp)" class="formbold-btn" style="background-color: #283777">Modifier</span> </td>-->
<!--                  </tr>-->
<!--                </tbody>-->
<!--            </table>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->


<!--    <div class="container-fluid">-->
<!--      <div class="row" >-->
<!--            <div class="col-md-5 offset-md-3 offset-1" >-->
<!--                <button @click="prevPage" class="w-35 btn pb-0" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>-->
<!--              <span class="m-2 fw-bolder ">Page {{ currentPage }}</span>-->
<!--                <button @click.prevent="nextPage" class="w-35 btn pb-0" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>-->
<!--            </div>-->
<!--          </div>-->
<!--    </div>-->



  <div class="card mb-4 mt-4">

    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Prenom</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Téléphone</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Solde</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date de recrutement</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">N° CIN</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Type de contrat</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">N° CNSS</th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="emp in employees" :key="emp.id_e">
            <td>
              <div class="d-flex px-2 py-1">

                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm text-center">{{ emp.nom }}</h6>
                  <!--                  <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>-->
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">

                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{emp.prenom}}</h6>
                  <!--                  <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>-->
                </div>
              </div>
            </td>


            <td class="text-center">
<!--              <p class="badge badge-sm bg-gradient-success" >{{ emp.status }}</p>-->
              <p class="badge badge-sm" style="width: 6vh;" :style="getStatus(emp.status)" >{{ emp.status }}</p>
              <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
            </td>

            <td>
              <p class="text-center text-xs font-weight-bold mb-0">{{ emp.tel }}</p>
              <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
            </td>

            <td class="align-middle text-center text-sm">
              <span class="text-xs font-weight-bold mb-0" >{{ emp.email }}</span>
            </td>

            <td class="align-middle text-center text-sm">
              <span class=" font-weight-bolder mb-0" >{{ emp.soldeConge }}</span>
            </td>

            <td>
              <p class="text-xs font-weight-bold mb-0">{{ localString(emp.dateRecrutement) }}</p>
              <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
            </td>

            <td>
              <p class="text-center text-xs font-weight-bold mb-0">{{ emp.cin }}</p>
            </td>

            <td>
              <p class="text-center text-xs font-weight-bold mb-0">{{ typeCont(emp.typeContrat) }}</p>
            </td>

            <td>
              <p class="text-center text-xs font-weight-bold mb-0">{{ emp.cnss }}</p>
            </td>
            <td><button @click="changeModifier(emp)" class="formbold-btn botton text-white" style="background-color: #283777"><i class="fas fa-edit"></i> Modifier</button> </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row" >
      <div class="col-md-5 offset-md-3 offset-1" >
        <button class="btn btn-outline-dark px-1 py-1 w-35" style="margin-bottom: 0px" @click="prevPage" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>
        <span class="m-2 fw-bolder ">Page {{ currentPage }}</span>
        <button @click.prevent="nextPage" class="btn py-1 btn-outline-dark w-35" style="padding-bottom: 2px;padding-top: 2px;margin-bottom: 0px;width: 40%" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>
        <!--        <button @click.prevent="nextPage" class="w-35 btn pb-0" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>-->
      </div>
    </div>
  </div>





</template>

<style scoped>
body{
    background-color: white;
}
.showAjouter{

    top: 10%;
    margin: auto;
}
.innerCard{
    width:100ch
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
.btn{
    width: 20vh;
}
.z0{
  z-index: 0;
}

</style>
<!-- <template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <authors-table />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <projects-table />
      </div>
    </div>
  </div>
</template>

<script>
import AuthorsTable from "./components/AuthorsTable.vue";
import ProjectsTable from "./components/ProjectsTable.vue";

export default {
  name: "tables",
  components: {
    AuthorsTable,
    ProjectsTable
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
        trip: {
          title: "Today's Trip",
          desc: "145 KM",
          classIcon: "text-dark ni ni-money-coins",
        },
        health: {
          title: "Battery Health",
          desc: "99 %",
          classIcon: "text-dark ni ni-controller ",
        },
        speed: {
          title: "Average Speed",
          desc: "56 Km/h",
          classIcon: "text-dark ni ni-delivery-fast",
        },
        volume: {
          title: "Music Volume",
          desc: "15/100",
          classIcon: "text-dark ni ni-note-03",
        },
      },
    };
  },
};
</script> -->
