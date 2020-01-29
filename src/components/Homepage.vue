<template>
  <div class="homepage mt-5 ">
    <h1>Smart Home Monitoring System</h1>
    <b-row class="mr-2 ml-2 mt-4">
      <b-col sm="4">
        <b-button
          title="Door"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-1
        >
          <p class="heading">Door</p>
          <p class="status">{{ door }}</p>
          <b-modal title="Door" id="modal-1" hide-footer>
            Status: {{ door }}
            <strong>Current Status:</strong> {{ door }}
            <br>
            <LineChart title="Door Data for Past 24 Hours" scaleType="0" y_axis_label="Door Status" :data="doorList" :x_axis="doorTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
      <b-col sm="4">
        <b-button
          title="Window"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-2
        >
          <p class="heading">Window</p>
          <p class="status">{{ window }}</p>
          <b-modal title="Window" id="modal-2" hide-footer>
            <strong>Current Status:</strong> {{ window }}
            <br>
            <LineChart title="Window Data for Past 24 Hours" scaleType="0" y_axis_label="Window Status" :data="windowList" :x_axis="windowTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
      <b-col sm="4">
        <b-button
          title="Humidity"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-3
        >
          <p class="heading">Humidity</p>
          <p class="status">{{ humidity }}%</p>
          <b-modal title="Humidity" id="modal-3" hide-footer>
            <strong>Current Status:</strong> {{ humidity }} %
            <br>
            <LineChart title="Humidity Data for Past 24 Hours" scaleType="2" y_axis_label="Humidity (%)" :data="humidityList" :x_axis="humidityTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="ml-2 mr-2">
      <b-col sm="4">
        <b-button
          title="Temperature"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-4
        >
          <p class="heading">Temperature</p>
          <p class="status">{{ temperature }}°C</p>
          <b-modal title="Temperature" id="modal-4" hide-footer>
            <strong>Current Status:</strong> {{ temperature }} °C
            <br>
            <LineChart title="Temperature Data for Past 24 Hours" scaleType="2" y_axis_label="Temperature (°C)" :data="tempList" :x_axis="tempTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
      <b-col sm="4">
        <b-button
          title="Carbon Monoxide"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-5
        >
          <p class="heading">Carbon Monoxide</p>
          <p class="status">{{ co }}ppm</p>
          <b-modal title="Carbon Monoxide" id="modal-5" hide-footer>
            <strong>Current Status:</strong> {{ co }} ppm
            <br>
            <LineChart title="Carbon Monoxide Data for Past 24 Hours" scaleType="2" y_axis_label="CO (ppm)" :data="coList" :x_axis="coTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
      <b-col sm="4">
        <b-button
          title="Motion"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-6
        >
          <p class="heading">Motion</p>
          <p class="status">{{ motion }}</p>
          <b-modal title="Motion" id="modal-6" hide-footer>
            <strong>Current Status:</strong> {{ motion }}
            <br>
            <LineChart title="Motion Data for Past 24 Hours" scaleType="1" y_axis_label="Motion Detected" :data="motionList" :x_axis="motionTime" ></LineChart>
          </b-modal>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="ml-2 mr-2">
      <b-col sm="4"></b-col>
      <b-col sm="4">
        <b-button
          title="Motion"
          class="button mt-3"
          size="lg"
          variant="primary"
          v-b-modal.modal-7
        >
          <p class="heading">Light</p>
          <p class="status">
            {{ lightDisplay }}
          </p>
          <b-modal title="Light" id="modal-7" hide-footer>
            Current Status:
            <b-form-checkbox
              class="mt-2"
              v-model="light"
              switch
              name="check-button"
            >
            <br>
            <LineChart title="Light Data for Past 24 Hours" scaleType="4" y_axis_label="Light Status" :data="lightList" :x_axis="lightTime" ></LineChart>
            </b-form-checkbox>
          </b-modal>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment';
import LineChart from './LineChart';

