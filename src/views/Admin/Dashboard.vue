<template>
    <div class="py-4 container-fluid">
      <div class="d-flex mt-5 ms-1">
        <h2>Statistiques :</h2>
      </div>
      <div class="row">
        <div class="col-lg-12">
  <!--        <div class="row">-->
  <!--          <div class="col-lg-3 col-md-6 col-12">-->
  <!--            <card-->
  <!--              :title="stats.money.title"-->
  <!--              :value="stats.money.value"-->
  <!--              :percentage="stats.money.percentage"-->
  <!--              :iconClass="stats.money.iconClass"-->
  <!--              :iconBackground="stats.money.iconBackground"-->
  <!--              :detail="stats.money.detail"-->
  <!--              directionReverse-->
  <!--            ></card>-->
  <!--          </div>-->
  <!--          <div class="col-lg-3 col-md-6 col-12">-->
  <!--            <card-->
  <!--              :title="stats.users.title"-->
  <!--              :value="stats.users.value"-->
  <!--              :percentage="stats.users.percentage"-->
  <!--              :iconClass="stats.users.iconClass"-->
  <!--              :iconBackground="stats.users.iconBackground"-->
  <!--              :detail="stats.users.detail"-->
  <!--              directionReverse-->
  <!--            ></card>-->
  <!--          </div>-->
  <!--          <div class="col-lg-3 col-md-6 col-12">-->
  <!--            <card-->
  <!--              :title="stats.clients.title"-->
  <!--              :value="stats.clients.value"-->
  <!--              :percentage="stats.clients.percentage"-->
  <!--              :iconClass="stats.clients.iconClass"-->
  <!--              :iconBackground="stats.clients.iconBackground"-->
  <!--              :percentageColor="stats.clients.percentageColor"-->
  <!--              :detail="stats.clients.detail"-->
  <!--              directionReverse-->
  <!--            ></card>-->
  <!--          </div>-->
  <!--          <div class="col-lg-3 col-md-6 col-12">-->
  <!--            <card-->
  <!--              :title="stats.sales.title"-->
  <!--              :value="stats.sales.value"-->
  <!--              :percentage="stats.sales.percentage"-->
  <!--              :iconClass="stats.sales.iconClass"-->
  <!--              :iconBackground="stats.sales.iconBackground"-->
  <!--              :detail="stats.sales.detail"-->
  <!--              directionReverse-->
  <!--            ></card>-->
  <!--          </div>-->
  <!--        </div>-->
            <div class="row">
  
               <div class="col-md-6">
                <div class="row mt-3">
                    <div class="col-lg-12 mb-lg">
                        <!-- line chart -->
                        <div class="card z-index-2">
                            <gradient-line-chart />
                        </div>
                    </div>
                    <!--          <div class="col-lg-5">-->
                    <!--            <carousel />-->
                    <!--          </div>-->
                </div>
                <div class="row mt-4">
                    <div class="col-lg-12 mb-lg-0 mb-4">
                        <div class="card">
                          <div class="p-3 pb-0 card-header">
                            <div class="d-flex justify-content-between">
                              <!--                                      <h6 class="mb-2">En attente de repondre :</h6> <router-link class="bg-gradient-success btn" to="gestionconges">Go !</router-link>-->
                              <div class="container">
                                <div class="row">
                                  <div class="col-md-9 col-sm-12 offset-md-2">
                                    <button class="btn btn-outline-dark px-1 py-1 w-35" style="margin-bottom: 0px" @click="prevPage" :disabled="currentPage === 1">
