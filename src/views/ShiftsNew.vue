<template>
  <div id="shifts-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="createShift()">
      <h2>Add New Shift:</h2>
      <router-link to="/shifts">
        <button>Back to Shifts Portal</button>
      </router-link>

      <div>
        <label for="start">Start:</label>
        <input type="datetime-local" id="start" v-model="start" required />
      </div>
      <div>
        <label for="finish">Finish:</label>
        <input type="datetime-local" id="finish" v-model="finish" required />
      </div>
      <div>
        <label for="break-length">Break Length:</label>
        <input type="text" id="break-length" v-model="breakLength" required />
      </div>

      <div>
        <input type="submit" value="Save Changes" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      currentUser: "",
      start: "",
      finish: "",
      breakLength: "",
      errors: [],
    };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      axios.get("/api/users").then((res) => {
        this.currentUser = res.data[0].current_user;
      });
    },
    createShift() {
      let params = {
        user_id: this.currentUser.id,
        start: this.start,
        finish: this.finish,
        break_length: this.breakLength,
      };
      axios
        .post("/api/shifts", params)
        .then(() => {
          // console.log(res);
          this.$router.push("/shifts");
        })
        .catch((err) => {
          this.errors = [err.response.data.errors];
        });
    },
  },
};
</script>
