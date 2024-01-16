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
        <h1 class="text-center"> Demande de congé annuel </h1>
      </div>
      <div class="row mt-10">
        <h3 >Nom et Prénom : {{ NomPrenom }}</h3>
      </div>
      <div class="row mt-5">
        <h3 >Du (inclut) : ………{{ dateDebut }}……   Au (inclut) : ……{{ dateFin }}……   </h3>
      </div>
      <div class="row mt-5">
        <h3 >Durée du congé (en jours ouvrables) : ……… {{ duree }}...   </h3>
      </div>
<!--      <div class="row mt-5">-->
<!--        <h3 >Reliquat du congé à la date de demande de congé : …… 100 …… jours</h3>-->
<!--      </div>-->
      <div class="row mt-5">
        <h3 >Le reste après cette demande :  {{rest}} jours </h3>
      </div>
      <div class="row mt-5">
        <div class="col-3">Signature de l’intéressé : WebHi  </div>
        <div class="col-3 offset-4"> Avis de la Direction :</div>
      </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    NomPrenom: String,
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
