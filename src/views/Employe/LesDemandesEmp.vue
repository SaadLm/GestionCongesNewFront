<script>
import axios from 'axios'
import moment from "moment/moment";
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';
import PdfTemplate from "@/views/Employe/PdfTemplate.vue";
import jwt_decode from "jsonwebtoken/decode";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf';
// import Vue from 'vue';
export default {
  components: {
    PdfTemplate,
  },
  data(){
    return{
      nbr:null,
      employe:null,
      demandes:null,
      raisonPourChaqueDemande:null,
      showRaison:null,
      NomPrenom: '',
      Fonction: '',
      dateDebut: null,
      dateFin: null,
      duree:null,
      rest: null,
      numberOfDays:null,
      currentPage: 1,
      totalPages: 1,
      emp:null
    }
  },
  methods:{
    localString(d){
      const formattedDate = moment(d).format('YYYY-MM-DD');
      return formattedDate;
    },

    findEmpClass(etat) {
      return {
        'etat-green': etat === 'Approuvé',
        'etat-red': etat === 'Refusé',
        'etat-yellow': etat === 'En Attente',
      }
    },
    showInfoMessage(message) {
      Swal.fire({
        icon: 'info',
        title: 'Raison de refus',
        text: message,
        confirmButtonText: 'OK',
      });
    },
    show(raison) {
      // console.log(raison)
      this.showRaison = !this.showRaison
      // console.log(this.showRaison)
      this.raisonPourChaqueDemande = raison
    },

    annuler(id) {
      // Use window.confirm to show a confirmation dialog
      const isConfirmed = window.confirm("Confirmer l'annulation ?");

      // Check the result of the confirmation dialog
      if (isConfirmed) {
        console.log("User confirmed. Performing cancel action.")
        axios.delete(`http://localhost:3000/api/annulerdemande/${id}`)
            .then(response => {
              console.log(response.data.success)
              this.fetchData()
            })
            .catch(err => {
              console.error(err.data.message)
            })
      } else {
        // User clicked "Cancel" (did not confirm)
        console.log("User canceled the action.");
        // Add any additional action you want when the user cancels

      }
    },

    getData() {
      axios.post('http://localhost:3000/demandeemp', this.employe)
          .then(response => {
            // console.log(response.data)
            this.demandes = response.data
          })
          .catch(error => {
            console.log(error)

          })
    },
    async fetchData() {
      try {
        const token =localStorage.getItem('token')
        //
        const decodedToken = jwt_decode(token);
        const id = decodedToken.id;
        const obj = {page: this.currentPage, id_e: id}
        const response = await axios.post(`http://localhost:3000/demandesemploye`, obj);
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
        // console.log('prev')
        this.currentPage -= 1;
        // console.log(this.currentPage)
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        // console.log(this.currentPage)
        this.fetchData();
      }
    },
    // async savePdf(){
    //
    //   const templateContainer = document.createElement('div');
    //   const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
    //
    //
    //
    //   // Append the template content to the container
    //   templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;
    //
    //   // Set options for html2pdf
    //   const options = {
    //     margin:       1,
    //     filename:     'myfile.pdf',
    //     image:        { type: 'jpeg', quality: 0.98 },
    //     html2canvas:  { scale: 2 },
    //     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    //   };
    //
    //   // Generate the PDF
    //   await html2pdf().set(options).from(templateContainer).save();
    //
    //
    //
    // }
    // ,
    async getEmp(id) {
      const obj = {id_e: id}

      //axios.post('http://localhost:3000/emp', obj)//
      axios.post('http://localhost:3000/emp', obj)
          .then(response => {
            // console.log(response.data)
            this.emp = response.data.employeeData
          })
          .catch(err => {
            console.error(err)
          })
    },
    async getSolde(id) {
      // Assuming you have an employee ID
      const employeeId = id;

      try {
        // Make an asynchronous request using async/await
        const response = await axios.post('http://localhost:3000/getsolde', {id_e: employeeId});

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
    async getNumberOfDays(debut, fin) {
      try {
        const response = await axios.get('http://localhost:3000/calculate-days', {
          params: {
            dateDebut: debut, // Replace with your start date
            dateFin: fin,   // Replace with your end date
          },
        });

        // Assign the response to the data variable
        this.numberOfDays = response.data.numberOfDays;

        // console.log(this.numberOfDays,' le nombre')

      } catch (error) {
        console.error('Error fetching number of days:', error);
      }
    },
    async generatePDF(dem) {

      this.Fonction = ''   // initialisation
      await this.getEmp(dem.id_e)
      // Create a temporary div to hold the template content
      await this.getNumberOfDays(dem.dateDebut, dem.dateFin)
      const solde = await this.getSolde(this.employe.id_e);


      this.NomPrenom = this.employe.nom + ' ' + this.employe.prenom
      const nomPDF = 'Conge '+this.NomPrenom+'.pdf'
      this.dateDebut = this.localString(dem.dateDebut)
      this.dateFin = this.localString(dem.dateFin)
      this.duree = this.numberOfDays
      this.rest = solde
      this.Fonction = this.emp.fonction


      const templateContainer = document.createElement('div');
      const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
      setTimeout(async function () {


            // Append the template content to the container
            templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;

            // Set options for html2pdf
            const options = {
              margin: 0,
              filename: nomPDF,
              image: {type: 'jpeg', quality: 0.98},
              html2canvas: {scale: 1},
              jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
            };

            // Generate the PDF
            await html2pdf().set(options).from(templateContainer).save()
          }


          , 1500)

    },
    async fetchEmp(){
      const token =localStorage.getItem('token')
      //
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;
      const obj={id_e:id}
      await axios.post('http://localhost:3000/getsolde',obj)
          .then(response=>{
            this.nbr=response.data.solde[0].soldeConge
            this.employe.soldeConge=response.data.solde[0].soldeConge
            this.NomPrenom =  response.data.solde[0].nom+ ' ' + response.data.solde[0].prenom
          })
          .catch(err=>{
            console.error(err,"ereur de recuperer le solde d'employé")
          })
    }
  },

  mounted() {

      // console.log(obj.id_e)
      this.fetchEmp()

    // const id_emp=this.employe.id_e
    // this.getData()
    this.fetchData()
    // if(this.$store.state.darkMode){
    //     console.log('K7ell')
    // }
    // else {
    //     console.log('byeddd')
    // }


  }
  ,
  beforeMount() {
    // const user = localStorage.getItem('employe')
    // this.employe = JSON.parse(user);
    const token =localStorage.getItem('token')
    //
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;
    // this.getEmp(id)
    axios.post('http://localhost:3000/emp',{id_e:id})
        .then(response=>{
          this.employe=response.data.employeeData
        })
        .catch(err=>alert(err))

  },
  created() {
    document.title = 'Gestion des congés';
  }
}

</script>

<template>
  <pdf-template ref="pdfTemplate"
                :NomPrenom="NomPrenom"
                :dateDebut="dateDebut"
                :dateFin="dateFin"
                :duree='duree'
                :Fonction="Fonction"
                :rest='rest'
                style="display: none"
  />

  <div v-if="showRaison" class="container-fluid position-absolute showRaison w-50  h-25">
    <span>{{ this.raisonPourChaqueDemande }}</span>
  </div>
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col-md-3  col-sm-8 mt-7 ">
        <div class="card shadow-right-bottom p-3">
          <span class="text-primary fw-bolder ms-1">Reliquat de Congé :</span> <br>
          <span class="text-center fw-bolder">{{ nbr}} jours</span>
        </div>
      </div>
    </div>
    <div class="row">


<!--      <table class="table table-rounded mt-5 table-flush w-50">-->

<!--        <thead>-->
<!--        <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4 text-primary">-->
<!--          <th>Date de demande :</th>-->
<!--          <th>Date de debut :</th>-->
<!--          <th>Date de fin :</th>-->
<!--          <th>Motif :</th>-->
<!--          <th>Etat :</th>-->

<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody class="fw-bold">-->
<!--        <tr v-for="dem in demandes" :key="dem.id_co">-->
<!--          <td><span class="p-4">{{ localString(dem.dateAc) }}</span></td>-->
<!--          <td>{{ localString(dem.dateDebut) }}</td>-->
<!--          <td>{{ localString(dem.dateFin) }}</td>-->
<!--          <td>{{ dem.motif }}</td>-->
<!--          &lt;!&ndash;            <td v-if="this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>&ndash;&gt;-->
<!--          &lt;!&ndash;            <td v-if="!this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>&ndash;&gt;-->
<!--          <td :class="findEmpClass(dem.etat)"><span class="text-dark fw-bolder">{{ dem.etat }} </span></td>-->
<!--          <td @click="showInfoMessage(dem.raisonRefusion)" v-if="dem.raisonRefusion" class="btn">voir le raison</td>-->
<!--          <td @click="annuler(dem.id_co)" v-if="dem.etat==='En Attente'"><span-->
<!--              class="btn btn-danger py-2 px-4">Annuler</span></td>-->
<!--          <td @click="generatePDF(dem)" v-if="dem.etat==='Approuvé'" class="btn w-75 px-5"><i-->
<!--              class="bi bi-file-earmark-pdf text-success fw-bold icon" title="Telecharger le PDF"></i></td>-->


<!--        </tr>-->


<!--        </tbody>-->
<!--      </table>-->

      <div class="col-md-10 card ms-2 mb-4 mt-5">
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date de demande</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date de debut</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date de fin</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Motif</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Etat</th>
                <th class="text-secondary text-center opacity-7"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="dem in demandes" :key="dem.id_co">
                <td>
                  <div class="d-flex px-2 py-1">

                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ dem.nom }} {{dem.prenom}}</h6>
                      <!--                  <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>-->
                    </div>
                  </div>
                </td>

                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ localString(dem.dateAc) }}</p>
                  <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
                </td>

                <td>
                  <p class="text-xs text-center font-weight-bold mb-0">{{ localString(dem.dateDebut) }}</p>
                  <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
                </td>

                <td>
                  <p class="text-xs text-center font-weight-bold mb-0">{{ localString(dem.dateFin) }}</p>
                  <!--              <p class="text-xs text-secondary mb-0">Organization</p>-->
                </td>

                <td class="align-middle text-center text-sm">
                  <!--              <span class="badge badge-sm bg-gradient-success">{{ dem.motif }}</span>-->
                  <span class="text-xs font-weight-bold mb-0 font-weight-bold">{{ dem.motif }}</span>
                </td>

                <td class="text-center"
                     >
