<template>
  <div>
    <div v-if="song">
      <div>
        <md-button to="/guidelines" style="float: left;">
          <md-icon>help</md-icon>Jak na to?
        </md-button>

        <md-button v-on:click="removeSong(type)" style="float: right;">
          Smazat píseň
          <md-icon>delete</md-icon>
        </md-button>
      </div>

      <h1>Informace o písni</h1>
      Naposledy upraveno: {{ song.user_name }} ({{ date }})
      <SongForm v-bind:song_info="song.song_info" />
      <div class="md-alignment-top-center">
        <md-button class="md-accent" v-on:click="postSong(type)">
          Upravit v
          <span v-if="type === 'PUBLIC'">hlavní</span>
          <span v-else>osobní</span> databázi
        </md-button>
      </div>
    </div>
    <div v-else>Píseň nenalezena.</div>
  </div>
</template>

<script>
import { store } from "../store";
import SongForm from "../components/SongForm";

export default {
  name: "SongEdit",
  components: {
    SongForm
  },
  data() {
    return {
      store,
      type: null
    };
  },
  methods: {
    postSong(type) {
      if (this.song) {
        store.writeSong(type, this.song.id, this.song.song_info);
      } else console.log("song not found");
      this.$router.go(-1);
    },
    removeSong(type) {
      store.removeSong(type, this.song.id);
    }
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
    },
    date: function() {
      var dt = this.song.time.toDate();
      return (
        dt.getDate() +
        ". " +
        dt.getMonth() +
        ". " +
        dt.getFullYear() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes()
      );
    }
  },
  created() {
    if (!this.$route.path.includes("user")) {
      this.type = "PUBLIC";
    } else this.type = "USER";

    this.store.listenToSongSnapshotBySlug(
      this.type,
      this.$route.params.song_slug
    );
  }
};
</script>

<style scoped>
</style>