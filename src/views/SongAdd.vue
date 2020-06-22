<template>
  <div >
      <md-button to="/guidelines" style="float: left;">
        <md-icon>help</md-icon>Jak na to?
      </md-button>

      <h2>Informace o písni</h2>
      <SongForm v-bind:song_info="song_info" />
      <div class="md-alignment-top-center">
        <md-button class="md-accent" v-on:click="postSong(type)">
          Přidat do
          <span v-if="type === 'PUBLIC'">hlavní</span>
          <span v-else>osobní</span> databáze
        </md-button>
      </div>
  </div>
</template>

<script>
import { store } from "../store";
import SongForm from "../components/SongForm";

var slug = require("slug");

export default {
  name: "SongAdd",
  components: {
    SongForm,
  },
  data() {
    return {
      song_info: {
        name: null,
        composer: null,
        capo: null,
        content: null
      }
    };
  },
  props: {
    type: {
      required: true
    }
  },
  methods: {
    postSong(type) {
      this.song_info.slug = slug(this.song_info.name);
      store.writeSong(type, null, this.song_info);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>