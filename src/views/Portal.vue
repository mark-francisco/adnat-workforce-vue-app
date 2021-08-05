<template>
  <div class="portal">
    <div v-if="!currentUser.organization_id">Log in and join an Organization first!</div>
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
    getOrganization() {},
  },
};
</script>
