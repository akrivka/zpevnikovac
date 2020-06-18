<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item md-size-33">
      <SongEditGuidelines />
    </div>

    <div class="md-layout-item md-size-50">
      <h1>Informace o písni</h1>
      <SongForm v-bind:songInfo="songInfo" />
      <div class="md-alignment-top-center">
        <md-button class="md-accent" v-on:click="postSong(type)">
          Přidat do
          <span v-if="type === 'PUBLIC'">hlavní</span>
          <span v-else>osobní</span> databáze
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
  name: "Song Add",
  components: {
    SongForm,
    SongEditGuidelines
  },
  data() {
    return {
      songInfo: {
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
      store.writeSong(type, this.songInfo);
    }
  }
};
</script>

<style scoped>
</style>