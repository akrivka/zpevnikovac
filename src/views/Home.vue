<template>
  <div id="app" class="md-layout md-alignment-top-center">
    <h1>Zpěvníkovač</h1>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-33 info">
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
      <div class="md-layout-item md-size-33">
        <CreateSongbook />
      </div>
    </div>
    <br />

    <md-button class="md-accent md-raised" :to="{name: 'Song Add', params: {type: 'PUBLIC'}}">
      <md-icon>add</md-icon>Přidat do hlavní databáze
    </md-button>
    <md-button class="md-primary md-raised" :to="{name: 'Song Add', params: {type: 'USER'}}">
      <md-icon>add</md-icon>Přidat do osobní databáze
    </md-button>

    <ListSongs v-on:move-song="moveSong" style="margin-top: 30px" />
  </div>
</template>

<script>
import CreateSongbook from "../components/CreateSongbook.vue";
import ListSongs from "../components/ListSongs.vue";
import { store } from "../store";

export default {
  name: "Home",
  components: {
    ListSongs,
    CreateSongbook
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
.info p {
  text-align: left;
}
h1,
h2,
h3 {
  font-family: skautbold;
}

/*------------------------------------*\
	typografie (z cdn.skauting.cz)
\*------------------------------------*/

/* CSS Document */
@font-face {
  font-family: "themix";
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400.eot");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400.eot? #iefix")
    format("embedded-opentype");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400.woff") format("woff"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400.woff2") format("woff2"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400.otf") format("opentype"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400.svg#themix") format("svg");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "themix";
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.eot");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.eot? #iefix")
    format("embedded-opentype");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.woff") format("woff"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.woff2") format("woff2"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.otf") format("opentype"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_400i.svg#themix") format("svg");
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: "themix";
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700.eot");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700.eot? #iefix")
    format("embedded-opentype");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700.woff") format("woff"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700.woff2") format("woff2"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700.otf") format("opentype"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700.svg#themix") format("svg");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "themix";
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.eot");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.eot? #iefix")
    format("embedded-opentype");
  src: url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.woff") format("woff"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.woff2") format("woff2"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.otf") format("opentype"),
    url("https://cdn.skauting.cz/fonts/TheMix_LT_700i.svg#themix") format("svg");
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: "skautbold";
  src: url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.eot");
  src: url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.eot? #iefix")
    format("embedded-opentype");
  src: url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.woff")
      format("woff"),
    url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.woff2")
      format("woff2"),
    url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.otf")
      format("opentype"),
    url("https://cdn.skauting.cz/fonts/skaut-bold-webfont.svg#skautbold")
      format("svg");
  font-weight: normal;
  font-style: normal;
}
</style>
