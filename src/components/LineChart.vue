<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: false
    },
    x_axis: {
      type: Array,
      required: false
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.x_axis,
        datasets: [
          {
            data: this.data,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
            steppedLine: true,
          }
        ]
      },
      {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Motion Data for Past 24 Hours"
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Motion Detected'
            },
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (Number.isInteger(value)) {
                  if (value == 0)
                    return "No"
                  else if (value == 1)
                    return "Yes"
                }
              },
              stepSize: 1
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }, 
            type: "time",
            distribution: 'linear',
            ticks: {
              source: 'auto'
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    );
  }
};
</script>
