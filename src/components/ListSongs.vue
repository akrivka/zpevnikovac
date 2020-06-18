<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-list v-for="song in store.publicSongs" :key="song.id">
          <Song v-bind:song="song" v-bind:type="'PUBLIC'" v-on:add-song="addSong(song)" />
        </md-list>
      </md-card>
    </div>

    <div class="md-layout-item md-size-33">
      <md-card>
        <md-list v-for="song in store.userSongs" :key="song.id">
          <Song v-bind:song="song" v-bind:type="'USER'" v-on:remove-song="removeSong(song)"/>
        </md-list>
      </md-card>
    </div>
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
      store
    };
  },
  methods: {
    addSong(song) {
      store.writeSong('USER', song.songInfo);
    },
    removeSong(song) {
      store.removeSong('USER', song.id);
    }
  }
};
</script>

<style>
.list-songs {
  max-width: 1000px;
  text-align: center;
}
</style>
