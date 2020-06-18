<template>
  <div class="songeditor">
    <h1>Informace o songu</h1>
    ID: {{ songId }}
    <SongForm v-bind:songInfo="songInfo" />
    <div class="md-alignment-top-center">
      <md-button class="md-accent" v-on:click="postSong(type)">
        Poslat do
        <span v-if="type === 'PUBLIC'">hlavní</span>
        <span v-else>osobní</span> databáze
      </md-button>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import SongForm from "./SongForm";

export default {
  name: "SongEditor",
  components: {
    SongForm
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
  props: ["songId", "type"],
  methods: {
    postSong(type) {
      const songInfo = {
        name: this.name,
        composer: this.composer,
        capo: this.capo,
        content: this.content
      };
      store.editSong(type, this.songId, songInfo);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
