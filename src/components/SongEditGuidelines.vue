<template>
  <div>
    <h2>Jak na to?</h2>
    <p>
      Na začátku každého řádku jsou 3 mezery.
      <br />Všechny akordy piš normálně Am, F#, Dsus2, ...
      <br />Capo můžeš nechat volný, pokud tam není.
      <br />Délku každého řádku zkus družet do
      <b>50</b> znaků, ale nijak zvlášť to ošetřený zatím není.
    </p>
    <h3>Vzorová píseň</h3>
    <i>
      (Formát je stejný/podobný jako na
      <a href="https://www.pisnicky-akordy.cz" target="_blank">pisnicky-akordy.cz</a>.)
    </i>
    <p class="example-song">{{ batalion }}</p>
  </div>
</template>

<script>
export default {
  name: "SongEditGuidelines",
  data() {
    return {
      batalion: `
   Ami  C     G    Ami           C      G  Emi Ami
*: Víno máš a markytánku, dlouhá noc se prohýří,
   víno máš a chvilku spánku, díky, díky, verbíři.

   Ami                           C          G      Ami Emi
1. Dříve než se rozední, kapitán k osedlání rozkaz dává,
   Ami                   G  Ami Emi Ami
   ostruhami do slabin koně pohání.
   Tam na straně polední, čekají ženy, zlaťáky a sláva,
   do výstřelů z karabin zvon už vyzvání.

   Ami       C      G              Ami Emi
R: Víno na kuráž, a pomilovat markytánku,
   Ami         C              Ami Emi Ami
   zítra do Burgund, batalion zamíří.
   Víno na kuráž a k ránu dvě hodiny spánku,
   díky, díky vám královští verbíři.

2. Rozprášen je batalion, poslední vojáci se k zemi hroutí,
   na polštáři z kopretin budou věčně spát.
   Neplač sladká Marion, verbíři nové chlapce přivedou ti,
   za královský hermelín, padne každý rád.

R: Víno na kuráž ...
*: Víno máš a markytánku ...`
    };
  }
};
</script>

<style scoped>
.example-song {
  color: #111111;
  white-space: pre-wrap;
  font-family: PT-Mono, monospace;
  text-align: left;
  border: 1px solid #111111;
  padding: 10px;
}
</style>