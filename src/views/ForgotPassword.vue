<template>
  <div class="login">
    <h1>Forgot Password</h1>
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>

    <p>Enter the email associated with your account:</p>
    <form v-on:submit.prevent="searchUser()">
      <div>
        <label>Email:</label>
        <input type="email" v-model="emailAddress" />
      </div>
      <input type="submit" class="btn" value="Submit" />
    </form>

    <div v-if="selectedUser.length > 0">
      <p>Now, please enter your new password:</p>
      <form v-on:submit.prevent="updatePassword()">
        <div>
          <label>Password:</label>
          <input type="password" v-model="newPassword" />
        </div>
        <div>
          <label>Password Confirmation:</label>
          <input type="password" v-model="newPasswordConfirmation" />
        </div>
        <input type="submit" class="btn" value="Submit" />
      </form>
    </div>
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
      selectedUser: "",
      newPassword: "",
      newPasswordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    searchUser() {
      axios
        .get("/api/users")
        .then((res) => {
          let allUsers = res.data;
          this.selectedUser = allUsers.filter((user) => {
            return user.email_address === this.emailAddress;
          });
        })
        .then(() => {
          this.errors = ["Could not find the account."];
        });
    },
    updatePassword() {
      let params = {
        password: this.newPassword,
        password_confirmation: this.newPasswordConfirmation,
      };
      axios
        .patch(`/api/users/${this.selectedUser[0].id}`, params)
        .then(() => {
          // console.log(res.data);
          this.$router.push("/login");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
