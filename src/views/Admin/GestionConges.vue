<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import PdfTemplate from "@/views/Employe/PdfTemplate.vue";
// const fs = require('fs');
// const temp = require('temp').track(); // Make sure to install the 'temp' module using npm install temp
// const path = require('path');
// import { saveAs } from 'file-saver';



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
      numberOfDays:0,
      NomPrenom: '',
      dateDebut: null,
      dateFin: null,
      duree:null,
      rest: null,
      admin:null,
      Fonction:null,
      emp:null,
      pdfContent:null
    }
  },
  components: {
    PdfTemplate,
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
        title: 'Etes vous sure?',
        text: 'Accepter le demande !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Accepter !',
        cancelButtonText: 'No, Annuler !',
      });

      if (result.isConfirmed) {
        this.emailData(dem)
        // this.accepterConge(dem)
        // console.log("l'operation a ete passe",dem)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("l'operation a ete annuler")
      }
    },
    async showConfirmationRefuser(dem) {
      const result = await Swal.fire({
        title: 'Etes vous sure?',
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
    async getRest(id){
      await axios.post('http://localhost:3000/getRestApresAcceptation', {id_co:id})
          .then(response => {
            const LeRest = response.data.rest.restApresAprouvation
            this.rest=LeRest
            console.log('Value:', this.rest);// Example: accessing the 'key' property
            return response.data.rest.restApresAprouvation
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },
    async getEmp(id){
      const obj = {id_e:id}

      axios.post('http://localhost:3000/emp',obj)
          .then(response=>{
            // console.log(response.data)
            this.emp=response.data.employeeData
            // console.log("hada west l getEmp",this.emp)
            this.Fonction= this.emp.fonction

          })
          .catch(err=>{
            console.error(err)
          })
    },
    async annulerApprouvationConfirmation(dem){
      const result = await Swal.fire({
        title: 'Etes vous sure?',
        text: "Voulez vous vraiment annuler l'acceptation de demande !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Accepter !',
        cancelButtonText: 'No, Annuler !',
      });

      if (result.isConfirmed) {
        this.annulerApprouvation(dem)
        // console.log("l'operation a ete passe",dem)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("l'operation a ete annuler")
      }




    },
    annulerApprouvation(dem){

      axios.put(`http://localhost:3000/api/annulerapprouvation`,dem)
          .then(response=>{
            console.log('L approuvation est annulé ',response)
            this.fetchData()
          })
          .catch(err=>{
            console.error(err)
          })
    }
    ,
    async getSolde(id) {
      // Assuming you have an employee ID
      const employeeId = id;

      try {
        // Make an asynchronous request using async/await
        const response = await axios.post('http://localhost:3000/getsolde', { id_e: employeeId });

        // Extract the soldeConge value from the response
        const soldeConge = response.data.solde[0].soldeConge;



        // If you want to return Solde, you can do that
        return soldeConge;
      } catch (error) {
        // Handle errors here
        console.error(error, "Error retrieving employee solde");
        // Return a default value or handle the error as needed
        return null;
      }
    }
    ,
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


      await this.getNumberOfDays(dem.dateDebut,dem.dateFin)
      await this.getEmp(dem.id_e)
      // const solde = await this.getSolde(dem.id_e);

      // console.log("hada dem",dem)



      this.NomPrenom= dem.nom +' ' +dem.prenom
      // this.NomPrenom= dem.nom +' ' +this.emp.prenom
      const nomPDF=this.NomPrenom
      this.dateDebut= this.localString(dem.dateDebut)
      this.dateFin= this.localString(dem.dateFin)
      this.duree= this.numberOfDays
      this.rest= dem.restApresAprouvation
      this.admin=1




      const templateContainer = document.createElement('div');
      const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
      setTimeout(async function() {





            templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;


            const options = {
              margin:       0,
              filename:     `Conge ${nomPDF}.pdf`,
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { scale: 1 },
              jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate the PDF
            await html2pdf().set(options).from(templateContainer).save()

          }


          , 1500)


      // console.log(dem)
    },
    // async generatePDFEmail(dem) {
    //
    //   await this.getNumberOfDays(dem.dateDebut, dem.dateFin)
    //   await this.getEmp(dem.id_e)
    //
    //
    //   this.NomPrenom = dem.nom + ' ' + dem.prenom
    //   // this.NomPrenom= dem.nom +' ' +this.emp.prenom
    //   const nomPDF = this.NomPrenom
    //   this.dateDebut = this.localString(dem.dateDebut)
    //   this.dateFin = this.localString(dem.dateFin)
    //   this.duree = this.numberOfDays
    //   this.rest = dem.restApresAprouvation
    //   this.admin = 1
    //
    //
    //   const templateContainer = document.createElement('div');
    //   const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
    //   setTimeout(async function () {
    //
    //
    //     templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;
    //
    //
    //     const options = {
    //       margin: 1,
    //       filename: `Conge ${nomPDF}.pdf`,
    //       image: {type: 'jpeg', quality: 0.98},
    //       html2canvas: {scale: 2},
    //       jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
    //     };
    //
    //     // Generate the PDF
    //     // await html2pdf().set(options).from(templateContainer).save()
    //         const pdfPromise = html2pdf().set(options).from(templateContainer).output()
    //         console.log(pdfPromise)
    //         pdfPromise.then((e) => {
    //           console.log(e)
    //           this.pdfContent=e
    //           console.log('content saved !!')
    //         })
    //
    //
    //
    //       .catch((error) => {
    //         console.error('Error saving PDF:', error);
    //       });
    //
    //
    // }
    //       , 1500)
    //
    //
    //   console.log(dem)
    // },
    async accepterConge(demande) {
      try {
              this.getNumberOfDays(demande.dateDebut,demande.dateFin).then(async ()=> {

                // await this.generatePDFEmail(demande)
              //
              })


        console.log('Le congé a été accepté');



        // Refresh the data
        this.fetchData();
      } catch (error) {
        this.showErrorMessage('Solde insuffisant !!.');
        console.error(error, 'L\'opération a échoué');
      }
    },
    async emailData(dem){

      const self = this;
      const solde = await this.getSolde(dem.id_e);
      const obj = {
        solde:solde,
        id_e:dem.id_e,
        id_co:dem.id_co,
        dateDebut:dem.dateDebut,
        dateFin:dem.dateFin,
      }
      await this.getNumberOfDays(dem.dateDebut, dem.dateFin)
      await this.getEmp(dem.id_e)
      
      
      const response = await axios.put('http://localhost:3000/accepterconge', obj).catch(err=>{this.showInfoMessage(" Solde insuffisant !");console.log(err)});
      await this.getRest(dem.id_co)
      // console.log(`${this.rest} Hadi dyal l EMail`)
      const messageEmail = {
        objet: 'Acceptation de votre demande de congé',
        to: response.data.employeeData.email,
        message: `Bonjour,
        Nous sommes ravis de vous informer que votre demande de congé pour la période du ${this.localString(dem.dateDebut)} au ${this.localString(dem.dateFin)} a été acceptée.
        Vous bénéficiez d'une durée de ${this.numberOfDays} jours de congé, et votre reliquat après cette demande est de ${this.rest} jours.
        Cordialement.`,
      };
                    ///////////////////////////////            ///////////////////////////////////////
      
      await this.getNumberOfDays(dem.dateDebut, dem.dateFin)
      await this.getEmp(dem.id_e)
      await this.getRest(dem.id_co)

      this.NomPrenom = dem.nom + ' ' + dem.prenom
      const nomPDF = this.NomPrenom
      this.dateDebut = this.localString(dem.dateDebut)
      this.dateFin = this.localString(dem.dateFin)
      this.duree = this.numberOfDays


      // this.rest = dem.restApresAprouvation
      this.admin = 1
      // console.log(this.rest)


      const templateContainer = document.createElement('div');
      const pdfTemplateComponent = this.$refs.pdfTemplate; // Reference to PdfTemplate component
      setTimeout(async function () {


            templateContainer.innerHTML = pdfTemplateComponent.$el.innerHTML;


            const options = {
              margin: 0,
              filename: `Conge ${nomPDF}.pdf`,
              image: {type: 'jpeg', quality: 0.98},
              html2canvas: {scale: 1},
              jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
            };

            // Generate the PDF
            // await html2pdf().set(options).from(templateContainer).save()
            const pdfPromise = html2pdf().set(options).from(templateContainer).toPdf().output('blob')
            // console.log(pdfPromise)
            pdfPromise.then((e) => {
              // console.log(e)
              // this.pdfContent=e
              console.log('content saved !!')
              self.sendEmail(messageEmail, e,`Conge ${self.NomPrenom}.pdf`);
              self.fetchData()
            })



                .catch((error) => {
                  console.error('Error saving PDF:', error);
                });


    })
      // console.log(dem)
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
        title: 'Raison de refus',
        text: message,
        confirmButtonText: 'OK',
      });
    },
    refuserConge(dem){
      // const id_co = this.idPourRefuser
      const id_co = this.demPourRefuser.id_co
      const raisonRefusion = this.raisonRefusion
      // console.log(id_co)
      // console.log(raisonRefusion)
      const demande ={
        id_co: id_co,
        dateDebut:this.demPourRefuser.dateDebut,
        dateFin:this.demPourRefuser.dateFin,
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
              message:`
                    Bonjour,
                    Nous avons pris connaissance de votre demande de congé pour la période du ${this.localString(demande.dateDebut)} au ${this.localString(demande.dateFin)} .
                    Après avoir examiné attentivement la situation actuelle de l'équipe et les impératifs opérationnels, nous regrettons de vous informer que votre demande de congé n'a pas été approuvée.
                    Nous restons ouverts à la discussion et à l'exploration de solutions alternatives si vous avez des préoccupations ou des questions.
                    Merci de votre compréhension.
                    Cordialement.

                    `
              // Motif : ${demande.raisonRefusion}
            }
            this.sendEmailRefuser(messageEmail)
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
    sendEmail(cong,content,filename) {
      // const emailData = {
      //   to: cong.to,
      //   subject: cong.objet,
      //   text: cong.message,
      //   content:content
      // };

      const formData = new FormData();
      formData.append('to', cong.to);
      formData.append('subject', cong.objet);
      formData.append('text', cong.message);
      formData.append('content', content);
      formData.append('fileName', filename);

      axios.post('http://localhost:3000/send-emailPDF', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },
    sendEmailRefuser(cong) {
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
    getBackground(dark){
      if(dark){
        return 'background-color:#283777'
      }
      else{

        return 'background-color:white'
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
                :dateFin= "dateFin"
                :duree= 'duree'
                :rest= 'rest'
                :admin="admin"
                :Fonction="Fonction"

                style="display: none"
  />
<!--  <div v-if="showMotif" class="container-fluid position-absolute showMotif w-50  h-25">-->
<!--    <span class="text-danger fw-bolder">Raison de refusion :</span>-->
<!--    <textarea class="w-100 h-75" v-model="raisonRefusion"></textarea>-->
<!--    <div class="cont">-->
<!--      <span class="btn btn-primary" @click="showConfirmationRefuser(demPourRefuser)">Continue</span>-->
<!--      <span class="btn btn-warning" @click="annulerRefuser" >Annuler</span>-->
<!--    </div>-->
<!--  </div>-->

  <div v-if="showMotif" class="position-absolute showMotif" >
    <div class="modal-dialog">
      <div class="modal-content" :style="getBackground(this.$store.state.darkMode)">
        <div class="modal-header">
          <h5 class="modal-title">Raison de refus :</h5>
          <button type="button" class="btn-close" @click="annulerRefuser"></button>
        </div>
        <div class="modal-body">

            <div class="mb-3">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea v-model="raisonRefusion" class="form-control" id="message-text"></textarea>
            </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="annulerRefuser" >Close</button>
          <button type="button" class="btn btn-primary" @click="showConfirmationRefuser(demPourRefuser)">Continue</button>
        </div>
      </div>
    </div>
  </div>



<!--  <table class="table table-rounded mt-5 table-flush w-65">-->

<!--    <thead>-->
<!--    <tr class="fw-bold fs-7 border-bottom border-gray-200 text-primary text-center">-->
<!--      <th>Nom  :</th>-->
<!--      <th>Date de demande :</th>-->
<!--      <th>Date de debut :</th>-->
<!--      <th>Date de fin :</th>-->
<!--      <th>Motif :</th>-->
<!--      <th>Etat :</th>-->

<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody class="fw-bold">-->
<!--    <tr v-for="dem in demandes" :key="dem.id_co" class="text-center">-->
<!--      <td style="width: 10%">{{ dem.nom }}</td>-->
<!--      <td style="width: 10%">{{ localString(dem.dateAc) }}</td>-->
<!--      <td style="width: 10%">{{localString(dem.dateDebut) }}</td>-->
<!--      <td>{{localString(dem.dateFin) }} </td>-->
<!--      <td>{{ dem.motif }} </td>-->
<!--      <td v-if="dem.etat ==='En Attente'" class="tdd" ><i @click="showConfirmationAccepter(dem)" class="bi btn bi-check2-square ms-5 text-white bg-success"></i><i @click="Motif(dem)" class="bi btn bi-slash-circle text-white bg-danger"></i></td>-->
<!--      <td v-if="dem.etat !=='En Attente'" class="tdd"  :class="findEmpClass(dem.etat)" >-->
<!--        {{ dem.etat }}-->
<!--        <i v-if="dem.etat==='Refusé'" class="bi bi-question-square cursor-pointer icon ms-5" @click="showInfoMessage(dem.raisonRefusion)"></i>-->
<!--        <i v-if="dem.etat==='Approuvé'" class="bi bi-file-earmark-pdf text-dark fw-bold icon ms-4" @click="generatePDF(dem)" title="Telecharger le PDF"></i>-->
<!--      </td>-->
<!--      <td @click="annulerApprouvationConfirmation(dem)" v-if="dem.etat==='Approuvé'"><span-->
<!--          class="btn btn-danger py-2 px-4">Annuler</span></td>-->
<!--    </tr>-->
<!--    </tbody>-->
<!--  </table>-->
<!--  &lt;!&ndash;    <div class="container-fluid fixed-bottom">&ndash;&gt;-->
<!--  <div class="container-fluid">-->
<!--    <div class="row">-->
<!--      <div class="col-md-5 offset-md-3 offset-1">-->
<!--        <button @click="prevPage" class="btn pb-0" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>-->
<!--        <span class="m-2 fw-bolder ">Page {{ currentPage }}</span>-->
<!--        <button @click.prevent="nextPage" class="btn pb-0" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-3"></i></button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="d-flex mt-6 ms-4">
    <h2>Gestion des congés :</h2>
  </div>

  <div class="card mb-4 mt-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date de demande </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date de debut </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date de fin </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Motif </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Etat </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder w-7 opacity-7">Reste après approbation </th>
            <th class="text-secondary opacity-7"></th>
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
            <td v-if="dem.etat ==='En Attente'" class="tdd" ><i @click="showConfirmationAccepter(dem)" class="bi btn bi-check2-square ms-5 text-white bg-success"></i><i @click="Motif(dem)" class="bi btn bi-slash-circle text-white bg-danger"></i></td>
            <td v-if="dem.etat !=='En Attente'" class="tdd px-6"   >
              <p class="badge badge-sm " :class="findEmpClass(dem.etat)">
                {{ dem.etat }}
              </p>
              <i v-if="dem.etat==='Refusé'" class="bi bi-question-square cursor-pointer icon ms-5" @click="showInfoMessage(dem.raisonRefusion)"></i>
              <i v-if="dem.etat==='Approuvé'" class="bi bi-file-earmark-pdf text-dark fw-bold icon ms-4" @click="generatePDF(dem)" title="Telecharger le PDF"></i>
            </td>
            <td class="align-middle text-center text-sm">
<!--              <span class="badge badge-sm bg-gradient-success">{{ dem.motif }}</span>-->
              <span class="text-xs font-weight-bold mb-0 font-weight-bold">{{ dem.restApresAprouvation }}</span>
            </td>
            <td @click="annulerApprouvationConfirmation(dem)" v-if="dem.etat==='Approuvé'"><span
                class="btn btn-danger py-2 px-4">Annuler</span></td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 offset-md-3 offset-1">
        <button class="btn btn-outline-dark px-1 py-1 w-35" style="margin-bottom: 0px" @click="prevPage" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>
        <!--        <button @click="prevPage" class="btn pb-0" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>-->
        <span class="m-2 fw-bolder ">Page {{ currentPage }}</span>
        <button @click.prevent="nextPage" class="btn py-1 btn-outline-dark w-35" style="padding-bottom: 2px;padding-top: 2px;margin-bottom: 0px;width: 40%" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>
<!--        <button @click.prevent="nextPage" class="btn pb-0" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-3"></i></button>-->
      </div>
    </div>
  </div>







</template>

<style scoped>
.btn {
  margin-bottom: 1rem;
  letter-spacing: -0.025rem;
  text-transform: none;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.08);
}
.showMotif{
  z-index: 100;
  //background-color: white;
  top: 30%;
  left: 25%;
  width: 50vh;
  height:30%;
  //border: 1px solid black;
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