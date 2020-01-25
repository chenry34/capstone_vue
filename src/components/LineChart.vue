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
    console.log("got here")
    this.renderChart(
      {
        labels: this.x_axis,
        datasets: [
          {
            data: this.data,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: false,
        maintainAspectRatio: false,
        height: 300,
        showLine: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
    console.log("got there")
  }
};
</script>
