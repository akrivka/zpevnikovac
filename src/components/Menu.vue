<template>
  <div>
    <div v-if="!store.currentUser">
      <md-button @click.prevent="signInWithGoogle">Přihlásit se přes Google</md-button>
    </div>
    <div v-else class="menu">
      <div class="user">
        <md-avatar style="margin:10px; width: 40px">
          <img v-bind:src="store.currentUser.photoURL" v-bind:alt="store.currentUser.displayName" />
        </md-avatar>
        <div>{{ store.currentUser.email }}</div>
      </div>

      <md-button :to="Songbooks" class="songbooks-button-large">Moje zpěvníky</md-button>
      <md-button :to="Songbooks" class="songbooks-button-small">Zpěvníky</md-button>
      <md-button @click.prevent="signOut" class="signout-button-large">Odhlásit se</md-button>
      <md-button @click.prevent="signOut" class="signout-button-small">
        <md-icon>login</md-icon>
      </md-button>
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

.songbooks-button-large {
  display: block;
  max-width: 160px;
  min-width: 120px;
}

.signout-button-large {
  display: block;
  max-width: 160px;
  min-width: 120px;
}

.songbooks-button-small {
  display: none;
}

.signout-button-small {
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
  .songbooks-button-large {
    display: none;
  }
  .signout-button-large {
    display: none;
  }

  .songbooks-button-small {
    display: block;
    max-width: 160px;
    min-width: 120px;
  }

  .signout-button-small {
    display: block;
    max-width: 160px;
    min-width: 120px;
  }
}
</style>