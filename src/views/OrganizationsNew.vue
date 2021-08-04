<template>
  <div id="organizations-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="createOrganization()">
      <h2>Add New Organization:</h2>
      <router-link to="/organizations">
        <button>Back to all Organizations</button>
      </router-link>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div>
        <label for="hourly-rate">Hourly Rate:</label>
        <input type="text" id="hourly-rate" v-model="hourlyRate" />
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
      name: null,
      hourlyRate: null,
      errors: [],
    };
  },

  methods: {
    createOrganization: function () {
      let params = {
        name: this.name,
        hourly_rate: this.hourlyRate,
      };
      axios
        .post("/api/organizations", params)
        .then(() => {
          // console.log(res);
          this.$router.push("/organizations/");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
