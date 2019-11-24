<template>
  <div>
    <b-row class="mt-4 mr-5 ml-5">
      <b-col sm="4">
        <b-card title="Door" class="card-style">
          <b-card-text class="text-style">{{door}}</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card class="card-style" title="Window">
          <b-card-text class="text-style">Closed</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card class="card-style" title="Humidity">
          <b-card-text class="text-style">10%</b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3 ml-5 mr-5">
      <b-col sm="4">
        <b-card title="Temperature" class="card-style">
          <b-card-text>
            <b-card-text class="text-style">10 C</b-card-text>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card class="card-style" title="Carbon Monoxide">
          <b-card-text class="text-style">0</b-card-text>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card class="card-style" title="Motion">
          <b-card-text class="text-style">None</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: "homepage",
  data: function() {
      return {
          door: ""
      }
  },
  created: function() {
      this.getDoor()
  },
  methods: {
      getDoor() {
          setInterval(() => {
            let vm = this

            return axios.get("http://127.0.0.1:8000/getDoor").then(res => {
                vm.door = res.data
            })
          }, 4000)
      }
  }
};
</script>

<style scoped>
.text-style {
  margin-top: 25%;
  font-size: 150%;
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