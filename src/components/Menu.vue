<template>
  <div>
    <div v-if="!store.currentUser" class="menu">
      <md-button @click.prevent="signInWithGoogle">Přihlásit se přes Google</md-button>
    </div>
    <div v-else class="menu">
      <div class="user">
        <md-avatar style="margin:10px; width: 40px">
          <img v-bind:src="store.currentUser.photoURL" v-bind:alt="store.currentUser.displayName" />
        </md-avatar>
        <div>{{ store.currentUser.email }}</div>
      </div>

      <div class="menu-large">
        <md-button to="/">Domů</md-button>
        <md-button to="/songbooks">Moje zpěvníky</md-button>
        <md-button @click.prevent="signOut">Odhlásit se</md-button>
      </div>

      <div class="menu-small">
        <md-button to="/" class="menu-button-small">
          <md-icon>home</md-icon>
        </md-button>
        <md-button to="/songbooks" class="menu-button-small">
          <md-icon>book</md-icon>
        </md-button>
        <md-button @click.prevent="signOut" class="signout-button-small">
          <md-icon>login</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { store } from "../store";

export default {
  name: "Menu",
  data() {
    return {
      store
    };
  },
  methods: {
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(err => alert(err.message || err));
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .catch(err => alert(err.message || err));
    }
  }
};
</script>

<style scoped>
.menu {
  position: relative;
  left: 0%;
  top: 0%;
  right: auto;
  bottom: auto;
  display: block;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.user {
  position: static;
  display: flex;
  align-items: center;
}

.menu-large md-button {
  display: block;
  max-width: 160px;
  min-width: 120px;
}

.menu-small {
  display: none;
}

@media screen and (max-width: 959px) {
  .menu {
    display: flex;
    justify-content: flex-start;
  }
  .user {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
  }
  .menu-large {
    display: none;
  }

  .menu-small {
    display: block;
  }
  .menu-small md-button {
    max-width: 160px;
    min-width: 120px;
  }
}
</style>