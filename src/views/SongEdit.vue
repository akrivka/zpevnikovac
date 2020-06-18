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
      songInfo: {
        name: null,
        composer: null,
        capo: null,
        content: null
      }
    };
  },
  props: {
    songId: {
      type: String,
      required: true
    },
    type: {
      required: true
    }
  },
  methods: {
    postSong(type) {
      store.editSong(type, this.songId, this.songInfo);
    }
  },
  created() {
    console.log(this.type);
    var songs = null;
    if (this.type === "PUBLIC") songs = store.publicSongs;
    else songs = store.userSongs;

    var song = songs.filter(sng => {
      return sng.id === this.songId;
    })[0];
    this.songInfo.name = song.songInfo.name;
    this.songInfo.composer = song.songInfo.composer;
    this.songInfo.capo = song.songInfo.capo;
    this.songInfo.content = song.songInfo.content;
  }
};
</script>

<style scoped>
</style>