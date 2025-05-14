<script>
import axios from "axios";
import Swal from 'sweetalert2';
// import moment from "moment/moment";
// import moment from 'moment';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';
// import jwt_decode from "jsonwebtoken/decode";
export default {
  components: {
    flatPickr: FlatPickr,
  },
  data(){
    return {
      dure:'',
      dureNbr:null,
      numberOfDays:0,
      err:'',
      employe:null,
      nbr:0,
      demande:{
        id_e:null
      },
      employees:null,
      inputDate: '',
      datePickerConfig: {
        dateFormat: 'd/m/Y', // Format for display
      },
    }
  },
  // components:{VueDatePicker},
  computed:{
    startDatePickerConfig() {
      // Set a minimum date for the start date picker
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate());
      return {
        ...this.datePickerConfig,
        // maxDate: this.demande.dateFin || 'today',
        minDate: tomorrow,
      };
    },
    endDatePickerConfig() {
      // Set a maximum date for the end date picker
      return {
        ...this.datePickerConfig,
        // maxDate: this.calcMax,
        minDate: this.demande.dateDebut || 'today',
      };
    },

    minDate() {


      // if(this.demande.dateFin instanceof Date){
      // Calculate tomorrow's date
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Format the date as "YYYY-MM-DD" for the input's min attribute
      const formattedDate = tomorrow.toISOString().split("T")[0];

      return formattedDate;

    },
  }
  ,
  methods:{
    ajouterDemande(){

      const startMoment = moment(this.demande.dateDebut, 'DD/MM/YYYY');
      const endMoment = moment(this.demande.dateFin, 'DD/MM/YYYY');
      // const s = startMoment._i
      // const e = endMoment._i
      //
      // if(startMoment>endMoment){
      //     console.log('start kber')
      // }
      // if(startMoment===endMoment){
      //     console.log('tasawi')
      // }
      // if(startMoment<endMoment){
      //     console.log('end kber')
      // }
      // console.log(s)
      // console.log(e)
      if(endMoment>=startMoment){

        if (this.demande.dateDebut && this.demande.dateFin) {
          const startMoment = moment(this.demande.dateDebut, 'DD/MM/YYYY');
          const endMoment = moment(this.demande.dateFin, 'DD/MM/YYYY');
          const formattedDateDebut = startMoment.format('YYYY-MM-DD');
          const formattedDateFin = endMoment.format('YYYY-MM-DD');

          this.getNumberOfDays(formattedDateDebut,formattedDateFin);

          const differenceInDays = this.numberOfDays
          console.log(differenceInDays)

          if(this.demande.id_e==null){
            this.err='Merci de selectioné un employé'
          }
          else{

              if(this.demande.motif=='' ||this.demande.motif==null || this.demande.dateDebut ==null|| this.demande.dateFin==null){
                this.err=" Merci de remplir les champs"
              }
              else {
                const demande={
                  id_e:this.demande.id_e,
                  dateDebut:formattedDateDebut,
                  dateFin:formattedDateFin,
                  motif:this.demande.motif
                }
                axios.post('http://localhost:3000/ajoutedemande',demande)
                    .then(response=>{
                      this.showSuccessMessage('demande ajouté avec success')
                      console.log('demande ajouté avec success',response)
                    })
                    .catch(err=>{
                      console.log(err)
                    })


            }
          }

        } else {
          // Handle the case where either the start date or end date is not selected
          this.err='Choisissez les dates'
        }
      }
      else{
        this.err='La date de début ne peut pas être supérieure à la date de fin'
      }



    },
    // calcMaximum() {
    //
    //   if (this.demande.dateDebut) {
    //     this.calcMax=moment(this.demande.dateDebut, 'DD/MM/YYYY').add(Math.floor(this.nbr)-1, 'days').format('DD/MM/YYYY');
    //
    //   }
    //   return null;
    //
    // },
    showSuccessMessage(message) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        confirmButtonText: 'OK',
      });
    },

    handleChange() {
      // Update the data-date attribute using moment.js
      const formattedDate = moment(this.inputDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      this.$el.querySelector('input').setAttribute('data-date', formattedDate);

      // You can also perform additional actions based on the formatted date
      console.log('Formatted Date:', formattedDate);
    },
    async changeDuree(){
      if(this.demande.dateDebut==null||this.demande.dateFin==null){
        this.dure=''

      }
      else{
        const startMoment = moment(this.demande.dateDebut, 'DD/MM/YYYY');
        const endMoment = moment(this.demande.dateFin, 'DD/MM/YYYY');
        // const differenceInDays = endMoment.diff(startMoment, 'days');
        // console.log(differenceInDays)
        const formattedDateDebut = startMoment.format('YYYY-MM-DD');
        const formattedDateFin = endMoment.format('YYYY-MM-DD');
        await this.getNumberOfDays(formattedDateDebut,formattedDateFin)
        const nbr = this.dureNbr
        // const differenceInDays = this.numberOfDays
        this.dure=`Durée de congé comptabilisé : ${nbr}`
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
        this.dureNbr = response.data.numberOfDays;
        // console.log(this.numberOfDays,' le nombre')

      } catch (error) {
        console.error('Error fetching number of days:', error);
      }
    },

  }
  ,
  mounted() {

    //
    // axios.post('http://localhost:3000/emp',{id_e:id})
    //     .then(response=>{
    //       this.employe=response.data.employeeData
    //       console.log(this.employe.soldeConge)
    //     })
    //     .catch(err=>alert(err))



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
  created() {
    document.title = 'Gestion des congés';
  }
}

