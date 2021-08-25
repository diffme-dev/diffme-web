import firebase from "firebase";

require("firebase/firestore");

const authDomain = "auth.diffme.dev"; // "payup-rent-7f1a0.firebaseapp.com"; //

const firebaseConfig: any = {
    // TODO: fix this...
    apiKey: "AIzaSyCjBKuDBEONq6YQVVxuYVyZBjosb1FKxrE",
    authDomain: "diffme-prod.firebaseapp.com",
    projectId: "diffme-prod",
    storageBucket: "diffme-prod.appspot.com",
    messagingSenderId: "351582553473",
    appId: "1:351582553473:web:829a007ee6001d0ad31480",
    measurementId: "G-TKJKWMTMMC",
};

const Firebase = firebase.initializeApp(firebaseConfig);

const Firestore = Firebase.firestore();

export { firebase, Firestore };

export async function getAuthToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const currentUser = Firebase.auth().currentUser;

        if (currentUser) {
            currentUser
                .getIdToken(/* forceRefresh */ true)
                .then(resolve)
                .catch(reject);
        } else {
            return resolve(null);
        }
    });
}

export default Firebase;
