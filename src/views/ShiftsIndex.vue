<template>
  <div class="shifts-index">
    <div v-if="!currentUser.organization_id">Join an Organization first!</div>
    <div v-else>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <h2>All shifts at: {{ currentOrganization.name }}</h2>

      <div>
        <h3>Add New Shift:</h3>
        <router-link to="/shifts/new">
          <button>Add</button>
        </router-link>
      </div>

      <br />

      <div v-for="shift in currentOrganization.shifts" v-bind:key="shift.id">
        <div class="shift">
          <h4>ID: {{ shift.id }}</h4>
          <h4>User ID: {{ shift.user_id }}</h4>
          <h4>Employee Name: {{ shift.employee_name }}</h4>
          <h4>Shift Date: {{ shift.shift_date }}</h4>
          <h4>Start: {{ shift.start }}</h4>
          <h4>Finish: {{ shift.finish }}</h4>
          <h4>Break Length: {{ shift.break_length }}</h4>
          <h4>Hours Worked: {{ shift.hours_worked }}</h4>
          <h4>Shift Cost: {{ shift.shift_cost }}</h4>
          <router-link v-if="shift.user_id === currentUser.id" v-bind:to="`/shifts/${shift.id}/edit`">
            <button class="btn">Edit</button>
          </router-link>

          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
hr {
  width: 50%;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentUser: "",
      currentOrganization: "",
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
        if (this.currentUser.organization_id) {
          this.getOrganization();
        }
      });
    },
    getOrganization() {
      axios
        .get(`/api/organizations/${this.currentUser.organization_id}`)
        .then((res) => {
          this.currentOrganization = res.data;
        })
        .catch((err) => {
          this.errors = ["Unable to get this Organization"];
          console.log(err.response);
        });
    },
  },
};

// computed: {
//   sortedStops: function () {
//     return this.currentTrip.stops.slice().sort(function (a, b) {
//       return new Date(a.start_date) - new Date(b.start_date);
//     });
//   },
// },
</script>
