<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
<!--      <p class="text-sm">-->
<!--        <i class="fa fa-arrow-up text-success"></i>-->
<!--        <span class="font-weight-bold">{{detail1}}</span>-->
<!--        {{detail2}}-->
<!--      </p>-->
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from "chart.js/auto";

export default {
  name: "gradient-line-chart",

  props: {
    title: {
      type: String,
      default: "Evolution des demandes",
    },
    // detail1: {
    //   type: String,
    //   default: "4% more",
    // },
    // detail2: {
    //   type: String,
    //   default: "in 2021",
    // },

  },
    data() {
        return {
            dataAxio: [],
        };
    },

  async mounted() {

          await axios.get('http://localhost:3000/chart')
              .then(res=>{
                  this.dataAxio=res.data.results;
                  // console.log(res)
              })
              .catch(err=>{console.error(err)});

  // console.log(this.dataAxio)


    var ctx1 = document.getElementById("chart-line").getContext("2d");

    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
    gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: this.dataAxio.map(entry => entry.mois),
        // labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Nombre des demandes",
            tension: 0.4,
            // borderWidth: 0,
            pointRadius: 0,
            borderColor: "#4BB543 ",
            backgroundColor: gradientStroke1,
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            fill: true,
            data: this.dataAxio.map(entry => entry.conges_count),
            // data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#fbfbfb",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
};
</script>
