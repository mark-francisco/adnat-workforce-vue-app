<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Sign Up!</h1>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <div>
        <label>Name:</label>
        <input type="text" v-model="name" />
      </div>
      <div>
        <label>Email Address:</label>
        <input type="email" v-model="emailAddress" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div>
        <label>Password Confirmation:</label>
        <input type="password" v-model="passwordConfirmation" />
      </div>
      <input type="submit" value="Sign Up!" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      let params = {
        name: this.name,
        email_address: this.emailAddress,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
