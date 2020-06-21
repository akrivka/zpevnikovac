<template>
  <div>
    <form class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50">
        <md-field class="info">
          <label>Jméno</label>
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
          <label>Obsah</label>
          <md-textarea
            v-model="song_info.content"
            cols="50"
            md-autogrow
            style="font-family: 'PT Mono', monospace;"
          ></md-textarea>
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
      this.song_info.content = newContent.slice(0, newContent.length-1);
    }
  }
};
</script>