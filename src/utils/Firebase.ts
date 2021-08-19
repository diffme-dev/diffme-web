import firebase from "firebase";

require("firebase/firestore");

const authDomain = "auth.payup.rent"; // "payup-rent-7f1a0.firebaseapp.com"; //

const firebaseConfig: any = {
    apiKey: "AIzaSyCUBfb8F4K4K_T34cMHhk_Lvai7_aigSRI",
    authDomain,
    projectId: "payup-rent-7f1a0",
    storageBucket: "payup-rent-7f1a0.appspot.com",
    messagingSenderId: "938567166674",
    appId: "1:938567166674:web:93e2856905ec9edc479b0b",
    measurementId: "G-8CSEV7ZEEY",
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
