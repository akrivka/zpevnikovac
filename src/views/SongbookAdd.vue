<template>
  <div class="md-layout">
    <form class="md-layout md-alignment-top-center">
      <div class="md-layout-item">
        <md-field class="info">
          <label>Název zpěvníku</label>
          <md-input v-model="name" type="text" />
        </md-field>
      </div>
    </form>
    <md-button class="md-accent" v-on:click="createSongbook">Vytvořit zpěvník</md-button>
  </div>
</template>

<script>
import { store } from "../store.js";

var slug = require("slug");

export default {
  name: "SongbookAdd",
  data() {
    return {
      store,
      name
    };
  },
  methods: {
    createSongbook: function() {
      var songbook_slug = slug(this.name);
      store.createSongbook(this.name, songbook_slug);
      this.$router.push({
        name: "SongbookEdit",
        params: { songbook_slug: songbook_slug }
      });
    }
  }
};
</script>