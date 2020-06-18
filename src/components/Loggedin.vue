<template>
  <div>
    <div class="md-layout md-alignment-center-left">
      <md-avatar style="margin:10px">
        <img v-bind:src="store.currentUser.photoURL" v-bind:alt="store.currentUser.displayName" />
      </md-avatar>
      <p>{{ store.currentUser.email }}</p>
      <br />
      <md-button @click.prevent="signOut">Sign Out</md-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { store } from "../store";

export default {
  data() {
    return {
      store
    };
  },
  name: "Loggedin",
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .catch(err => alert(err.message || err));
    }
  }
};
</script>