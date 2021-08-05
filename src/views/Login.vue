<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Log In</h1>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="emailAddress" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <router-link to="/forgotpassword">
        <input type="button" class="btn" value="Forgot Password" />
      </router-link>
      <input type="submit" class="btn" value="Log In!" />
    </form>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
.btn {
  margin: 2rem 2.5rem;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      emailAddress: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      let params = {
        email_address: this.emailAddress,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/organizations");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
