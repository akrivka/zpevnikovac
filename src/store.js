// import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAuL00hSASZLYySrOK_kVSK0bm49CE9sls",
    authDomain: "zpevnikovac.firebaseapp.com",
    databaseURL: "https://zpevnikovac.firebaseio.com",
    projectId: "zpevnikovac",
    storageBucket: "zpevnikovac.appspot.com",
    messagingSenderId: "273021499722",
    appId: "1:273021499722:web:fcef6f60c7bb25a8ca69b3",
    measurementId: "G-PKEH188111"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// a reference to the songs collection

function getCollection(type) {
    if (type === 'PUBLIC') {
        return store.publicSongsCollection;
    } else {
        return store.userSongsCollection;
    }
}
function getSongSnapshotBySlug(collection, slug) {
    collection
        .where("slug", "==", slug)
        .get()
        .then(function (results) {
            if (results.size == 0) {
                console.log("Song not found");
            }
            else if (results.size == 1) {
                var id = results.docs[0].id;
                collection
                    .doc(id)
                    .collection("history").orderBy("time", 'desc')
                    .limit(1)
                    .get()
                    .then(function (history) {
                        var song = history.docs[0].data();
                        song.id = id;
                        store.currentSong = song;
                    });
            } else {
                console.log("Duplicate song slugs");
            }
        });
}

