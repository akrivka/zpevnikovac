<template>
  <div>
    <div v-if="song">
      <md-button :to="{name: route, params: { song_slug: song.song_info.slug }}">
        <md-icon>edit</md-icon>Upravit
      </md-button>
      <h2>{{ song.song_info.name }}</h2>
      <h3>{{ song.song_info.composer }}</h3>
      <h4
        v-if="song.song_info.capo != 0 && song.song_info.capo != null"
      >Capo: {{ song.song_info.capo }}</h4>
      <div class="content">
        <p>{{ song.song_info.content }}</p>
      </div>
    </div>
    <div v-else>Píseň nenalezena</div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "SongView",
  data() {
    return {
      store,
      type: ""
    };
  },
  computed: {
    route: function() {
      if (this.type)
        return (
          "SongEdit" + this.type.charAt(0) + this.type.toLowerCase().slice(1)
        );
      else return null;
    },
    song: function() {
      return store.currentSong;
    }
  },
  created() {
    if (!this.$route.path.includes("user")) {
      this.type = "PUBLIC";
    } else this.type = "USER";

    this.store.listenToSongSnapshotBySlug(this.type, this.$route.params.song_slug);
  }
};
</script>

<style lang="sass" scoped>
div
  text-align: center
  margin-left: auto
  margin-right: auto

.content
  width: 400pt
  margin-left: auto
  margin-right: auto

p
  text-align: left
  font-family: PT Mono
  white-space: pre-wrap
</style>