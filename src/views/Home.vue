<template>
  <div id="app" class="container">
    <div class="welcome">
      <p>Přihlaš se vlevo nahoře.</p>
      <p>Jsou dvě databáze písní: hlavní a osobní. Do osobní máš přístup jen ty. Do hlavní zatím mají přístup všichni (než vyřeším přístupová práva, editace, a tak).</p>
      <p>Můžeš přidávat i upravovat songy v obou databázích. Prosím, když něco přidáváš do hlavní, dbej na to, aby to fakt bylo ve správném formátu (zobrazí se to pak totiž všem).</p>
      <p>
        Kdybys měl nějaký dotaz, napiš na
        <a
          href="mailto:adam.krivka@skaut.cz"
          target="_blank"
        >adam.krivka@skaut.cz</a>.
      </p>
    </div>

    <div class="add-button">
      <md-button class="md-accent md-raised" :to="{name: 'Song Add', params: {type: 'PUBLIC'}}">
        <md-icon>add</md-icon>Přidat píseň
      </md-button>
    </div>

    <div class="columns">
      <div class="md-layout">
        <div class="md-layout-item list-songs">
          <h2>Hlavní databáze</h2>
          <ListSongs v-on:move-song="moveSong" />
        </div>
        <div class="md-layout-item list-songs">
          <h2>Osobní databáze</h2>
          <ListSongs v-on:move-song="moveSong" />
        </div>
      </div>
    </div>

    <div class="tabs">
      <md-tabs>
        <md-tab id="tab-main" md-label="Hlavní">
          <ListSongs v-on:move-song="moveSong" />
        </md-tab>
        <md-tab id="tab-personal" md-label="Osobní">
          <ListSongs v-on:move-song="moveSong" />
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import ListSongs from "../components/ListSongs.vue";
import { store } from "../store";

export default {
  name: "Home",
  components: {
    ListSongs
  },
  data() {
    return {
      store
    };
  },
  methods: {
    moveSong() {}
  }
};
</script>

<style>
#app {
  font-family: themix, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: block;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
}

.welcome {
  text-align: left;
}

.add-button {
  text-align: right;
}

.list-songs {
  margin: 10px;
}

.tabs {
  display: none;
}

@media screen and (max-width: 991px) {
  .container {
    max-width: 728px;
  }
}

@media screen and (max-width: 599px) {
  .container {
    max-width: none;
  }
  .columns {
    display: none;
  }
  .tabs {
    display: block;
  }
}
</style>