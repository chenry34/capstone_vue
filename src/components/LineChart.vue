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
    },
    y_axis_label: {
      type: String,
      required: false
    },
    scaleType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.renderLineChart();
  },

  computed: {
    chartData: function () {
      return this.data;
    }
  },

  methods: {
    renderLineChart: function () {
      let vm = this
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
          animation: {
            duration: 0
          },
          title: {
            display: true,
            text: this.title
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.y_axis_label
              },
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  if (vm.scaleType == "0") {
                    if (Number.isInteger(value)) {
                      if (value == 0)
                        return "Closed"
                      else if (value == 1)
                        return "Open"
                    }
                  } else if (vm.scaleType == "1") {
                    if (Number.isInteger(value)) {
                      if (value == 0)
                        return "No"
                      else if (value == 1)
                        return "Yes"
                    }
                  } else if (vm.scaleType == "4"){
                    if (Number.isInteger(value)) {
                      if (value == 0)
                        return "Off"
                      else if (value == 1)
                        return "On"
                    }
                  } else {
                    return value
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
  },

  watch: {
    data: function () {
      this.renderLineChart();
    }
  }

};
</script>
