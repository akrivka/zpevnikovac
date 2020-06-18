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
const publicSongsCollection = firebase.firestore()
    .collection('songs');

function getCollection(type) {
    if (type === 'PUBLIC') {
        return publicSongsCollection;
    } else {
        return store.userSongsCollection;
    }
}

// the shared state object that any vue component
// can get access to
export const store = {
    userSongsCollection: firebase.firestore().collection('users/default/songs'),
    publicSongs: null,
    userSongs: null,
    currentUser: null,
    writeSong: async (type, songInfo) => {
        var collection = getCollection(type);

        const dt = {
            createdOn: new Date(),
            author: store.currentUser.uid,
            author_name: store.currentUser.displayName,
            author_image: store.currentUser.photoURL,
            songInfo
        };
        try {
            return collection.add(dt);
        }
        catch (e) {
            return console.error('error', dt, e);
        }
    },
    removeSong: async (type, songId) => {
        var collection = getCollection(type);
        return collection.doc(songId).delete();
    },
    editSong: async (type, songId, songInfo) => {
        var collection = getCollection(type);

        try {
            return collection.doc(songId).update({
                songInfo: songInfo
            })
        }
        catch (e) {
            return console.error('error', e);
        }
    }
};

// onSnapshot is executed every time the data
// in the underlying firestore collection changes
// It will get passed an array of references to 
// the documents that match your query
publicSongsCollection
    .orderBy('songInfo.name', 'asc')
    .onSnapshot((songsRef) => {
        const songs = [];
        songsRef.forEach((doc) => {
            const song = doc.data();
            song.id = doc.id;
            songs.push(song);
        });
        console.log('Received songs feed:', songs);
        store.publicSongs = songs;
    });

// When a user logs in or out, save that in the store
firebase.auth().onAuthStateChanged((user) => {
    console.log('Logged in as:', user);
    store.currentUser = user;
    store.userSongsCollection = firebase.firestore()
        .collection(`/users/${user.uid}/songs`);

    store.userSongsCollection
        .orderBy('songInfo.name', 'asc')
        .onSnapshot((songsRef) => {
            console.log(songsRef);
            const songs = [];
            songsRef.forEach((doc) => {
                const song = doc.data();
                song.id = doc.id;
                songs.push(song);
            });
            console.log('Received songs feed:', songs);
            store.userSongs = songs;
        });

});