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

// the shared state object that any vue component
// can get access to
export const store = {
    currentUser: null,
    publicSongsCollection: firebase.firestore().collection('songs'),
    userSongsCollection: firebase.firestore().collection('users/default/songs'),
    publicSongs: null,
    userSongs: null,
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
    getSongInfoBySlug: async (type, song_slug) => {
        var collection;
        if (type === "PUBLIC") {
            collection = store.publicSongsCollection;
        } else collection = store.userSongsCollection;

        var song_info = collection
            .where("slug", "==", song_slug)
            .get()
            .then(function (results) {
                if (results.size == 1) {
                    return collection
                        .doc(results.docs[0].id)
                        .collection("history")
                        .limit(1)
                        .get()
                        .then(function (latest_history) {
                            var doc = latest_history.docs[0];
                            song_info = doc.data().song_info
                            song_info.id = doc.id;
                            console.log(song_info);
                            return song_info;
                        });
                } else {
                    console.log("duplicate song slugs");
                }
            });
        console.log(song_info);
        return song_info;
    }
};

store.publicSongsCollection
    .orderBy('name', 'asc')
    .onSnapshot((songsRef) => {
        const songs = [];
        console.log(songsRef);
        songsRef.forEach((doc) => {
            const song = doc.data();
            song.id = doc.id;
            songs.push(song);
        });
        console.log('Received public songs feed:', songs);
        store.publicSongs = songs;
    });

firebase.auth().onAuthStateChanged((user) => {
    console.log('Logged in as:', user);
    store.currentUser = user;
    store.userSongsCollection = firebase.firestore()
        .collection(`/users/${user.uid}/songs`);

    store.userSongsCollection
        .orderBy('name', 'asc')
        .onSnapshot((songsRef) => {
            const songs = [];
            songsRef.forEach((doc) => {
                const song = doc.data();
                song.id = doc.id;
                songs.push(song);
            });
            console.log('Received user songs feed:', songs);
            store.userSongs = songs;
        });
});