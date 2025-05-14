<script>
import axios from "axios"
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            showAjouter:false,
            showModifier:false,
            lesJourFerie:[],
            jour:{
                nom:null,
                dateJour:null,
                mois:null
            },
            jourPourModifier:null,
            maxMois:12,
            err:null,
            errModifier:null,
            employees:null,
            idE:null,
            showPass:false,
            newPass:null
        }
    },
    methods:{

        verify(){

            const thirty = [11, 9, 6, 4]
            const thirtyOne = [12, 10, 8, 7, 5, 3, 1]
            const twentyEight = [2]
            const twentyNine = []
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const rest= (currentYear-2020)/4
            // console.log(rest)
            if(rest!==0) {
                twentyEight.splice(0, 1);
                twentyNine.push(2)
            }

            var max = 31


            for (let i of twentyEight) {
                if(i == this.jour.mois){
                    max = 28
                }
                if (this.jour.dateJour >max) {
                    this.jour.dateJour = '';
                }
            }
            for (let i of twentyNine) {
                if(i == this.jour.mois){
                    max = 29
                }
                if (this.jour.dateJour >max) {
                    this.jour.dateJour = '';
                }
            }
            for (let i of thirty) {
                if(i == this.jour.mois){
                    max = 30
                }
                if (this.jour.dateJour >max) {
                    this.jour.dateJour = '';
                }
            }
            for (let i of thirtyOne) {
                if(i == this.jour.mois){
                    max = 31
                }
                if (this.jour.dateJour >max) {
                    this.jour.dateJour = '';
                }
            }


        }
        ,
        changeAjouter(){
            this.showAjouter=!this.showAjouter
            this.err=''
        },
        changeModifer(item){
            const JourPourModifier ={nom:item.nom,dateJour:item.dateJour,mois:item.mois,id_Jour:item.id_Jour}
            this.jour=JourPourModifier
            this.errModifier=''
            this.showModifier=!this.showModifier
        },
        changeShowPass(){
            this.showPass=!this.showPass
        },
        ajouterJour(){
            if (this.jour.nom == null || this.jour.dateJour == null || this.jour.mois == null) {
                this.err = 'Merci de remplir les champs';
            }

            else{

                console.log(this.jour.mois)
                // console.log(this.jour)
                fetch('http://localhost:3000/ajoutjour', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.jour)
                })
                    .then(response =>{
                            if (response.ok) {
                                this.showSuccessMessage('Jour Ajouté',this.refreshTable())
                                return response.json();
                            } else {
                                throw new Error('Failed to create jour');
                            }
                        }
                    )
            }
        }
        ,
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
        refreshTable(){
            axios.get('http://localhost:3000/joursferies')
                .then(response => {
                    console.log(response.data);
                    this.lesJourFerie = response.data;

                })
                .catch(error => {
                    console.error('Error fetching les jours fériés:', error);
                    // Handle the error
                });
        },
        modifierJour() {
            // console.log('nom:', this.jour.nom);
            // console.log('dateJour:', this.jour.dateJour);
            // console.log('mois:', this.jour.mois);
            //

            if (this.jour.nom === '' || this.jour.dateJour == 0 || this.jour.mois == 0) {
                this.errModifier = 'Merci de remplir les champs';
                console.log(this.errModifier)
            }
            else {

                console.log(this.jour)
                axios.put('http://localhost:3000/modifierjour', this.jour)
                    .then(response => {
                        console.log('Jour modifié',response)
                        this.showSuccessMessage('Jour modifié')
                        this.showModifier = false
                        this.fetchData()
                    }).catch(error => {
                    console.log("Jour n'a pas modifié")
                    console.log(error.response.data.error)
                })
            }
        },
      async suprimerConfirmation(item){

          const result = await Swal.fire({
            title: 'Etes vous sure?',
            text: "Voulez vous vraiment siprimer le jour !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, Accepter !',
            cancelButtonText: 'No, Annuler !',
          });

          if (result.isConfirmed) {
            this.suprimerJour(item)
            // console.log("l'operation a ete passe",dem)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log("l'operation a ete annuler")
          }






      },
      suprimerJour(item){
          axios.delete(`http://localhost:3000/suprimerjour/${item.id_Jour}`,item)
              .then(response=>{console.log(response);this.fetchData()}).catch(err=>console.log(err))
      },
        fetchData(){
        axios.get('http://localhost:3000/joursferies')
            .then(response => {
                // console.log(response.data);
                this.lesJourFerie = response.data;

            })
            .catch(error => {
                console.error('Error fetching les jours fériés:', error);
                // Handle the error
            });
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
    },
    mounted() {
        this.fetchData()

    },
  created() {
    document.title = 'Gestion des congés';
  }
}
</script>

