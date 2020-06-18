<template>
  <div class="md-layout md-alignment-center-left">
    <Login v-if="!store.currentUser" />
    <Loggedin v-else />
  </div>
</template>

<script>
import Login from "./Login.vue";
import Loggedin from "./Loggedin.vue";
import { store } from "../store";

export default {
  name: "User",
  components: {
    Login,
    Loggedin
  },
  data() {
    return {
      store
    };
  }
};
</script>