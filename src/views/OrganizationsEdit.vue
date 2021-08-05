<template>
  <div id="organizations-edit">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="updateOrganization()">
      <router-link to="/organizations">
        <button class="btn">Back to all Organizations</button>
      </router-link>

      <h2>Edit Organization:</h2>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="organizationToEdit.name" />
      </div>
      <div>
        <label for="hourly-rate">Hourly Rate:</label>
        <input type="text" id="hourly-rate" v-model="organizationToEdit.hourly_rate" />
      </div>

      <input type="submit" class="btn" value="Save Changes" />
      <button type="button" class="btn" v-on:click="deleteOrganization()">Delete Organization</button>
    </form>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
.btn {
  margin: 0.75rem 2.5rem;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      organizationToEdit: "",
      errors: [],
    };
  },
  created() {
    this.showOrganization();
  },
  methods: {
    showOrganization() {
      axios
        .get(`/api/organizations/${this.$route.params.id}`)
        .then((res) => {
          this.organizationToEdit = res.data;
          // console.log(res.data);
        })
        .catch(() => {
          this.errors = ["Unable to get this Organization."];
        });
    },
    updateOrganization() {
      let params = {
        name: this.organizationToEdit.name,
        hourly_rate: this.organizationToEdit.hourly_rate,
      };
      axios
        .patch(`/api/organizations/${this.organizationToEdit.id}`, params)
        .then((res) => {
          console.log(res);
          this.$router.push("/organizations");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
    deleteOrganization: function () {
      if (confirm("Are you sure you want to delete this Organization?")) {
        axios
          .delete(`/api/organizations/${this.organizationToEdit.id}`)
          .then(() => {
            // console.log(res);
            this.$router.push("/organizations");
          })
          .catch(() => {
            this.errors = ["Unable to delete this Organization."];
          });
      }
    },
  },
};
</script>
