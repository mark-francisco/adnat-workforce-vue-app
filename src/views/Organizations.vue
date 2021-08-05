<template>
  <div class="organizations">
    <section v-if="!currentUser">You need to log in first!</section>

    <section v-else>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <h2>Welcome, {{ currentUser.name }}</h2>

      <div>
        <h3>Create New Organization:</h3>
        <router-link to="/organizations/new">
          <button>Create</button>
        </router-link>
      </div>

      <br />

      <div v-for="organization in organizations" v-bind:key="organization.id">
        <div class="organization">
          <h4>ID: {{ organization.id }}</h4>
          <h4>Name: {{ organization.name }}</h4>
          <h4>Hourly Rate: {{ organization.hourly_rate }}</h4>
          <router-link v-bind:to="`/organizations/${organization.id}/edit`">
            <button class="btn">Edit</button>
          </router-link>
          <button v-if="currentUser.organization_id === organization.id" class="btn" v-on:click="leaveOrganization()">
            Leave
          </button>
          <button v-else class="btn" v-on:click="joinOrganization(organization)">Join</button>
          <!-- {{ organization.shifts }} -->
          <hr />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
.btn {
  margin: 0rem 0.5rem;
}
hr {
  width: 50%;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      organizations: [],
      errors: [],
      currentUser: null,
    };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    indexOrganizations() {
      axios
        .get("/api/organizations")
        .then((res) => {
          this.organizations = res.data;
        })
        .catch((err) => {
          this.errors = [err.response.statusText];
        });
    },
    joinOrganization(organization) {
      if (confirm("You can only be in one Org. If you join this one, your existing shifts will be deleted.")) {
        let params = {
          organization_id: organization.id,
          clear_shifts: true,
        };
        axios
          .patch(`/api/users/${this.currentUser.id}`, params)
          .then(() => {
            this.$router.push("/shifts");
          })
          .catch((err) => {
            this.errors = err.response.data.errors;
          });
      }
    },
    leaveOrganization() {
      if (confirm("If you leave the Org, your shifts will be deleted.")) {
        let params = {
          organization_id: "",
          clear_shifts: true,
        };
        axios
          .patch(`/api/users/${this.currentUser.id}`, params)
          .then(() => {
            this.$router.push("/shifts");
          })
          .catch((err) => {
            this.errors = err.response.data.errors;
          });
      }
    },
    getCurrentUser() {
      axios.get("/api/users").then((res) => {
        this.currentUser = res.data[0].current_user;
        this.indexOrganizations();
      });
    },
  },
};
</script>
