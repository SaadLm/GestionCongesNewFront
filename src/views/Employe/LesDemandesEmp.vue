<script>
import axios from 'axios'
import moment from "moment/moment";
import Swal from 'sweetalert2';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf';
import html2pdf from 'html2pdf.js';
import PdfTemplate from "@/views/Employe/PdfTemplate.vue";
// import Vue from 'vue';
export default {
  components: {
    PdfTemplate,
  },
    data(){
        return{
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

        findEmpClass(etat){
            return{
                'etat-green': etat === 'Approuvé',
                'etat-red': etat === 'Refusé',
                'etat-yellow': etat === 'En Attente',
            }
        },
        showInfoMessage(message) {
            Swal.fire({
                icon: 'info',
                title: 'Raison de refusion',
                text: message,
                confirmButtonText: 'OK',
            });
        },
        show(raison){
            console.log(raison)
            this.showRaison=!this.showRaison
            console.log(this.showRaison)
            this.raisonPourChaqueDemande = raison
        },

        annuler(id){
            // Use window.confirm to show a confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to cancel?");

            // Check the result of the confirmation dialog
            if (isConfirmed) {
                console.log("User confirmed. Performing cancel action.")
                axios.delete(`http://localhost:3000/api/annulerdemande/${id}`)
                    .then(response=>{
                        console.log(response.data.success)
                        this.fetchData()
                    })
                    .catch(err=>{
                        console.error(err.data.message)
                    })
            } else {
                // User clicked "Cancel" (did not confirm)
                console.log("User canceled the action.");
                // Add any additional action you want when the user cancels

            }
        }
        ,
        getData(){
            axios.post('http://localhost:3000/demandeemp',this.employe )
                .then(response =>{
                    console.log(response.data)
                    this.demandes=response.data
                })
                .catch(error=>{
                    console.log(error)

                })
        },
        async fetchData() {
            try {
                const obj = {page : this.currentPage,id_e:this.employe.id_e}
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
      async getEmp(id){
          const obj = {id_e:id}

          axios.post('http://localhost:3000/emp',obj)
              .then(response=>{
                console.log(response.data)
                this.emp=response.data.employeeData
              })
              .catch(err=>{
                console.error(err)
              })
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

          this.Fonction=''   // initialisation
          await this.getEmp(dem.id_e)
          // Create a temporary div to hold the template content
          await this.getNumberOfDays(dem.dateDebut,dem.dateFin)
          const solde = await this.getSolde(this.employe.id_e);


          this.NomPrenom= this.employe.nom+' '+this.employe.prenom
          this.dateDebut= this.localString(dem.dateDebut)
          this.dateFin= this.localString(dem.dateFin)
          this.duree= this.numberOfDays
          this.rest= solde
          this.Fonction = this.emp.fonction


            const templateContainer = document.createElement('div');
            const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
          setTimeout(async function() {




            // Append the template content to the container
            templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;

            // Set options for html2pdf
            const options = {
              margin:       1,
              filename:     'myfile.pdf',
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { scale: 1 },
              jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate the PDF
            await html2pdf().set(options).from(templateContainer).save()}


          , 1500)






//////////////////////          2                 ////////////////////////
//           var element = document.getElementById('temp');
//           var opt = {
//             margin:       1,
//             filename:     'myfile.pdf',
//             image:        { type: 'jpeg', quality: 0.98 },
//             html2canvas:  { scale: 2 },
//             jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//           };
//
// // New Promise-based usage:
//           html2pdf().set(opt).from(element).save();
//
// // Old monolithic-style usage:
// //           html2pdf(element, opt);
//
//




/////////////                    1                  ////////////////////////////////////
          console.log(dem)
            // const pdf = new jsPDF();
            // const objetDemande = {
            //     nom:this.employe.nom,
            //     prenom:this.employe.prenom,
            //     DateDebut : this.localString(dem.dateDebut),
            //     DateFin : this.localString(dem.dateFin),
            //     Etat : dem.etat
            // }
            // // Set styles for the PDF content
            // pdf.setFontSize(12);
            // pdf.setTextColor(0, 0, 0); // Black color
            //
            // // Start at a Y position (e.g., 10) for the first line
            // let yPos = 10;
            //
            // // Iterate through object properties and add them to the PDF
            // for (const key in objetDemande) {
            //     if (Object.hasOwnProperty.call(objetDemande, key)) {
            //         const value = objetDemande[key];
            //
            //         // Add the key-value pair to the PDF
            //         pdf.text(`${key}: ${value}`, 10, yPos);
            //
            //         // Increment Y position for the next line
            //         yPos += 10; // Adjust the spacing as needed
            //     }
            // }
            //
            // // Save or open the PDF
            // pdf.save('Approuvation.pdf');
        },
    },
    mounted() {
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
        const user=localStorage.getItem('employe')
        this.employe=JSON.parse(user);
    }
}

</script>

<template>
  <pdf-template ref="pdfTemplate"
                :NomPrenom="NomPrenom"
                :dateDebut="dateDebut"
                :dateFin= "dateFin"
                :duree= 'duree'
                :Fonction="Fonction"
                :rest= 'rest'
                style="display: none"
  />
<!--  <div class="w-100 bg-white" id="temp">-->
<!--    <div class="row">-->
<!--      <div class="col-md-4">-->
<!--        <img src="../../assets/img/logo.png" alt="Company Logo" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--        <div class="col-md-4 offset-8">-->
<!--          <span class="fw-bold mt-3">Rabat le : {{ localString(new Date())}}</span>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <h1 class="text-center"> Demande de congé annuel </h1>-->
<!--    </div>-->
<!--    <div class="row mt-10">-->
<!--      <h3 >Nom et Prénom : Saad Emp</h3>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <h3 >Du (inclut) : ………18/01/2024……   Au (inclut) : ……19/01/2024……   </h3>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <h3 >Durée du congé (en jours ouvrables) : ………{{ nbr }}...   </h3>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <h3 >Reliquat du congé à la date de demande de congé : …… 100 …… jours</h3>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <h3 >Le reste après cette demande :  16 jours </h3>-->
<!--    </div>-->
<!--    <div class="row mt-5">-->
<!--      <div class="col-3">Signature de l’intéressé : WebHi  </div>-->
<!--      <div class="col-3 offset-4"> Avis de la Direction :</div>-->
<!--    </div>-->
<!--  </div>-->




    <div v-if="showRaison" class="container-fluid position-absolute showRaison w-50  h-25">
        <span>{{this.raisonPourChaqueDemande}} awdjliawjdliawd</span>
    </div>
    <table class="table table-rounded mt-5 table-flush w-50" >

        <thead>
        <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4 text-primary">
            <th>Date de demande :</th>
            <th>Date de debut :</th>
            <th>Date de fin :</th>
            <th>Motif :</th>
            <th>Etat :</th>

        </tr>
        </thead>
        <tbody class="fw-bold">
        <tr v-for="dem in demandes" :key="dem.id_co">
            <td><span class="p-4">{{ localString(dem.dateAc) }}</span></td>
            <td>{{localString(dem.dateDebut) }}</td>
            <td>{{localString(dem.dateFin) }} </td>
            <td>{{ dem.motif }} </td>
<!--            <td v-if="this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>-->
<!--            <td v-if="!this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>-->
            <td :class="findEmpClass(dem.etat)"  ><span class="text-dark fw-bolder">{{ dem.etat }} </span></td>
            <td @click="showInfoMessage(dem.raisonRefusion)" v-if="dem.raisonRefusion" class="btn" >voir le raison</td>
            <td @click="annuler(dem.id_co)" v-if="dem.etat==='En Attente'" ><span class="btn btn-danger">annuler</span></td>
            <td @click="generatePDF(dem)" v-if="dem.etat==='Approuvé'" class="btn w-75"><i class="bi bi-file-earmark-pdf text-success fw-bold icon" title="Telechargé le pdf"></i></td>

        </tr>


        </tbody>
    </table>

    <div class="container-fluid ">
        <div class="row">
            <div class="col-md-4 offset-3">
                <span @click="prevPage" class="btn" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2 m-1"></i>Previous</span>
                <span :disabled="1==1" class="m-2 fw-bolder ">Page {{ currentPage }}</span>
                <span @click.prevent="nextPage" class="btn" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-3"></i></span>

            </div>
        </div>
    </div>


</template>

<style scoped>
.btn{
  padding-bottom: 0px;
}
.showRaison{
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
}
table{
    width: 80pc;
}
.etat-green{
    background-color: #4caf50;
}
.etat-red{
    background-color:red;
}
.etat-yellow{
    background-color: yellow;
}
</style>