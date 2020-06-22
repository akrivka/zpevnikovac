<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-field class="search-wrapper">
      <md-input type="text" v-model="search" placeholder="Vyhledat píseň" />
      <label>Vyhledat píseň</label>
    </md-field>
    <md-card>
      <md-list v-for="song in filteredSongs" :key="song.id">
        <Song
          v-bind:song="song"
          v-bind:type="type"
          v-bind:buttons="buttons"
          v-on:add-song="$emit('add-song', song)"
          v-on:remove-song="$emit('remove-song', song)"
        />
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
      songs: null,
      search: ""
    };
  },
  props: ["type", "buttons"],
  created() {
    console.log("jsem tu " + this.type);
  },
  computed: {
    filteredSongs: function() {
      var songs;
      if (this.type === "PUBLIC") songs = this.store.publicSongs;
      else if (this.type == "USER") songs = this.store.userSongs;
      else if (this.type == "songbook") songs = this.store.songbookSongs;
      if (songs != null) {
        return songs.filter(song => {
          return song.name.toLowerCase().includes(this.search.toLowerCase());
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
