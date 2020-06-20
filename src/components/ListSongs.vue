<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-field class="search-wrapper">
      <md-input type="text" v-model="search" placeholder="Vyhledat píseň" />
      <label>Vyhledat píseň</label>
    </md-field>
    <md-card>
      <md-list v-for="song in filteredSongs" :key="song.id">
        <Song v-bind:song="song" v-bind:type="'PUBLIC'" v-on:add-song="addSong(song)" />
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
  methods: {
    addSong(song) {
      store.writeSong("USER", song.songInfo);
    },
    removeSong(song) {
      store.removeSong("USER", song.id);
    }
  },
  computed: {
    filteredSongs: function() {
      if (this.store.publicSongs != null) {
        return this.store.publicSongs.filter(song => {
          return song.songInfo.name
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
