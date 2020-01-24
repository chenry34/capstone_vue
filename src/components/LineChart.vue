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
        labels: [],
        datasets: [
          {
            label: "Data 1",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
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