export default {
  name: "homepage",
  components: {
    LineChart
  },
  data: function () {
    return {
      door: "",
      window: "",
      humidity: "",
      motion: "",
      motionList: [],
      motionTime: [],
      tempList: [],
      tempTime: [],
      humidityList: [],
      humidityTime: [],
      coList: [],
      coTime: [],
      windowList: [],
      windowTime: [],
      doorList: [],
      doorTime: [],
      lightList: [],
      lightTime: [],
      co: "",
      temperature: "",
      light: "",
      lightDisplay: "",
      pollingDoor: null,
      pollingWindow: null,
      pollingHumidity: null,
      pollingMotion: null,
      pollingCO: null,
      pollingTemperature: null,
      pollingLight: null,
      url: "http://192.168.0.102:8000"
    };
  },
  created: function () {
    if (!this.$store.getters.getTokens || !this.$store.getters.getTokens.isAuthenticated()) {
      this.$router.push("/");
    }
    this.getDoor();
    this.getWindow();
    this.getHumidity();
    this.getMotion();
    this.getCO();
    this.getTemperature();
    this.getLight();
  },
  beforeDestroy() {
    clearInterval(this.pollingDoor);
    clearInterval(this.pollingWindow);
    clearInterval(this.pollingHumidity);
    clearInterval(this.pollingMotion);
    clearInterval(this.pollingCO);
    clearInterval(this.pollingTemperature);
    clearInterval(this.pollingLight);
  },
  watch: {
    light: function () {
      this.setLight()
    }
  },
  methods: {
    getDoor() {
      this.pollingDoor = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getDoor").then(res => {
          vm.doorList = [];
          vm.doorTime = [];

          if (res.data[res.data.length - 1].value == '0' || res.data[res.data.length - 1].value == 0){
            vm.door = "Closed";
          }
          else{
            vm.door = "Open"
          }
          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.doorList.push(res.data[i].value);
            vm.doorTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getWindow() {
      this.pollingWindow = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getWindow").then(res => {
          vm.windowList = [];
          vm.windowTime = [];

          if (res.data[res.data.length - 1].value == '0' || res.data[res.data.length - 1].value == 0){
            vm.window = "Closed";
          }
          else{
            vm.window = "Open";
          }
          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.windowList.push(res.data[i].value);
            vm.windowTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getHumidity() {
      this.pollingHumidity = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getHumidity").then(res => {
          vm.humidityList = [];
          vm.humidityTime = [];

          vm.humidity = res.data[res.data.length - 1].value;

          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.humidityList.push(res.data[i].value);
            vm.humidityTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getMotion() {
      this.pollingMotion = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getMotion").then(res => {
          vm.motionList = [];
          vm.motionTime = [];
          if (res.data[res.data.length-1].value == 0) {
            vm.motion = "No motion detected";
          } else {
            vm.motion = "Motion Detected";
          }
          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.motionList.push(res.data[i].value);
            vm.motionTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getCO() {
      this.pollingCO = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getCO").then(res => {
          vm.coList = [];
          vm.coTime =[];
          vm.co = res.data[res.data.length - 1].value;

          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.coList.push(res.data[i].value);
            vm.coTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getTemperature() {
      this.pollingTemperature = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getTemperature").then(res => {
          vm.tempList = [];
          vm.tempTime = [];
          
          vm.temperature = res.data[res.data.length - 1].value;

          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.tempList.push(res.data[i].value);
            vm.tempTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    getLight() {
      this.pollingLight = setInterval(() => {
        let vm = this;

        return this.$axios.get(this.url + "/getLight").then(res => {
          vm.lightList = [];
          vm.lightTime = [];

          if (res.data[res.data.length - 1].value == '0' || res.data[res.data.length - 1].value == 0) {
            vm.light = false;
            vm.lightDisplay = "Off";
          }
          else {
            vm.light = true;
            vm.lightDisplay = "On";
          }

          var i;
          for (i = 0; i < res.data.length; i++) {
            vm.lightList.push(res.data[i].value);
            vm.lightTime.push(moment(res.data[i].time_stamp).utc().format('MM-DD, H:mm:ss'));
          }
        }).catch(err => {
          console.log(err);
        });
      }, 2000);
    },
    setLight() {
      let vm = this
      clearInterval(this.pollingLight); // Stop polling the light during the request

      return this.$axios.post(this.url + "/setLight?light=" + vm.light).then(() => {
        this.getLight() // Start polling again
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
.button {
  width: 100%;
  height: 250px;
}

.heading {
  font-size: 1.2em;
}
.status {
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