<template>


    <div v-if="showModifier" class="container-fluid position-absolute showAjouter" style="z-index: 100">
        <div class="row innerCard">
            <div class="col-md-5 col-lg-9 col-xl-7 offset-1">
                <div class="card bg-gradient shadow-2-strong" style="border-radius: 10px;">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Modification</h3>

                        <div class="row">

                            <div class="col-md-6">

                                <div class="form-outline">
                                    <label class="form-label" >Nom de jour :</label>
                                    <input v-model="jour.nom" type="text"  class="form-control form-control-lg" />
                                </div>

                            </div>
                            <div class="col-md-2">
                                <div class="form-outline">
                                  <label class="me-1">J</label><br><input class="form-control" v-model="jour.dateJour" id="day" type="number" @change="verify">
                                </div>
                            </div>
                            <div class="col-md-1">/</div>
                            <div class="col-md-2">
                                  <div class="form-outline">
                                  <label class="me-1">M</label><input :max="maxMois" class="form-control" v-model="jour.mois" type="number" @change="verify">

                                  </div>
                              </div>
<!--                                    <span class="mx-3">/</span>-->
                        </div>
                        <span class="text-danger fw-bolder">{{errModifier}}</span>
                        <div class="mt-4 pt-2 d-flex">
                            <button @click="modifierJour" class="formbold-btn">Modifier</button>
                            <button @click="changeModifer" class="formbold-btn btn-lg ms-3">Retour</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showAjouter" class="container-fluid position-absolute showAjouter" style="z-index: 99">
        <div class="row innerCard">
            <div class="col-md-5 col-lg-9 col-xl-7 offset-1">
                <div class="card bg-gradient shadow-2-strong" style="border-radius: 10px;">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Ajout des jours fériés</h3>

                        <div class="row">

                            <div class="col-md-6 ">

                                <div class="form-outline">
                                    <label class="form-label" >Nom de jour :</label>
                                    <input v-model="jour.nom" type="text"  class="form-control form-control-lg" />
                                </div>

                            </div>
                            <div class="col-md-2">

                                <div class="form-outline ">
                                    <label >J</label><br><input class="form-control" v-model="jour.dateJour" id="day" type="number" @change="verify">
                                </div>
                            </div>
                            <div class="col-md-1 ">
                              /
                            </div>
                          <div class="col-md-2">
                              <div class="form-outline ">
                                    <label >M</label><br><input class="form-control" :max="maxMois"  v-model="jour.mois" type="number" @change="verify">
                                </div>

                          </div>
                        </div>

                        <span class="text-danger fw-bolder">{{err}}</span>
                        <div class="mt-4 pt-2 d-flex">
                            <button @click="ajouterJour" class="formbold-btn">Ajouter</button>
                            <button @click="changeAjouter" class="formbold-btn btn-lg ms-3">Retour</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">

        <div class="row mt-5">
            <div class="col-md-9">
                <div class="d-flex mt-3">
                <h2>Les jours fériés :</h2><button @click="changeAjouter" class="formbold-btn btn ms-3 px-3 py-1" style="background-color: #283777 ; width:fit-content"><i class="fas fa-plus me-2"></i>Ajouter</button>
                </div>

              <div class="card mb-4 mt-4">

                <div class="card-body px-0 pt-0 pb-2">
                  <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                      <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom de jour férié</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
                      </tr>
                      </thead>
                      <tbody>
                    <tr v-for="item in lesJourFerie" :key="item.id_Jour">
                        <td class="align-middle text-sm">
                          <span class=" font-weight-bolder mb-0" >{{item.nom}}</span>
                        </td>

                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{ item.dateJour }}/{{ item.mois}}</p>
                          <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
                        </td>

                        <td>
                          <button @click="changeModifer(item)" class="formbold-btn text-center text-xs font-weight-bold mb-0" style="background-color: #283777;width: fit-content"><i class="fas fa-edit"></i>Modifier</button>
                        </td>
                      <td>
                          <button @click="suprimerConfirmation(item)" class="formbold-btn text-center text-xs font-weight-bold mb-0" style="background-color: red;width: fit-content"><i class="fas fa-trash"></i>Supmimer</button>
                        </td>

                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


<!--                <table class="table table-rounded table-flush mt-5">-->

<!--                    <thead>-->
<!--                    <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4 text-primary">-->
<!--                        <th>Nom de jour férié:</th>-->
<!--                        <th>Date :</th>-->
<!--                    </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->

<!--                    <tr v-for="item in lesJourFerie" :key="item.id_Jour">-->
<!--                        <td>{{item.nom}}</td>-->
<!--                        <td>{{ item.dateJour }}/{{ item.mois}}</td>-->
<!--                        <td @click="changeModifer(item)" class="formbold-btn" style="background-color: #283777;width: fit-content"><i class="fas fa-edit"></i>Modifier</td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                </table>-->
            </div>
        </div>
    </div>

</template>

<style scoped>

.showAjouter{
    margin-top: 10%;
}
td{
    padding: 10px;
}
.formbold-btn {
    width: 20vh;
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
.formbold-form-label {
    color: #07074D;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
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
.confirmer{
    background-color: #6a64f1;
    color: white;
    font-weight: bolder;
}
</style>