// the shared state object that any vue component
// can get access to
export const store = {
    currentUser: null,
    publicSongsCollection: firebase.firestore().collection('songs'),
    userSongsCollection: firebase.firestore().collection('users/default/songs'),
    publicSongs: null,
    userSongs: null,
    currentSong: null,
    listener: null,
    songbooks: null,
    songbookSongs: null,
    songsToGenerate: null,
    listenToSongs: async (type) => {
        // console.log("Listening to " + type + " songs");
        if (type == "PUBLIC" || type == "songbook") {
            store.listener = getCollection(type)
                .orderBy('name', 'asc')
                .onSnapshot((results) => {
                    console.log("Received " + results.size + " " + type + " songs.");
                    const songs = [];
                    results.forEach((doc) => {
                        const song = doc.data();
                        song.id = doc.id;
                        song.path = "/songs/" + doc.id;
                        songs.push(song);
                    });
                    store.publicSongs = songs;
                });
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                store.userSongsCollection = firebase.firestore()
                    .collection(`/users/${user.uid}/songs`);

                store.listener = getCollection(type)
                    .orderBy('name', 'asc')
                    .onSnapshot((results) => {
                        console.log("Received " + results.size + " " + type + " songs.");
                        const songs = [];
                        results.forEach((doc) => {
                            const song = doc.data();
                            song.id = doc.id;
                            song.path = "/users/" + store.currentUser.uid + "/songs/" + doc.id;
                            songs.push(song);
                        });
                        store.userSongs = songs;
                    });
            });

        }
    },
    stopListeningToSongs: async (type) => {
        // console.log("Stopping to listen to " + type + " songs.");
        store.listener(type);
    },
    listenToSongbookSongs: async (songbook_slug) => {
        firebase.auth().onAuthStateChanged(() => {
            store.listener = firebase.firestore().collection("songbooks").where("slug", "==", songbook_slug).where("owner", "==", store.currentUser.uid)
                .get()
                .then(function (results) {
                    if (results.size == 0) {
                        console.log("Songbook not found");
                    }
                    else if (results.size == 1) {
                        results.docs[0].ref.collection("songbook-songs").onSnapshot((songsRef) => {
                            console.log(songsRef);
                            console.log("Received " + songsRef.size + " songs.");
                            const songs = [];
                            songsRef.forEach((doc) => {
                                const song = doc.data();
                                song.id = doc.id;
                                song.path = "/songbooks/" + songbook_slug + "/" + doc.id
                                songs.push(song);
                            });
                            store.songbookSongs = songs;
                        });
                    } else
                        console.log("Duplicate songbooks found");
                });
        });

    },
    writeSong: async (type, song_id, song_info) => {
        var doc = null;
        if (song_id)
            doc = getCollection(type).doc(song_id);
        else
            doc = getCollection(type).doc();

        var batch_write = firebase.firestore().batch();
        batch_write.set(doc, {
            name: song_info.name,
            slug: song_info.slug,
            composer: song_info.composer
        });
        batch_write.set(doc.collection("history").doc(new Date().valueOf().toString()), {
            time: new Date(),
            user_id: store.currentUser.uid,
            user_name: store.currentUser.displayName,
            song_info: {
                name: song_info.name,
                slug: song_info.slug,
                composer: song_info.composer,
                capo: song_info.capo,
                content: song_info.content
            }
        });
        try {
            return batch_write.commit();
        }
        catch (e) {
            return console.error('error', e);
        }
    },
    removeSong: async (type, song_id) => {
        var collection = getCollection(type);
        return collection.doc(song_id).delete();
    },
    listenToSongSnapshotBySlug: async (type, slug) => {
        var collection = getCollection(type);
        if (type == "PUBLIC") {
            getSongSnapshotBySlug(collection, slug);
        } else {
            firebase.auth().onAuthStateChanged(() => {
                getSongSnapshotBySlug(collection, slug);
            });
        }
    },
    listenToSongbooks: async () => {
        firebase.auth().onAuthStateChanged(() => {
            firebase.firestore().collection("songbooks").where("owner", "==", store.currentUser.uid).get().then(function (songbookRefs) {
                var songbooks = [];
                songbookRefs.forEach((doc) => {
                    songbooks.push(doc.data());
                });
                console.log(songbooks);
                store.songbooks = songbooks;
            });
        });
    },
    createSongbook: async (name, slug) => {
        firebase.firestore().collection("songbooks").add({
            owner: store.currentUser.uid,
            name: name,
            slug: slug
        });
    },
    writeToSongbook: async (songbook_slug, song) => {
        firebase.firestore().collection("songbooks").where("slug", "==", songbook_slug).where("owner", "==", store.currentUser.uid)
            .get()
            .then(function (results) {
                if (results.size == 0) {
                    console.log("Songbook not found");
                }
                else if (results.size == 1) {
                    results.docs[0].ref.collection("songbook-songs").add({
                        path: song.path,
                        name: song.name,
                        slug: song.slug,
                        composer: song.composer,
                    });
                } else
                    console.log("Duplicate songbooks found");
            });
    },
    removeFromSongbook: async (songbook_slug, song) => {
        store.listener = firebase.firestore().collection("songbooks").where("slug", "==", songbook_slug).where("owner", "==", store.currentUser.uid)
            .get()
            .then(function (results) {
                if (results.size == 0) {
                    console.log("Songbook not found");
                }
                else if (results.size == 1) {
                    results.docs[0].ref.collection("songbook-songs").doc(song.id).delete()
                } else
                    console.log("Duplicate songbooks found");
            });
    },
    getSongsToGenerate: (songbook_slug) => {
        store.listener = firebase.firestore().collection("songbooks").where("slug", "==", songbook_slug).where("owner", "==", store.currentUser.uid)
            .get()
            .then(function (results) {
                if (results.size == 0) {
                    console.log("Songbook not found");
                }
                else if (results.size == 1) {
                    var doc = results.docs[0].ref;
                    doc.collection("songbook-songs").get().then(function (songRefs) {
                        var songs = [];
                        songRefs.forEach((doc) => {
                            console.log(doc.data().path + "/history/");
                            firebase.firestore().doc(doc.data().path).collection("history").orderBy("time", 'desc').limit(1).get().then(function (history) {
                                history.docs[0].ref.get().then( function (song){
                                    console.log(song);
                                    songs.push(song.data());
                                });
                            });
                        });
                        store.songsToGenerate = songs;
                    });
                } else
                    console.log("Duplicate songbooks found");
            });
    }
};


firebase.auth().onAuthStateChanged((user) => {
    console.log('Logged in as:', user);
    store.currentUser = user;
    store.userSongsCollection = firebase.firestore()
        .collection(`/users/${user.uid}/songs`);
});