<!--                    :class="findEmpClass(dem.etat)" -->
                <span :class="findEmpClass(dem.etat)" class="badge badge-sm fw-bolder w-70">{{ dem.etat }} </span></td>
<!--                <td @click="showInfoMessage(dem.raisonRefusion)" v-if="dem.raisonRefusion" ><span class=" fw-bolder text-center cursor-pointer">voir le raison</span></td>-->
                <td @click="showInfoMessage(dem.raisonRefusion)" v-if="dem.etat==='Refusé'" ><i class="bi bi-question-square cursor-pointer icon ms-5" @click="showInfoMessage(dem.raisonRefusion)"></i></td>
                <td @click="annuler(dem.id_co)" v-if="dem.etat==='En Attente'"><span
                    class="btn btn-danger py-2 px-4">Annuler</span></td>
                <td @click="generatePDF(dem)" v-if="dem.etat==='Approuvé'" class="btn w-75 px-5"><i
                    class="bi bi-file-earmark-pdf text-success fw-bold icon" title="Telecharger le PDF"></i></td>

              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>





    </div>
  </div>

  <div class="container-fluid ">
    <div class="row">
      <div class="col-md-4 offset-sm-2">
        <button class="btn btn-outline-dark px-1 py-1 w-35" style="margin-bottom: 0px" @click="prevPage" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>
        <span :disabled="1==1" class="m-2 fw-bolder ">Page {{ currentPage }}</span>
        <button @click.prevent="nextPage" class="btn py-1 btn-outline-dark w-35" style="padding-bottom: 2px;padding-top: 2px;margin-bottom: 0px;width: 40%" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>

        <!--        <span @click.prevent="nextPage" class="btn" :disabled="currentPage === totalPages">Next<i-->
<!--            class="bi bi-arrow-right-square ms-3"></i></span>-->

      </div>
    </div>
  </div>


</template>

<style scoped>
.btn {
  padding-bottom: 0px;
}

.showRaison {
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
}

table {
  width: 80pc;
}

.etat-green {
  background-color: #4caf50;
}

.etat-red {
  background-color: red;
}

.etat-yellow {
  background-color: #ff6200;
}
</style>