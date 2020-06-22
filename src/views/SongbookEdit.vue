<template>
  <div>
    <GenerateSongbook v-bind:songbook_slug="this.$route.params.songbook_slug"/>
    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <ListSongs v-bind:type="'PUBLIC'" v-bind:buttons="'database'" v-on:add-song="addSong" />
        <ListSongs v-bind:type="'USER'" v-bind:buttons="'database'" v-on:add-song="addSong" />
      </div>

      <div class="md-layout-item md-size-50">
        <ListSongs
          v-bind:type="'songbook'"
          v-bind:buttons="'songbook'"
          v-on:remove-song="removeSong"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import ListSongs from "../components/ListSongs";
import GenerateSongbook from "../components/GenerateSongbook";

export default {
  name: "SongbookEdit",
  components: {
    ListSongs,
    GenerateSongbook
  },
  data() {
    return {
      store,
      name
    };
  },
  created() {
    store.listenToSongs("PUBLIC");
    store.listenToSongs("USER");
    store.listenToSongbookSongs(this.$route.params.songbook_slug);
  },
  destroyed() {
    store.stopListeningToSongs();
  },
  methods: {
    addSong(song) {
      console.log(song);
      store.writeToSongbook(this.$route.params.songbook_slug, song);
    },
    removeSong(song) {
      console.log(song);
      store.removeFromSongbook(this.$route.params.songbook_slug, song);
    }
  }
};
</script>