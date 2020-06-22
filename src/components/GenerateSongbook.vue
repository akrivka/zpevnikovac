<template>
  <div>
    <div class="md-layout-md gutter md-alignment-top-center">
      <md-button
        class="md-layout-item md-size-25 md-raised"
        id="generateButton"
        v-on:click="generate"
      >Vygenerovat zpěvník</md-button>
    </div>Vytvoří Ti Google Dokument se vzorovými styly.
    <br />Musíš je manuálně změnit (označit řádek a dát u příslušného stylu
    <i>"Aktualizovat styl [styl], aby odpovídal výběru."</i>)
    <br />Hlavně musíš na
    <i>Normální text</i> a
    <i>Nadpis 2</i> dát nějaké tzv.
    <b>monospace písmo</b> (každé písmeno má stejnou šířku), jinak se ty akordy rozbijou.
    <br />
    <a id="linkDiv" target="_blank"></a>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "GenerateSongbook",
  data() {
    return {
      store
    };
  },
  props: ["songbook_slug"],
  methods: {
    generate() {
      store.getSongsToGenerate(this.songbook_slug);

      if (!this.$gapi.isAuthenticated()) this.$gapi.login();
      this.$gapi.getGapiClient().then(gapi => {
        gapi.client.docs.documents
          .create({
            title: this.songbook_lug,
            documentStyle: {
              background: {
                color: {}
              },
              pageNumberStart: 1,
              marginTop: {
                magnitude: 28.346456692913389,
                unit: "PT"
              },
              marginBottom: {
                magnitude: 28.346456692913389,
                unit: "PT"
              },
              marginRight: {
                magnitude: 72.000000000000014,
                unit: "PT"
              },
              marginLeft: {
                magnitude: 72.000000000000014,
                unit: "PT"
              },
              pageSize: {
                height: {
                  magnitude: 841.8897637795277,
                  unit: "PT"
                },
                width: {
                  magnitude: 595.27559055118115,
                  unit: "PT"
                }
              },
              marginHeader: {
                magnitude: 36,
                unit: "PT"
              },
              marginFooter: {
                magnitude: 36,
                unit: "PT"
              },
              useCustomHeaderFooterMargins: true
            }
          })
          .then(function(response) {
            var doc = response.result;
            console.log(
              "User " +
                store.currentUser.email +
                " successfully created a Google Document called: " +
                doc.title
            );

            var link =
              "https://docs.google.com/document/d/" + doc.documentId + "/edit";
            var linkDiv = document.getElementById("linkDiv");
            linkDiv.innerHTML = link;
            linkDiv.href = link;

            console.log(store.songsToGenerate);
            var requests = [];
            for (const song of store.songsToGenerate) {
              console.log(song);
              var name = song.song_info.name;
              var composer = song.song_info.composer;
              var capo = song.song_info.capo;
              var content = song.song_info.content;
              console.log(
                "Adding " + name + " by " + composer + " with capo " + capo
              );

              var songRequests = [];

              // Adding the name of the songs
              songRequests.unshift(
                {
                  insertText: {
                    location: {
                      index: 1
                    },
                    text: name + "\n"
                  }
                },
                {
                  updateParagraphStyle: {
                    paragraphStyle: {
                      namedStyleType: "TITLE",
                      alignment: "CENTER"
                    },
                    range: {
                      startIndex: 1,
                      endIndex: 2
                    },
                    fields: "*"
                  }
                }
              );

              // Adding the composer
              songRequests.unshift(
                {
                  insertText: {
                    location: {
                      index: 1
                    },
                    text: composer + "\n"
                  }
                },
                {
                  updateParagraphStyle: {
                    paragraphStyle: {
                      namedStyleType: "SUBTITLE",
                      alignment: "CENTER"
                    },
                    range: {
                      startIndex: 1,
                      endIndex: 2
                    },
                    fields: "*"
                  }
                }
              );

              // Adding the capo information
              if (capo || capo != 0) {
                songRequests.unshift(
                  {
                    insertText: {
                      location: {
                        index: 1
                      },
                      text: "Capo: " + capo + "\n"
                    }
                  },
                  {
                    updateParagraphStyle: {
                      paragraphStyle: {
                        namedStyleType: "HEADING_1",
                        alignment: "END"
                      },
                      range: {
                        startIndex: 1,
                        endIndex: 2
                      },
                      fields: "*"
                    }
                  }
                );
              }

              var contentRequests = [
                {
                  insertText: {
                    location: {
                      index: 1
                    },
                    text: content + "\n"
                  }
                },
                {
                  updateParagraphStyle: {
                    paragraphStyle: {
                      namedStyleType: "NORMAL_TEXT"
                    },
                    range: {
                      startIndex: 1,
                      endIndex: content.length
                    },
                    fields: "*"
                  }
                }
              ];

              // var contentLines = content.split("\r\n");
              // var counter = 1;

              const chords = [
                "C",
                "C7",
                "Cm",
                "Cmaj7",
                "Cdim",
                "Cdim7",
                "Csus2",
                "Csus4",
                "C7sus4",
                "Calt",
                "C+",
                "C6",
                "C69",
                "C7",
                "C7b5",
                "C+7",
                "C9",
                "C9b5",
                "C+9",
                "C7b9",
                "C7#9",
                "C11",
                "C9#11",
                "C13",
                "Cmaj7",
                "Cmaj7b5",
                "Cmaj7#5",
                "Cmaj9",
                "Cmaj11",
                "Cmaj13",
                "Cm6",
                "Cm7",
                "Cm7b5",
                "Cm9",
                "Cm69",
                "Cm11",
                "Cmmaj7",
                "Cmmaj7b5",
                "Cmmaj9",
                "Cmmaj11",
                "Cadd9",
                "Cmadd9",
                "C#",
                "C#7",
                "C#m",
                "C#maj7",
                "C#dim",
                "C#dim7",
                "C#sus2",
                "C#sus4",
                "C#7sus4",
                "C#alt",
                "C#+",
                "C#6",
                "C#69",
                "C#7",
                "C#7b5",
                "C#+7",
                "C#9",
                "C#9b5",
                "C#+9",
                "C#7b9",
                "C#7#9",
                "C#11",
                "C#9#11",
                "C#13",
                "C#maj7",
                "C#maj7b5",
                "C#maj7#5",
                "C#maj9",
                "C#maj11",
                "C#maj13",
                "C#m6",
                "C#m7",
                "C#m7b5",
                "C#m9",
                "C#m69",
                "C#m11",
                "C#mmaj7",
                "C#mmaj7b5",
                "C#mmaj9",
                "C#mmaj11",
                "C#add9",
                "C#madd9",
                "D",
                "D7",
                "Dm",
                "Dmaj7",
                "Ddim",
                "Ddim7",
                "Dsus2",
                "Dsus4",
                "D7sus4",
                "Dalt",
                "D+",
                "D6",
                "D69",
                "D7",
                "D7b5",
                "D+7",
                "D9",
                "D9b5",
                "D+9",
                "D7b9",
                "D7#9",
                "D11",
                "D9#11",
                "D13",
                "Dmaj7",
                "Dmaj7b5",
                "Dmaj7#5",
                "Dmaj9",
                "Dmaj11",
                "Dmaj13",
                "Dm6",
                "Dm7",
                "Dm7b5",
                "Dm9",
                "Dm69",
                "Dm11",
                "Dmmaj7",
                "Dmmaj7b5",
                "Dmmaj9",
                "Dmmaj11",
                "Dadd9",
                "Dmadd9",
                "D#",
                "D#7",
                "D#m",
                "D#maj7",
                "D#dim",
                "D#dim7",
                "D#sus2",
                "D#sus4",
                "D#7sus4",
                "D#alt",
                "D#+",
                "D#6",
                "D#69",
                "D#7",
                "D#7b5",
                "D#+7",
                "D#9",
                "D#9b5",
                "D#+9",
                "D#7b9",
                "D#7#9",
                "D#11",
                "D#9#11",
                "D#13",
                "D#maj7",
                "D#maj7b5",
                "D#maj7#5",
                "D#maj9",
                "D#maj11",
                "D#maj13",
                "D#m6",
                "D#m7",
                "D#m7b5",
                "D#m9",
                "D#m69",
                "D#m11",
                "D#mmaj7",
                "D#mmaj7b5",
                "D#mmaj9",
                "D#mmaj11",
                "D#add9",
                "D#madd9",
                "E",
                "E7",
                "Em",
                "Emaj7",
                "Edim",
                "Edim7",
                "Esus2",
                "Esus4",
                "E7sus4",
                "Ealt",
                "E+",
                "E6",
                "E69",
                "E7",
                "E7b5",
                "E+7",
                "E9",
                "E9b5",
                "E+9",
                "E7b9",
                "E7#9",
                "E11",
                "E9#11",
                "E13",
                "Emaj7",
                "Emaj7b5",
                "Emaj7#5",
                "Emaj9",
                "Emaj11",
                "Emaj13",
                "Em6",
                "Em7",
                "Em7b5",
                "Em9",
                "Em69",
                "Em11",
                "Emmaj7",
                "Emmaj7b5",
                "Emmaj9",
                "Emmaj11",
                "Eadd9",
                "Emadd9",
                "E#",
                "E#7",
                "E#m",
                "E#maj7",
                "E#dim",
                "E#dim7",
                "E#sus2",
                "E#sus4",
                "E#7sus4",
                "E#alt",
                "E#+",
                "E#6",
                "E#69",
                "E#7",
                "E#7b5",
                "E#+7",
                "E#9",
                "E#9b5",
                "E#+9",
                "E#7b9",
                "E#7#9",
                "E#11",
                "E#9#11",
                "E#13",
                "E#maj7",
                "E#maj7b5",
                "E#maj7#5",
                "E#maj9",
                "E#maj11",
                "E#maj13",
                "E#m6",
                "E#m7",
                "E#m7b5",
                "E#m9",
                "E#m69",
                "E#m11",
                "E#mmaj7",
                "E#mmaj7b5",
                "E#mmaj9",
                "E#mmaj11",
                "E#add9",
                "E#madd9",
                "F",
                "F7",
                "Fm",
                "Fmaj7",
                "Fdim",
                "Fdim7",
                "Fsus2",
                "Fsus4",
                "F7sus4",
                "Falt",
                "F+",
                "F6",
                "F69",
                "F7",
                "F7b5",
                "F+7",
                "F9",
                "F9b5",
                "F+9",
                "F7b9",
                "F7#9",
                "F11",
                "F9#11",
                "F13",
                "Fmaj7",
                "Fmaj7b5",
                "Fmaj7#5",
                "Fmaj9",
                "Fmaj11",
                "Fmaj13",
                "Fm6",
                "Fm7",
                "Fm7b5",
                "Fm9",
                "Fm69",
                "Fm11",
                "Fmmaj7",
                "Fmmaj7b5",
                "Fmmaj9",
                "Fmmaj11",
                "Fadd9",
                "Fmadd9",
                "F#",
                "F#7",
                "F#m",
                "F#maj7",
                "F#dim",
                "F#dim7",
                "F#sus2",
                "F#sus4",
                "F#7sus4",
                "F#alt",
                "F#+",
                "F#6",
                "F#69",
                "F#7",
                "F#7b5",
                "F#+7",
                "F#9",
                "F#9b5",
                "F#+9",
                "F#7b9",
                "F#7#9",
                "F#11",
                "F#9#11",
                "F#13",
                "F#maj7",
                "F#maj7b5",
                "F#maj7#5",
                "F#maj9",
                "F#maj11",
                "F#maj13",
                "F#m6",
                "F#m7",
                "F#m7b5",
                "F#m9",
                "F#m69",
                "F#m11",
                "F#mmaj7",
                "F#mmaj7b5",
                "F#mmaj9",
                "F#mmaj11",
                "F#add9",
                "F#madd9",
                "G",
                "G7",
                "Gm",
                "Gmaj7",
                "Gdim",
                "Gdim7",
                "Gsus2",
                "Gsus4",
                "G7sus4",
                "Galt",
                "G+",
                "G6",
                "G69",
                "G7",
                "G7b5",
                "G+7",
                "G9",
                "G9b5",
                "G+9",
                "G7b9",
                "G7#9",
                "G11",
                "G9#11",
                "G13",
                "Gmaj7",
                "Gmaj7b5",
                "Gmaj7#5",
                "Gmaj9",
                "Gmaj11",
                "Gmaj13",
                "Gm6",
                "Gm7",
                "Gm7b5",
                "Gm9",
                "Gm69",
                "Gm11",
                "Gmmaj7",
                "Gmmaj7b5",
                "Gmmaj9",
                "Gmmaj11",
                "Gadd9",
                "Gmadd9",
                "G#",
                "G#7",
                "G#m",
                "G#maj7",
                "G#dim",
                "G#dim7",
                "G#sus2",
                "G#sus4",
                "G#7sus4",
                "G#alt",
                "G#+",
                "G#6",
                "G#69",
                "G#7",
                "G#7b5",
                "G#+7",
                "G#9",
                "G#9b5",
                "G#+9",
                "G#7b9",
                "G#7#9",
                "G#11",
                "G#9#11",
                "G#13",
                "G#maj7",
                "G#maj7b5",
                "G#maj7#5",
                "G#maj9",
                "G#maj11",
                "G#maj13",
                "G#m6",
                "G#m7",
                "G#m7b5",
                "G#m9",
                "G#m69",
                "G#m11",
                "G#mmaj7",
                "G#mmaj7b5",
                "G#mmaj9",
                "G#mmaj11",
                "G#add9",
                "G#madd9",
                "A",
                "A7",
                "Am",
                "Amaj7",
                "Adim",
                "Adim7",
                "Asus2",
                "Asus4",
                "A7sus4",
                "Aalt",
                "A+",
                "A6",
                "A69",
                "A7",
                "A7b5",
                "A+7",
                "A9",
                "A9b5",
                "A+9",
                "A7b9",
                "A7#9",
                "A11",
                "A9#11",
                "A13",
                "Amaj7",
                "Amaj7b5",
                "Amaj7#5",
                "Amaj9",
                "Amaj11",
                "Amaj13",
                "Am6",
                "Am7",
                "Am7b5",
                "Am9",
                "Am69",
                "Am11",
                "Ammaj7",
                "Ammaj7b5",
                "Ammaj9",
                "Ammaj11",
                "Aadd9",
                "Amadd9",
                "A#",
                "A#7",
                "A#m",
                "A#maj7",
                "A#dim",
                "A#dim7",
                "A#sus2",
                "A#sus4",
                "A#7sus4",
                "A#alt",
                "A#+",
                "A#6",
                "A#69",
                "A#7",
                "A#7b5",
                "A#+7",
                "A#9",
                "A#9b5",
                "A#+9",
                "A#7b9",
                "A#7#9",
                "A#11",
                "A#9#11",
                "A#13",
                "A#maj7",
                "A#maj7b5",
                "A#maj7#5",
                "A#maj9",
                "A#maj11",
                "A#maj13",
                "A#m6",
                "A#m7",
                "A#m7b5",
                "A#m9",
                "A#m69",
                "A#m11",
                "A#mmaj7",
                "A#mmaj7b5",
                "A#mmaj9",
                "A#mmaj11",
                "A#add9",
                "A#madd9",
                "B",
                "B7",
                "Bm",
                "Bmaj7",
                "Bdim",
                "Bdim7",
                "Bsus2",
                "Bsus4",
                "B7sus4",
                "Balt",
                "B+",
                "B6",
                "B69",
                "B7",
                "B7b5",
                "B+7",
                "B9",
                "B9b5",
                "B+9",
                "B7b9",
                "B7#9",
                "B11",
                "B9#11",
                "B13",
                "Bmaj7",
                "Bmaj7b5",
                "Bmaj7#5",
                "Bmaj9",
                "Bmaj11",
                "Bmaj13",
                "Bm6",
                "Bm7",
                "Bm7b5",
                "Bm9",
                "Bm69",
                "Bm11",
                "Bmmaj7",
                "Bmmaj7b5",
                "Bmmaj9",
                "Bmmaj11",
                "Badd9",
                "Bmadd9",
                "B#",
                "B#7",
                "B#m",
                "B#maj7",
                "B#dim",
                "B#dim7",
                "B#sus2",
                "B#sus4",
                "B#7sus4",
                "B#alt",
                "B#+",
                "B#6",
                "B#69",
                "B#7",
                "B#7b5",
                "B#+7",
                "B#9",
                "B#9b5",
                "B#+9",
                "B#7b9",
                "B#7#9",
                "B#11",
                "B#9#11",
                "B#13",
                "B#maj7",
                "B#maj7b5",
                "B#maj7#5",
                "B#maj9",
                "B#maj11",
                "B#maj13",
                "B#m6",
                "B#m7",
                "B#m7b5",
                "B#m9",
                "B#m69",
                "B#m11",
                "B#mmaj7",
                "B#mmaj7b5",
                "B#mmaj9",
                "B#mmaj11",
                "B#add9",
                "B#madd9",
                "H",
                "H7",
                "Hm",
                "Hmaj7",
                "Hdim",
                "Hdim7",
                "Hsus2",
                "Hsus4",
                "H7sus4",
                "Halt",
                "H+",
                "H6",
                "H69",
                "H7",
                "H7b5",
                "H+7",
                "H9",
                "H9b5",
                "H+9",
                "H7b9",
                "H7#9",
                "H11",
                "H9#11",
                "H13",
                "Hmaj7",
                "Hmaj7b5",
                "Hmaj7#5",
                "Hmaj9",
                "Hmaj11",
                "Hmaj13",
                "Hm6",
                "Hm7",
                "Hm7b5",
                "Hm9",
                "Hm69",
                "Hm11",
                "Hmmaj7",
                "Hmmaj7b5",
                "Hmmaj9",
                "Hmmaj11",
                "Hadd9",
                "Hmadd9",
                "H#",
                "H#7",
                "H#m",
                "H#maj7",
                "H#dim",
                "H#dim7",
                "H#sus2",
                "H#sus4",
                "H#7sus4",
                "H#alt",
                "H#+",
                "H#6",
                "H#69",
                "H#7",
                "H#7b5",
                "H#+7",
                "H#9",
                "H#9b5",
                "H#+9",
                "H#7b9",
                "H#7#9",
                "H#11",
                "H#9#11",
                "H#13",
                "H#maj7",
                "H#maj7b5",
                "H#maj7#5",
                "H#maj9",
                "H#maj11",
                "H#maj13",
                "H#m6",
                "H#m7",
                "H#m7b5",
                "H#m9",
                "H#m69",
                "H#m11",
                "H#mmaj7",
                "H#mmaj7b5",
                "H#mmaj9",
                "H#mmaj11",
                "H#add9",
                "H#madd9"
              ];

              const regexp = RegExp("\\s(" + chords.join("|") + ")\\s", "g");
              const matches = content.matchAll(regexp);

              for (const match of matches) {
                contentRequests.push({
                  updateParagraphStyle: {
                    paragraphStyle: {
                      namedStyleType: "HEADING_2"
                    },
                    range: {
                      startIndex: match.index + 2,
                      endIndex: match.index + match[0].length - 1
                    },
                    fields: "*"
                  }
                });
              }

              songRequests = contentRequests.concat(songRequests);

              songRequests.unshift({
                insertPageBreak: {
                  location: {
                    index: 1
                  }
                }
              });

              requests = songRequests.concat(requests);
            }

            var exampleStylesRequests = [];
            var example =
              "Název – Název\nPodnadpis – Jméno autora\nNadpis 1 – Capo\nNormální text – Normální text\n Nadpis 2 – Akordy";
            var exampleStyles = [
              {
                bold: true,
                smallCaps: true,
                fontSize: {
                  magnitude: 40,
                  unit: "PT"
                },
                weightedFontFamily: {
                  fontFamily: "PT Sans",
                  weight: 400
                }
              },
              {
                fontSize: {
                  magnitude: 22,
                  unit: "PT"
                },
                weightedFontFamily: {
                  fontFamily: "PT Sans",
                  weight: 400
                }
              },
              {
                fontSize: {
                  magnitude: 15,
                  unit: "PT"
                },
                weightedFontFamily: {
                  fontFamily: "PT Sans",
                  weight: 400
                }
              },
              {
                fontSize: {
                  magnitude: 15,
                  unit: "PT"
                },
                weightedFontFamily: {
                  fontFamily: "PT Mono",
                  weight: 400
                }
              },
              {
                bold: true,
                fontSize: {
                  magnitude: 15,
                  unit: "PT"
                },
                weightedFontFamily: {
                  fontFamily: "PT Mono",
                  weight: 400
                }
              }
            ];

            exampleStylesRequests.push({
              insertPageBreak: {
                location: {
                  index: 1
                }
              }
            });

            exampleStylesRequests.push({
              insertText: {
                location: {
                  index: 1
                },
                text: example
              }
            });

            exampleStylesRequests.push({
              updateParagraphStyle: {
                paragraphStyle: {
                  namedStyleType: "NORMAL_TEXT"
                },
                fields: "*",
                range: {
                  startIndex: 1,
                  endIndex: example.length
                }
              }
            });

            var lineIndex = 1;
            for (let i = 0; i < example.split("\n").length; i++) {
              var line = example.split("\n")[i];
              console.log(
                "editing " +
                  line +
                  " at " +
                  lineIndex +
                  " - " +
                  (lineIndex + line.length)
              );
              exampleStylesRequests.push({
                updateTextStyle: {
                  textStyle: exampleStyles[i],
                  range: {
                    startIndex: lineIndex,
                    endIndex: lineIndex + line.length + 1
                  },
                  fields: "*"
                }
              });
              lineIndex += line.length + 1;
            }

            requests = requests.concat(exampleStylesRequests);

            console.log(requests);

            gapi.client.docs.documents
              .batchUpdate({
                documentId: doc.documentId,
                requests: requests
              })
              .then(function(response) {
                console.log(response);
              });
          });
      });
    }
  }
};
</script>

<style>
</style>
