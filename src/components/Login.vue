<template>
  <div class="login">
    <b-row>
      <b-col
        class="mt-5"
        sm="6"
        offset-sm="3"
      >
        <b-card
          style="text-align: left; padding: 10px"
          title="Please Login"
        >
          <b-row>
            <b-col>
              <label>Username:</label>
              <b-input
                class="mb-4"
                v-model="username"
              ></b-input>
              <label>Password:</label>
              <b-input
                v-model="password"
                type="password"
              ></b-input>
              <b-button
                style="float: right"
                class="mt-3 ml-auto"
                variant="success"
                @click="login"
              >Login</b-button>
              <label v-if="loginFailed" class="mt-3" style="color: red">* Username or Password are incorrect *</label>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TokenStorage from '../token-storage.js'
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      loginFailed: false,
      url: "http://192.168.0.102:8000"
    };
  },
  methods: {
    login() {
      let vm = this;
      let payload = {
        username: vm.username,
        password: vm.password
      };
      return this.$axios
        .post(this.url + "/api/token/", payload)
        .then(res => {
          var tokenStorage = new TokenStorage(res.data.access, res.data.refresh)
          this.$store.commit('updateTokens', tokenStorage)
          this.$router.push("home");
        })
        .catch(err => {
          console.log(err);
          vm.loginFailed = true;
        });
    }
  }
};
</script>

<style>
.login {
  max-width: 1000px;
  margin: auto;
}
</style>