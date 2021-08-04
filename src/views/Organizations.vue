<template>
  <div class="organizations">
    <section>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div>
        <p>Create Organization:</p>
        <router-link to="/organizations/new">
          <button>Add</button>
        </router-link>
      </div>

      <br />

      <div v-for="organization in organizations" v-bind:key="organization.id">
        <div class="organization">
          <h3>{{ organization.title }}</h3>
          <h4>ID: {{ organization.id }}</h4>
          <h4>Name: {{ organization.name }}</h4>
          <h4>Hourly Rate: {{ organization.hourly_rate }}</h4>
          <router-link v-bind:to="`/organizations/${organization.id}/edit`">
            <button class="btn">Edit</button>
          </router-link>
          <button class="btn" v-on:click="joinOrganization()">Join</button>
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
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      organizations: [],
      errors: [],
    };
  },
  created: function () {
    this.indexOrganizations();
  },
  methods: {
    indexOrganizations: function () {
      axios
        .get("/api/organizations")
        .then((res) => {
          this.organizations = res.data;
        })
        .catch((err) => {
          this.errors = [err.response.statusText];
        });
    },
  },
};
</script>