<!--                                    <button @click="prevPage" class="btn pb-0" :disabled="currentPage === 1">-->
                                      <i class="bi bi-arrow-left-square me-2"></i>Previous</button>
                                    <span class="m-2 fw-bolder ">Page {{ currentPage }}</span>
                                    <button @click.prevent="nextPage" class="btn py-1 btn-outline-dark w-35" style="padding-bottom: 2px;padding-top: 2px;margin-bottom: 0px;width: 40%" :disabled="currentPage === totalPages">Next<i class="bi bi-arrow-right-square ms-2"></i></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="table-responsive">
                            <table class="table align-items-center">
                              <tbody>
                              <tr v-for="emp in employes" :key="emp.id_e">
                                <td class="w-30">
                                  <div class="px-2 py-1 d-flex align-items-center">
                                    <div>
                                      <i class="bi bi-person-square"></i>
                                    </div>
                                    <div class="ms-4">
                                      <p class="mb-0 text-xs font-weight-bold">nom</p>
                                      <h6 class="mb-0 text-sm">{{ emp.nom }} {{emp.prenom}}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="text-center">
                                    <p class="mb-0 text-xs font-weight-bold">Balance</p>
                                    <h6 class="mb-0 text-sm">{{ emp.soldeConge }}</h6>
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
  
                            <!--                                  <div class="container-fluid fixed-bottom">-->
                            <!--                                      <div class="row">-->
                            <!--                                          <div class="col-md-4 offset-5">-->
                            <!--                                              <button @click="prevPage" class="btn" :disabled="currentPage === 1"><i class="bi bi-arrow-left-square"></i>Previous</button>-->
                            <!--                                              <span>Page {{ currentPage }}</span>-->
                            <!--                                              <button @click.prevent="nextPage" class="btn" :disabled="currentPage === totalPages"><i class="bi bi-arrow-right-square"></i>Next</button>-->
                            <!--                                          </div>-->
                            <!--                                      </div>-->
                            <!--                                  </div>-->
  
                          </div>
                        </div>
                    </div>
                    <!--          <div class="col-lg-5">-->
                    <!--            <categories-card />-->
                    <!--          </div>-->
                </div>
            </div>
  
  
                <div class="col-md-6">
                    <div class="row mt-4">
                        <div class="col-lg-12 mb-lg-0 mb-4">
                            <div class="card">
                              <div class="p-3 pb-0 card-header">
                                  <div class="d-flex justify-content-between">
                                      <h6 class="mb-2">En attente de reponse :</h6>

                                    <router-link class="btn text-white" style="background-color: #283777" to="gestionconges">Go !</router-link>
<!--                                    <router-link class="bg-gradient-primary btn" to="gestionconges">Go  !</router-link>-->
                                  </div>
                              </div>
                              <div class="table-responsive">
                                  <table class="table align-items-center">
                                      <tbody>
                                      <tr v-for="dem in demandes" :key="dem.id_co">
                                          <td class="w-30">
                                              <div class="px-2 py-1 d-flex align-items-center">
                                                  <div>
                                                      <i class="bi bi-person-square"></i>
                                                  </div>
                                                  <div class="ms-4">
                                                      <p class="mb-0 text-xs font-weight-bold">nom</p>
                                                      <h6 class="mb-0 text-sm">{{ dem.nom }} </h6>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>
                                              <div class="text-center">
                                                  <p class="mb-0 text-xs font-weight-bold">Date début</p>
                                                  <h6 class="mb-0 text-sm">{{ localString(dem.dateDebut) }}</h6>
                                              </div>
                                          </td>
                                          <td>
                                              <div class="text-center">
                                                  <p class="mb-0 text-xs font-weight-bold">Date fin</p>
                                                  <h6 class="mb-0 text-sm">{{localString(dem.dateFin) }}</h6>
                                              </div>
                                          </td>
                                          <td class="text-sm align-middle">
                                              <div class="text-center col">
                                                  <p class="mb-0 text-xs font-weight-bold">motif</p>
                                                  <h6 class="mb-0 text-sm">{{ dem.motif  }}</h6>
                                              </div>
                                          </td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
  
                            </div>
                        </div>
                        <!--          <div class="col-lg-5">-->
                        <!--            <categories-card />-->
                        <!--          </div>-->
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
  import moment from "moment";
  // import Card from "@/examples/Cards/Card.vue";
  import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
  // import Carousel from "./components/Carousel.vue";
  // import CategoriesCard from "./components/CategoriesCard.vue";
  
  export default {
      name: "dashboard-default",
      data() {
          return {
              demandes: [],
              employes:[],
              currentPage: 1,
              totalPages: 1,
          };
      },
      methods: {
          localString(d) {
              const formattedDate = moment(d).format('YYYY-MM-DD');
              return formattedDate;
          },
          async fetchData() {
              try {
                  const obj = {page: this.currentPage}
                  const response = await axios.post(`http://localhost:3000/employepage`, obj);
                  const data = response.data;
                  // console.log("hada total : ", data.total)
                  // Assuming the total count is sent from the server
                  this.totalPages = Math.ceil(data.total / 10);
                  // console.log('totalPages = ',this.totalPages)
                  this.employes = data.res;
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
      async fetch(){
            await axios.get()
      }
      },
      mounted() {
        this.fetch()
          axios.get('http://localhost:3000/demandesenattente')
              .then(response => {
                  // console.log(response.data)
                  this.demandes = response.data
              })
              .catch(error => {
                  console.log(error)

              })
          this.fetchData()
      },
    created() {
      document.title = 'Gestion des congés';
    },
    components: {
          // Card,
          GradientLineChart,
          // Carousel,
          // CategoriesCard,
      },
  }
  </script>
  