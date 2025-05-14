<!-- PdfTemplate.vue -->
<template>
<div class="container-fluid">
  <div class="row offset-1 mt-5 bg-white" id="temp">
    <div class="row">
      <div class="col-md-4">
        <img src="../../assets/img/IsmagiCover.png" alt="Company Logo" />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4 offset-8">
        <span class="fw-bold mt-1">Rabat le : {{ localString(new Date())}}</span>
      </div>
    </div>
    <div class="row mt-3">
      <h1 class="text-center" style="font-weight: bolder;font-size: 20px"> Demande de congé annuel </h1>
    </div>
    <div class="row mt-7">
      <h6 >Nom et Prénom :  {{ NomPrenom }}</h6>
    </div>
    <div class="row">
      <h6 >Fonction :   {{ Fonction }}</h6>
    </div>
    <div class="row">
      <div class="col-4"><span class="fw-bold">Du (inclut) :  {{ localString(dateDebut) }} </span></div>
      <div class="col-4 offset-2"><span class="fw-bold"> Au (inclut) :  {{ localString(dateFin) }} </span></div>
    </div>
    <div class="row">
      <h6 >Durée du congé (en jours ouvrables) :  {{ duree }}    </h6>
    </div>
    <!--      <div class="row">-->
    <!--        <h6 >Reliquat du congé à la date de demande de congé : …… 100 …… jours</h6>-->
    <!--      </div>-->
    <div class="row">
      <h6 >Le reste après cette demande :  {{rest}} jours </h6>
    </div>
    <div class="row mt-7">
      <div  class="col-5"><h6>Signature de l’intéressé : </h6> </div>
      <div  class="col-4 offset-3"> <h6>Avis de la Direction : </h6></div>
      <!--        <div v-if="admin==1" class="col-3 offset-7"> <h6>Avis de la Direction : </h6></div>-->
    </div>
    <div class="row mt-2">
      <div  class="col-5"><span style="font-style: italic;font-weight: bold;min-height:30px !important;max-height: 30px !important"><h5> {{NomPrenom}}</h5> </span></div>
      <div  class="col-4 offset-3" style="font-weight: bold;min-height:30px !important;max-height: 30px !important"><h5>Avis favorable</h5></div>
      <!--        <div v-if="admin==1" class="col-3 offset-7" style="font-weight: bold"><h5>Avis favorable</h5></div>-->
      <!--        <div v-if="admin!=1" class="col-3 offset-7" style="font-weight: bold">Avis favorable</div>-->
      <!--        <div v-if="admin==1" class="col-3 offset-7" style="font-weight: bold">Avis favorable</div>-->
    </div>

  </div>
  <div  style="margin-top: 31%;width: 100%;">
      <hr class="bg-primary w-100">
      <div class="row h-2 ">
      </div>

      <div class="text-primary "  style="font-size: 8px;width:95%;margin-left: 22%">
        ISMAGI      | Adresse :  559, avenue Al Boustane (à côté de Prestigia Riad Al Andalous) , Hay Riad, 10100 Rabat
      </div>
      <div class="text-primary" style="font-size: 8px;width:98%;margin-left: 19%">
        ICE : 001666689008888 | CNSS : 1111111 | Téléphone : +212 537 66 66 66 | Emai l: contact@ismagi.com | Site web : www.ismagi.ma
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
      const formattedDate = moment(d).format('DD-MM-YYYY');
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
