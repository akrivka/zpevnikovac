<template>
  <div>
    <md-list-item
      :to="{name: route, params: {song_slug: song_slug}}"
    >
      {{ song_name }} – {{ song_composer }}
      <!--       <div v-if="type === 'PUBLIC'" to="../views/SongEdit">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('add-song', song.id)">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div v-else-if="type === 'USER'" to="../views/SongEdit">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('remove-song', song.id)">
          <md-icon>remove</md-icon>
        </md-button>
      </div>-->
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: "Song",
  props: ["song_name", "song_composer", "song_slug", "type"],
  computed: {
    route: function() {
      if(this.type)
      return "SongView" + this.type.charAt(0) + this.type.toLowerCase().slice(1);
      else return null;
    }
  }
};
</script>