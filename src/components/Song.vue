<template>
  <div>
    <md-list-item :to="{name: 'Song Edit', params: {songId: song.id, type: type}}">
      {{ song.songInfo.name }} – {{ song.songInfo.composer }}
<!--       <div v-if="type === 'PUBLIC'" to="../views/SongEdit">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('add-song', song.id)">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div v-else-if="type === 'USER'" to="../views/SongEdit">
        <md-button class="md-icon-button" v-on:click.prevent="$emit('remove-song', song.id)">
          <md-icon>remove</md-icon>
        </md-button>
      </div> -->
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: "Song",
  props: ["song", "type"]
};
</script>