</script>

<template>
  <div class="d-flex mt-6 ms-4">
    <h2>Ajouter un congé :</h2>
  </div>
  <div class="container-fluid mt-5">
    <div class="row">


      <div class="col-md-6 offset-md-3 offset-sm-0" >

        <div class="card mb-4 mt-4" style="margin: auto">

          <div class="card-body px-0 pt-0 pb-2">
          <div class="formbold-main-wrapper">
            <!-- Author: FormBold Team -->
            <!-- Learn More: https://formbold.com -->
            <div class="formbold-form-wrapper">

              <div class="formbold-steps">
                <h2 class="text-center">Demande de congé</h2>
              </div>

              <div class="formbold-form-step-1 active">
                <label > Selectioner l'employé :</label>
                <select v-model="demande.id_e" class="form-select me-5">
                  <option disabled selected >selectioner !</option>
                  <option :value="emp.id_e" :key="emp.id_e" v-for="emp in employees">{{ emp.nom }} {{ emp.prenom}}</option>
                </select>

                <div class="formbold-input-flex">

                  <div class="row w-100 mt-3 me-0 px-0 pe-0">

                    <div class="col-md-6">
                      <label > Date de début : </label>
                      <!--                                        <span>{{ demande.dateDebut}}</span>-->
                      <flat-pickr

                          :min="minDate"
                          :max="demande.dateFin"
                          v-model="demande.dateDebut"
                          :config="startDatePickerConfig"
                          @change="changeDuree"
                          class="form-control form-control-sm w-100"
                      ></flat-pickr>
<!--                          @change="updateMaxDate"-->
                    </div>
                    <div class="col-md-6">

                      <label class="ms-md-4" > Date fin : </label>
<!--                          :max="calcMax"-->
                      <flat-pickr

                          :min="demande.dateDebut"
                          v-model="demande.dateFin"
                          :config="endDatePickerConfig"
                          @change="changeDuree"
                          class="form-control form-control-sm w-100 ms-md-4"
                      ></flat-pickr>
                    </div>

                    <!--                                    </div>-->
                  </div>
                  <!--                                <label class="formbold-form-label"> Date de fin : </label>-->
                  <!--                                <input-->
                  <!--                                        v-model="demande.dateFin"-->
                  <!--                                        :min="demande.dateDebut"-->
                  <!--                                        :max="calcMax"-->
                  <!--                                        type="date" data-date="" data-date-format="DD MMMM YYYY" @input="handleChange"-->
                  <!--                                        class="formbold-form-input"-->
                  <!--                                />-->



                </div>
                <div class="formbold-form-step-1 active">


                  <label> Motif : </label>

                    <!--                                  <div class="col-md-12 offset-md-0 col-sm-11 offset-sm-1">-->
                    <input
                        v-model="demande.motif"
                        type="text"
                        placeholder="Congé annuel normal, Mariage, Naissance, ... "
                        class="formbold-form-input w-100"
                    />

                </div>
              </div>



            <div class="row">
              <div class="col-md-4 col-sm-10 text-danger fw-bolder">{{dure}}</div>
              <div class="formbold-form-btn-wrapper"><span class="text-danger fw-bolder">{{ err}}</span>
                <span @click="ajouterDemande" class="formbold-btn" style="background-color: #283777">
                                Confirmer
                            </span>
              </div>
            </div>


          </div>
        </div>


          </div>
        </div>














      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.shadow-right-bottom {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
}
.card{
  border: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Inter", sans-serif;
}
.formbold-main-wrapper {

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.formbold-form-wrapper {
  margin: 0 auto;
  max-width: 550px;
  width: 100%;

}

.formbold-steps {
  padding-bottom: 18px;
  margin-bottom: 35px;
  border-bottom: 1px solid #DDE3EC;
}
.formbold-steps ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 40px;
}
.formbold-steps li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}
.formbold-steps li span {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #DDE3EC;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}
.formbold-steps li.active {
  color: #07074D;;
}
.formbold-steps li.active span {
  background: #6A64F1;
  color: #FFFFFF;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 22px;
}
.formbold-input-flex > div {
  width: 50%;
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
.formbold-form-input:focus {
  border-color: #6a64f1;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
.formbold-form-label {
  color: #07074D;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: block;
  //margin-bottom: 10px;
}

.formbold-form-confirm {
  border-bottom: 1px solid #DDE3EC;
  padding-bottom: 35px;
}
.formbold-form-confirm p {
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  margin-bottom: 22px;
  width: 75%;
}
.formbold-form-confirm > div {
  display: flex;
  gap: 15px;
}

.formbold-confirm-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 0.5px solid #DDE3EC;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  cursor: pointer;
  padding: 10px 20px;
  transition: all .3s ease-in-out;
}
.formbold-confirm-btn {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
}
.formbold-confirm-btn.active {
  background: #6A64F1;
  color: #FFFFFF;
}

.formbold-form-step-1,
.formbold-form-step-2,
.formbold-form-step-3 {
  display: none;
}
.formbold-form-step-1.active,
.formbold-form-step-2.active,
.formbold-form-step-3.active {
  display: block;
}

.formbold-form-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  margin-top: 25px;
}
.formbold-back-btn {
  cursor: pointer;
  background: #FFFFFF;
  border: none;
  color: #07074D;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: none;
}
.formbold-back-btn.active {
  display: block;
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

</style>