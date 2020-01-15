<template>
  <div class="homepage">
    <b-row class="mt-4 mr-5 ml-5">
      <b-col sm="4">
        <b-card
          title="Door"
          class="card-style"
        >
          <b-card-text class="text-style">{{door}}</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card
          class="card-style"
          title="Window"
        >
          <b-card-text class="text-style">{{window}}</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card
          class="card-style"
          title="Humidity"
        >
          <b-card-text class="text-style">{{humidity}}%</b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3 ml-5 mr-5">
      <b-col sm="4">
        <b-card
          title="Temperature"
          class="card-style"
        >
          <b-card-text>
            <b-card-text class="text-style">10 C</b-card-text>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card
          class="card-style"
          title="Carbon Monoxide"
        >
          <b-card-text class="text-style">{{co}}</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card
          class="card-style"
          title="Motion"
        >
          <b-card-text class="text-style">{{motion}}</b-card-text>
        </b-card>
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
      co: "",
      pollingDoor: null,
      pollingWindow: null,
      pollingHumidity: null,
      pollingMotion: null,
      pollingCO: null,
      url: "http://192.168.0.102:8000"
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
    this.getCO();
  },
  beforeDestroy() {
    clearInterval(this.pollingDoor);
    clearInterval(this.pollingWindow);
    clearInterval(this.pollingHumidity);
    clearInterval(this.pollingMotion);
    clearInterval(this.pollingCO);
  },
  methods: {
    getDoor() {
      this.pollingDoor = setInterval(() => {
        let vm = this;

        return this.$axios
          .get(this.url + "/getDoor")
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
          .get(this.url + "/getWindow")
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
          .get(this.url + "/getHumidity")
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
          .get(this.url + "/getMotion")
          .then(res => {
            vm.motion = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 4000);
    },
    getCO() {
      this.pollingCO = setInterval(() => {
        let vm = this;

        return this.$axios
          .get(this.url + "/getCO")
          .then(res => {
            vm.co = res.data;
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