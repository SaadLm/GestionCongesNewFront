<!-- PdfTemplate.vue -->
<template>

    <div class="w-100 bg-white" id="temp">
      <div class="row">
        <div class="col-md-4">
          <img src="../../assets/img/logo.png" alt="Company Logo" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-4 offset-8">
          <span class="fw-bold mt-3">Rabat le : {{ localString(new Date())}}</span>
        </div>
      </div>
      <div class="row mt-5">
        <h1 class="text-center" style="font-weight: bolder;font-size: 20px"> Demande de congé annuel </h1>
      </div>
      <div class="row mt-5">
        <h3 >Nom et Prénom :  {{ NomPrenom }}</h3>
      </div>
      <div class="row mt-2">
        <h3 >Fonction :   {{ Fonction }}</h3>
      </div>
      <div class="row mt-2">
        <div class="col-4"><span class="fw-bold">Du (inclut) :  {{ dateDebut }} </span></div>
        <div class="col-4 offset-2"><span> Au (inclut) :  {{ dateFin }} </span></div>
      </div>
      <div class="row mt-2">
        <h3 >Durée du congé (en jours ouvrables) :  {{ duree }}    </h3>
      </div>
<!--      <div class="row mt-2">-->
<!--        <h3 >Reliquat du congé à la date de demande de congé : …… 100 …… jours</h3>-->
<!--      </div>-->
      <div class="row mt-2">
        <h3 >Le reste après cette demande :  {{rest}} jours </h3>
      </div>
      <div class="row mt-5">
        <div v-if="admin!=1" class="col-3">Signature de l’intéressé : <br><span style="font-style: italic;font-weight: bold"> {{NomPrenom}} </span>  </div>
        <div v-if="admin!=1" class="col-3 offset-4"> Avis de la Direction :</div>
        <div v-if="admin==1" class="col-3 offset-7"> Avis de la Direction :</div>
      </div>
      <div class="row mt-2">
        <div  class="col-3 offset-7" style="font-weight: bold">Avis favorable</div>
<!--        <div v-if="admin!=1" class="col-3 offset-7" style="font-weight: bold">Avis favorable</div>-->
<!--        <div v-if="admin==1" class="col-3 offset-7" style="font-weight: bold">Avis favorable</div>-->
      </div>
      <div class="container-fluid mt-12 w-100">
        <div class="row w-75 offset-1 h-2 ">
          <hr class="bg-primary ms-3">
        </div>

            <div class="text-primary "  style="font-size: 8px;width:95%;margin: auto">
              WEBHI TECHNOLOGY SARL | Adresse : Apt 14, rue Siam 32 avenue Madagascar Rabat, Maroc | IF : 18746829 | RC : 116145
            </div>
            <div class="text-primary" style="font-size: 8px;width:98%;margin: auto">
            ICE : 001551589000039 | CNSS : 4784270 | Téléphone : +212 537 70 70 27 | Emai l: contact@webhi.com | Site web : www.webhi.com
            </div>


      </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    NomPrenom: String,
    Fonction: String,
    dateDebut: String,
    dateFin: String,
    duree: {
      type: Number,
      required: true,
    },
    rest: {
      type: Number,
      required: true,

    },
    admin: {
      type: Number,
      required: true,

    }
    // Add other props as needed
  },

  methods:{
    localString(d){
      const formattedDate = moment(d).format('YYYY-MM-DD');
      return formattedDate;
    },
  },
  mounted() {
    // Access the PdfTemplate component reference after it has been mounted
    const pdfTemplateComponent = this.$parent.$refs.pdfTemplate;

    // Do something with pdfTemplateComponent, if needed
    console.log(pdfTemplateComponent);
  },
};
</script>

<style scoped>
/* Add styles for your template */
</style>
