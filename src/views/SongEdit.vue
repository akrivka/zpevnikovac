<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item md-size-33">
      <SongEditGuidelines />
    </div>
    
    <div class="md-layout-item md-size-50">
      <h1>Informace o songu</h1>
      ID: {{ songId }}
      <SongForm v-bind:songInfo="songInfo" />
      <div class="md-alignment-top-center">
        <md-button class="md-accent" v-on:click="postSong(type)">
          Upravit v
          <span v-if="type === 'PUBLIC'">hlavní</span>
          <span v-else>osobní</span> databázi
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import SongEditGuidelines from "../components/SongEditGuidelines";
import SongForm from "../components/SongForm";

export default {
  name: "Song Edit",
  components: {
    SongForm,
    SongEditGuidelines
  },
  data() {
    return {
      song_info: {
        id: null,
        name: null,
        slug: null,
        composer: null,
        capo: null,
        content: null
      }
    };
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    postSong(type) {
      store.writeSong(type, this.song_info.id, this.song_info);
    }
  },
  created() {
    var type;
    if (!this.$route.path.includes("user")) {
      type = "PUBLIC";
    } else type = "USER";
    store.getSongBySlug(type, this.$route.params.song_slug);
  }
};
</script>

<style scoped>
</style>