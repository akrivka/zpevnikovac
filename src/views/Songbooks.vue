<template>
  <div>
    <md-button :to="{name: 'SongbookAdd'}">
      <md-icon>add</md-icon>Přidat zpěvník
    </md-button>
    <h2>Moje zpěvníky</h2>
    <div class="songbooks">
    <div v-for="songbook in store.songbooks" :key="songbook.name">
      <md-card class="md-alignment-top-center songbook" style="width:300px;">
        <md-button :to="{name: 'SongbookEdit', params: {songbook_slug: songbook.slug}}">
          <h3>{{songbook.name}}</h3>
        </md-button>
      </md-card>
    </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "Songbooks",
  data() {
    return {
      store
    };
  },
  created() {
    store.listenToSongbooks();
  }
};
</script>

<style>
.songbooks {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>