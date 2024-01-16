<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            demandes: null,
            showMotif:false,
            raisonRefusion:null,
            idPourRefuser:null,
            currentPage: 1,
            totalPages: 1,
          demPourRefuser:null,
          solde:0,
          numberOfDays:0
        }
    },
    methods:{
        localString(d){
            const formattedDate = moment(d).format('YYYY-MM-DD');
            return formattedDate;
        },

        findEmpClass(etat){
            return{
                'etat-green': etat === 'Approuvé',
                'etat-red': etat === 'Refusé',
                'etat-yellow': etat === 'En Attente',
            }
        },
        async showConfirmationAccepter(dem) {
            const result = await Swal.fire({
                title: 'etes vous sure?',
                text: 'Accepter le demande !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, Accepter !',
                cancelButtonText: 'No, Annuler !',
            });

            if (result.isConfirmed) {
                this.accepterConge(dem)
                // console.log("l'operation a ete passe",dem)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("l'operation a ete annuler")
            }
        },
        async showConfirmationRefuser(dem) {
            const result = await Swal.fire({
                title: 'etes vous sure?',
                text: 'Refuser le demande !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, Refuser !',
                cancelButtonText: 'No, Annuler !',
            });

            if (result.isConfirmed) {
                this.refuserConge(dem)
                // console.log("l'operation a ete passe",dem)
                this.fetchData()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("l'operation a ete annuler")
            }
        },

      async getSolde(id) {
        // Assuming you have an employee ID
        const employeeId = id;

        try {
          // Make an asynchronous request using async/await
          const response = await axios.post('http://localhost:3000/getsolde', { id_e: employeeId });

          // Extract the soldeConge value from the response
          const soldeConge = response.data.solde[0].soldeConge;

          // Assign the value to the Solde variable
          this.Solde = soldeConge;

          // If you want to return Solde, you can do that
          return soldeConge;
        } catch (error) {
          // Handle errors here
          console.error(error, "Error retrieving employee solde");
          // Return a default value or handle the error as needed
          return null;
        }
      },
      async getNumberOfDays(debut,fin) {
        try {
          const response = await axios.get('/calculate-days', {
            params: {
              dateDebut: debut, // Replace with your start date
              dateFin: fin,   // Replace with your end date
            },
          });

          // Assign the response to the data variable
          this.numberOfDays = response.data.numberOfDays;
          console.log('Number of days:', this.numberOfDays);
        } catch (error) {
          console.error('Error fetching number of days:', error);
        }
      }
      ,
      async accepterConge(demande) {
        try {
          // Get the solde value using getSolde
          const solde = await this.getSolde(demande.id_e);

          // Make the request to accept the leave
          const response = await axios.put('http://localhost:3000/accepterconge', demande);

          console.log('Le congé a été accepté');
          console.log(response.data);
          this.getNumberOfDays(demande.dateDebut,demande.dateFin)
          // Construct the email message
          const messageEmail = {
            objet:'Acceptation de votre demande de congé',
            to: response.data.employeeData.email,
            message: `Bonjour,
            Nous sommes ravis de vous informer que votre demande de congé pour la période du ${this.localString(demande.dateDebut)} au ${this.localString(demande.dateFin)} a été acceptée.
            Vous bénéficiez d'une durée de ${this.numberOfDays} jours de congé, et votre reliquat après cette demande est de ${solde} jours.
            Cordialement.`,
          };

          // Send the email
          this.sendEmail(messageEmail);

          // Refresh the data
          this.fetchData();
        } catch (error) {
          this.showErrorMessage('Solde insuffisant !!.');
          console.error(error, 'L\'opération a échoué');
        }
      }






      ,
        showErrorMessage(message){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
            });
        },
        Motif(dem){
            this.showMotif=!this.showMotif
            // this.idPourRefuser=id
            this.demPourRefuser=dem
            // this.refuserConge(id)
        },
        annulerRefuser(){
            this.showMotif=!this.showMotif
            this.raisonRefusion=''
        },
        showInfoMessage(message) {
            Swal.fire({
                icon: 'info',
                title: 'Raison de refusion',
                text: message,
                confirmButtonText: 'OK',
            });
        },
        refuserConge(dem){
            // const id_co = this.idPourRefuser
            const id_co = this.demPourRefuser.id_co
            const raisonRefusion = this.raisonRefusion
            console.log(id_co)
            // console.log(raisonRefusion)
          const demande ={
              id_co: id_co,
            raisonRefusion: raisonRefusion,
            id_e:dem.id_e,
          }

            axios.put('http://localhost:3000/refuserconge',demande)
                .then(response=>{
                    console.log('Le congé a ete refusé',response)
                    this.showMotif=false
                  const messageEmail = {
                    objet:'Réponse à votre demande de congé',
                    to : response.data.employeeData.email,
                    message:`Bonjour,
                    Nous avons pris connaissance de votre demande de congé pour la période du ${this.localString(demande.dateDebut)} au ${this.localString(demande.dateFin)} . Après avoir examiné attentivement la situation actuelle de l'équipe et les impératifs opérationnels, nous regrettons de vous informer que votre demande de congé n'a pas été approuvée.
                    Nous restons ouverts à la discussion et à l'exploration de solutions alternatives si vous avez des préoccupations ou des questions. Merci de votre compréhension.
                    Cordialement.

                    Motif : ${demande.raisonRefusion}
                    `
                  }
                  this.sendEmail(messageEmail)
                  this.fetchData()
                })
                .catch(error=>{
                        console.log(error , ' l operation a ete echoué' )
                    }
                )
            this.fetchData()
        },
        loadPage(){
            axios.get('http://localhost:3000/demandesadmin')
                .then(response =>{
                    // console.log(response.data)
                    this.demandes=response.data
                })
                .catch(error=>{
                    console.log(error)

                })
        },
        ////////////////////////////                L'envoi du message par mail        //////////////////////////////
        sendEmail(cong) {
            const emailData = {
                to: cong.to,
                subject: cong.objet,
                text: cong.message
            };

            axios.post('http://localhost:3000/send-email', emailData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        ///////////////////////////////                       10 pour 10            ////////////////////////////////////////////
        async fetchData() {
            try {
                const obj = {page : this.currentPage}
                const response = await axios.post(`http://localhost:3000/api/demandes`, obj);
                const data = response.data;
                // console.log("hada total : ",data.total)
                // Assuming the total count is sent from the server
                this.totalPages = Math.ceil(data.total / 10);
                // console.log('totalPages = ',this.totalPages)
                this.demandes = data.res;
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
    },

    mounted() {
        // this.loadPage()
        this.fetchData()
    }
}

</script>

<template>
    <div v-if="showMotif" class="container-fluid position-absolute showMotif w-50  h-25">
        <span class="text-danger fw-bolder">Raison de refusion :</span>
        <textarea class="w-100 h-75" v-model="raisonRefusion"></textarea>
        <div class="cont">
            <span class="btn btn-primary" @click="showConfirmationRefuser(demPourRefuser)">Continue</span>
            <span class="btn btn-warning" @click="annulerRefuser" >Annuler</span>

        </div>
    </div>
    <table class="table table-rounded mt-5 table-flush w-75">

        <thead>
        <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4 text-primary">
            <th>Nom d'employé :</th>
            <th>Date de demande :</th>
            <th>Date de debut :</th>
            <th>Date de fin :</th>
            <th>Motif :</th>
            <th>Etat :</th>

        </tr>
        </thead>
        <tbody class="fw-bold">
        <tr v-for="dem in demandes" :key="dem.id_co">
            <td>{{ dem.nom }}</td>
            <td>{{ localString(dem.dateAc) }}</td>
            <td>{{localString(dem.dateDebut) }}</td>
            <td>{{localString(dem.dateFin) }} </td>
            <td>{{ dem.motif }} </td>
            <td v-if="dem.etat ==='En Attente'" class="tdd" ><i @click="showConfirmationAccepter(dem)" class="bi btn bi-check2-square ms-5 text-white bg-success"></i><i @click="Motif(dem)" class="bi btn bi-slash-circle text-white bg-danger"></i></td>
            <td v-if="dem.etat !=='En Attente'" class="tdd"  :class="findEmpClass(dem.etat)" >{{ dem.etat }} <i v-if="dem.etat==='Refusé'" class="bi bi-question-square cursor-pointer icon ms-5" @click="showInfoMessage(dem.raisonRefusion)"></i>   </td>
        </tr>
        </tbody>
    </table>
<!--    <div class="container-fluid fixed-bottom">-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 offset-3">
                <button @click="prevPage" class="btn" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>
                <span class="m-1">Page {{ currentPage }}</span>
                <button @click.prevent="nextPage" class="btn" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-3"></i></button>
            </div>
        </div>
    </div>
  <!--    <table class="table table-rounded mt-5 table-flush m-auto">-->

  <!--        <thead>-->
  <!--        <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4 text-primary">-->
  <!--            <th>Date de demande :</th>-->
  <!--            <th>Date de debut :</th>-->
  <!--            <th>Date de fin :</th>-->
  <!--            <th>Motif :</th>-->
  <!--            <th>Etat :</th>-->

  <!--        </tr>-->
  <!--        </thead>-->
  <!--        <tbody class="fw-bold">-->
  <!--        <tr v-for="dem in demandes">-->
  <!--            <td>{{ localString(dem.dateAc) }}</td>-->
  <!--            <td>{{localString(dem.dateDebut) }}</td>-->
  <!--            <td>{{localString(dem.dateFin) }} </td>-->
  <!--            <td>{{ dem.motif }} </td>-->
  <!--            <td :class="findEmpClass(dem.etat)">{{ dem.etat }} </td>-->
  <!--        </tr>-->
  <!--        </tbody>-->
  <!--    </table>-->
</template>

<style scoped>
.showMotif{
    background-color: white;
    top: 40%;
    left: 25%;
    border: 1px solid black;
    border-radius: 10px;
}
.cont{
    right: 20%;
    margin-left: 40%;
}
.etat-green{
    background-color: rgba(76, 175, 80, 0.55);
}
.etat-red{
    background-color: rgba(255, 0, 0, 0.48);
}
.etat-yellow{
    background-color: rgba(255, 255, 0, 0.47);
}
.bi-slash-circle{
    margin-left: 60px;
}

.foot{
    top:100%;
}
.tdd{
  width: 15%;
}

</style>