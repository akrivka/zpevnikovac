<template>
  <div>
    <form class="md-layout md-alignment-top-center">
      <div class="md-layout-item">
        <md-field class="info">
          <label>Název</label>
          <md-input v-model="song_info.name" type="text" />
        </md-field>
        <md-field class="info">
          <label>Autor</label>
          <md-input v-model="song_info.composer" type="text" />
        </md-field>
        <md-field class="info">
          <label>Capo</label>
          <md-input v-model="song_info.capo" type="text" />
        </md-field>
        <md-button v-on:click="addThreeSpaces">Přidat tři mezery na začátek každého řádku</md-button>
        <md-field class="info">
          <!-- <label>Obsah</label> -->
          <textarea
            v-model="song_info.content"
            style="font-family: 'PT Mono', monospace; width: 100%"
            rows="30"
            ></textarea>
        </md-field>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SongForm",
  props: ["song_info"],
  methods: {
    addThreeSpaces() {
      var newContent = "";
      for (let i = 0; i < this.song_info.content.split("\n").length; i++) {
        newContent += "   " + this.song_info.content.split("\n")[i] + "\n";
      }
      this.song_info.content = newContent.slice(0, newContent.length - 1);
    }
  }
};
</script>