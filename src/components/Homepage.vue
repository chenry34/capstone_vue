<template>
  <div class="homepage">
    <h1>Smart Home Monitoring System</h1>
    <b-row class="mr-5 ml-5">

      <!-- <b-col sm="4">
        <b-card
          title="Door"
          class="card-style"
        >
          <b-card-text class="text-style">{{door}}</b-card-text>
        </b-card>
      </b-col> -->
      <b-col sm="4">
        <b-button
          title="Door"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-1
        >
        <p class="heading">Door</p>
        <p class="status">{{door}}</p>
          <b-modal title="Door" id="modal-1" hide-footer>Status: {{door}}</b-modal>
        </b-button>
      </b-col>



      <!-- <b-col sm="4">
        <b-card
          class="card-style"
          title="Window"
        >
          <b-card-text class="text-style">{{window}}</b-card-text>
        </b-card>
      </b-col> -->

      <b-col sm="4">
        <b-button
          title="Window"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-2
        >
        <p class="heading">Window</p>
        <p class="status">{{window}}</p>
          <b-modal title="Window" id="modal-2" hide-footer>Status: {{window}}</b-modal>
        </b-button>
      </b-col>


      <!-- <b-col sm="4">
        <b-card
          class="card-style"
          title="Humidity"
        >
          <b-card-text class="text-style">{{humidity}}%</b-card-text>
        </b-card>
      </b-col> -->

      <b-col sm="4">
        <b-button
          title="Humidity"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-3
        >
        <p class="heading">Humidity</p>
        <p class="status">{{humidity}}%</p>
          <b-modal title="Humidity" id="modal-3" hide-footer>Status: {{humidity}}%</b-modal>
        </b-button>
      </b-col>

    </b-row>
    <b-row class="ml-5 mr-5">

      <!-- <b-col sm="4">
        <b-card
          title="Temperature"
          class="card-style"
        >
          <b-card-text>
            <b-card-text class="text-style">10 C</b-card-text>
          </b-card-text>
        </b-card>
      </b-col> -->

      <b-col sm="4">
        <b-button
          title="Temperature"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-4
        >
        <p class="heading">Temperature</p>
        <p class="status">{{humidity}}10 °C</p>
          <b-modal title="Temperature" id="modal-4" hide-footer>Status: {{humidity}}10 °C</b-modal>
        </b-button>
      </b-col>


      <!-- <b-col sm="4">
        <b-card
          class="card-style"
          title="Carbon Monoxide"
        >
          <b-card-text class="text-style">0</b-card-text>
        </b-card>
      </b-col> -->
      <b-col sm="4">
        <b-button
          title="Carbon Monoxide"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-5
        >
        <p class="heading">Carbon Monoxide</p>
        <p class="status">{{humidity}}ppm</p>
          <b-modal title="Carbon Monoxide" id="modal-5" hide-footer>Status: {{humidity}}ppm</b-modal>
        </b-button>
      </b-col>


      <!-- <b-col sm="4">
        <b-card
          class="card-style"
          title="Motion"
        >
          <b-card-text class="text-style">{{motion}}</b-card-text>
        </b-card>
      </b-col> -->

      <b-col sm="4">
        <b-button
          title="Motion"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-6
        >
        <p class="heading">Motion</p>
        <p class="status">{{motion}}</p>
          <b-modal title="Motion" id="modal-6" hide-footer>Status: {{motion}}</b-modal>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data: function() {
    return {
      door: "",
      window: "",
      humidity: "",
      motion: "",
      pollingDoor: null,
      pollingWindow: null,
      pollingHumidity: null,
      pollingMotion: null
    };
  },
  created: function() {
    if (!this.$store.getters.getTokens || !this.$store.getters.getTokens.isAuthenticated()) {
      this.$router.push("/");
    }
    this.getDoor();
    this.getWindow();
    this.getHumidity();
    this.getMotion();
  },
  beforeDestroy() {
    clearInterval(this.pollingDoor);
    clearInterval(this.pollingWindow);
    clearInterval(this.pollingHumidity);
    clearInterval(this.pollingMotion);
  },
  methods: {
    getDoor() {
      this.pollingDoor = setInterval(() => {
        let vm = this;

        return this.$axios
          .get("http://localhost:8000/getDoor")
          //.get("http://192.168.0.102:8000/getDoor")
          .then(res => {
            vm.door = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 4000);
    },
    getWindow() {
      this.pollingWindow = setInterval(() => {
        let vm = this;

        return this.$axios
          .get("http://localhost:8000/getWindow")
          //.get("http://192.168.0.102:8000/getWindow")
          .then(res => {
            vm.window = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 4000);
    },
    getHumidity() {
      this.pollingHumidity = setInterval(() => {
        let vm = this;

        return this.$axios
          .get("http://localhost:8000/getHumidity")
          //.get("http://192.168.0.102:8000/getHumidity")
          .then(res => {
            vm.humidity = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 4000);
    },
    getMotion() {
      this.pollingMotion = setInterval(() => {
        let vm = this;

        return this.$axios
          .get("http://localhost:8000/getMotion")
          //.get("http://192.168.0.102:8000/getMotion")
          .then(res => {
            vm.motion = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 4000);
    }
  }
};
</script>

<style scoped>
.button {
  width: 100%;
  height: 250px;
}

.heading{
  font-size: 1.2em;
}
.status{
  font-size: 1.4em;
  color: chartreuse;
}
.text-style {
  margin-top: 25%;
  font-size: 150%;
}

.homepage {
  max-width: 1400px;
  margin: auto;
}

.header-style {
  font-size: 100%;
}

.card-style {
  background-color: #5792cf;
  color: white;
  margin-top: 10%;
  margin-bottom: 35%;
  margin-right: 0%;
  margin-left: 0%;
  height: 85%;
  display: flex;
  font-size: 200%;
}
</style>