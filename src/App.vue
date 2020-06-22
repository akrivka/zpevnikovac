<template>
  <div id="app">
    <div class="header">
      <Menu />
      <h1 class="headline">Zpěvníkovač</h1>
    </div>
    <div class="container">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    Menu
  }
};
</script>

<style>
#app {
  font-family: TheMix, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.headline {
  display: block;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: auto;
  margin-top: 30px;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
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
}

@media screen and (max-width: 959px) {
  .headline {
    position: static;
  }
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
