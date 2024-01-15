<script>
import axios from 'axios'
import moment from "moment/moment";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf';
export default {
    data(){
        return{
            employe:null,
            demandes:null,
            raisonPourChaqueDemande:null,
            showRaison:null,
            currentPage: 1,
            totalPages: 1,
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
        generatePDF(dem) {
            const pdf = new jsPDF();
            const objetDemande = {
                nom:this.employe.nom,
                prenom:this.employe.prenom,
                DateDebut : this.localString(dem.dateDebut),
                DateFin : this.localString(dem.dateFin),
                Etat : dem.etat
            }
            // Set styles for the PDF content
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color

            // Start at a Y position (e.g., 10) for the first line
            let yPos = 10;

            // Iterate through object properties and add them to the PDF
            for (const key in objetDemande) {
                if (Object.hasOwnProperty.call(objetDemande, key)) {
                    const value = objetDemande[key];

                    // Add the key-value pair to the PDF
                    pdf.text(`${key}: ${value}`, 10, yPos);

                    // Increment Y position for the next line
                    yPos += 10; // Adjust the spacing as needed
                }
            }

            // Save or open the PDF
            pdf.save('RecuDeCongé.pdf');
        },
    },
    mounted() {
        // const id_emp=this.employe.id_e
        this.getData()
        this.fetchData()
        if(this.$store.state.darkMode){
            console.log('K7ell')
        }
        else {
            console.log('byeddd')
        }


    }
    ,
    beforeMount() {
        const user=localStorage.getItem('employe')
        this.employe=JSON.parse(user);
    }
}

</script>

<template>

    <div v-if="showRaison" class="container-fluid position-absolute showRaison w-50  h-25">
        <span>{{this.raisonPourChaqueDemande}} awdjliawjdliawd</span>
    </div>
    <table class="table table-rounded mt-5 table-flush m-auto">

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
            <td>{{ localString(dem.dateAc) }}</td>
            <td>{{localString(dem.dateDebut) }}</td>
            <td>{{localString(dem.dateFin) }} </td>
            <td>{{ dem.motif }} </td>
            <td v-if="this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>
            <td v-if="!this.$store.state.darkMode" :class="findEmpClass(dem.etat)" class="text-black fw-bolder">{{ dem.etat }} </td>
            <td @click="showInfoMessage(dem.raisonRefusion)" v-if="dem.raisonRefusion" class="btn" >voir le raison</td>
            <td @click="annuler(dem.id_co)" v-if="dem.etat==='En Attente'" ><span class="btn btn-danger">annuler</span></td>
            <td @click="generatePDF(dem)" v-if="dem.etat==='Approuvé'" class="btn w-75"><i class="bi bi-file-earmark-pdf text-success fw-bold icon"></i></td>

        </tr>


        </tbody>
    </table>

    <div class="container-fluid fixed-bottom">
        <div class="row">
            <div class="col-md-4 offset-5">
                <button @click="prevPage" class="btn" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square me-2"></i>Previous</button>
                <span class="m-1">Page {{ currentPage }}</span>
                <button @click.prevent="nextPage" class="btn" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-3"></i></button>
            </div>
        </div>
    </div>


</template>

<style scoped>
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