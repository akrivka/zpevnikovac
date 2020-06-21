<template>
  <div>
    <md-button :to="{name: 'SongEdit', params: { song_slug: song_info.slug }}">
      <md-icon>edit</md-icon>Upravit
    </md-button>
    <h2>{{ song_info.name }}</h2>
    <h3>{{ song_info.composer }}</h3>
    <h4 v-if="song_info.capo != 0 && song_info.capo">Capo: {{ song_info.capo }}</h4>
    <div class="content">
      <p>{{ song_info.content }}</p>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "SongView",
  data() {
    return {
      store,
      song_info: {
        id: "",
        name: "",
        slug: "",
        composer: "",
        capo: "",
        content: ""
      }
    };
  },
  created() {
    var type;
    if (!this.$route.path.includes("user")) {
      type = "PUBLIC";
    } else type = "USER";
    
    var that = this;
    
    this.store
      .getSongInfoBySlug(type, this.$route.params.song_slug)
      .then(function(result) {
        that.song_info = result;
      });
  }
};
</script>

<style lang="sass" scoped>
div
  text-align: center
  margin-left: auto
  margin-right: auto

.content
  width: 300pt
  margin-left: auto
  margin-right: auto

p
  text-align: left
  font-family: PT Mono
  white-space: pre-wrap
</style>