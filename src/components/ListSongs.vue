<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-field class="search-wrapper">
      <md-input type="text" v-model="search" placeholder="Vyhledat píseň" />
      <label>Vyhledat píseň</label>
    </md-field>
    <md-card>
      <md-list v-for="song in filteredSongs" :key="song.id">
        <Song v-bind:song_name="song.name" v-bind:song_composer="song.composer" v-bind:song_slug="song.slug" v-bind:type="type"/>
      </md-list>
    </md-card>
  </div>
</template>

<script>
import { store } from "../store";
import Song from "./Song";

export default {
  name: "ListSongs",
  components: {
    Song
  },
  data() {
    return {
      store,
      search: ""
    };
  },
  props: ["type"],
  computed: {
    filteredSongs: function() {
      var songs;
      if (this.type === "PUBLIC") songs = this.store.publicSongs;
      else songs = this.store.userSongs;

      if (songs != null) {
        return songs.filter(song => {
          return song.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else return null;
    }
  }
};
</script>

<style>
.search-wrapper {
  width: 80%;
}
</style>
