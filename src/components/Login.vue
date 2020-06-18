<template>
  <div>
    <md-button @click.prevent="signInWithGoogle">Sign in with Google</md-button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods: {
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .catch((err) => alert(err.message || err));
    }
  }
}
</script>