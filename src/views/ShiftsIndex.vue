<template>
  <div class="shifts-index">
    <div v-if="!currentUser.organization_id">Join an Organization first!</div>
    <div v-else>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <h2>All shifts at: {{ currentOrganization.name }} (${{ currentOrganization.hourly_rate }} / hr.)</h2>

      <div>
        <h3>Add New Shift:</h3>
        <router-link to="/shifts/new">
          <button>Add</button>
        </router-link>
      </div>

      <br />

      <div v-if="currentOrganization">
        <!-- <div v-for="shift in currentOrganization.shifts" v-bind:key="shift.id"> -->
        <div v-for="shift in sortedShifts" v-bind:key="shift.id">
          <div class="shift">
            <h4>ID: {{ shift.id }}</h4>
            <!-- <h4>User ID: {{ shift.user_id }}</h4> -->
            <h4>Employee Name: {{ shift.employee_name }}</h4>
            <p>Shift Date (start): {{ shift.shift_date }}</p>
            <!-- <p>Start: {{ shift.start }}</p>
            <p>Finish: {{ shift.finish }}</p> -->

            <span>Start Time: {{ new Date(shift.start).toUTCString().slice(-12) }}</span>
            /
            <span>Finish Time: {{ new Date(shift.finish).toUTCString().slice(-12) }}</span>
            <p>Break Length (minutes): {{ shift.break_length }}</p>
            <p>Hours Worked: {{ shift.hours_worked }}</p>
            <p>Shift Cost: ${{ shift.shift_cost }}</p>
            <hr />
          </div>
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
  computed: {
    sortedShifts() {
      return this.currentOrganization.shifts.slice().sort(function (a, b) {
        return new Date(b.finish) - new Date(a.finish);
      });
    },
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
</script>
