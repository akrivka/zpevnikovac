<template>
  <div>
    <md-list-item :to="{name: route, params: {song_slug: song.slug}}">
      {{ song.name }} – {{ song.composer }}
      <div v-if="buttons == 'database'">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('add-song', song)">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div v-else-if="buttons == 'songbook'">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('remove-song', song)">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: "Song",
  props: ["song", "type", "buttons"],
  computed: {
    route: function() {
      if (this.type)
        return (
          "SongView" + this.type.charAt(0) + this.type.toLowerCase().slice(1)
        );
      else return null;
    }
  }
};
</script>