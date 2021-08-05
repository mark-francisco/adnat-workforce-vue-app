<template>
  <div class="portal">
    <div v-if="!currentUser || !currentUser.organization_id">Join an Organization first!</div>
    <div v-else>this is your organization</div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentUser: "",
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
      axios.get(`/api/organizations/${this.currentUser.organization_id}`);
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
