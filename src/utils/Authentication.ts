import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import api from "src/api";
import { store } from "src/App";
import {
    failure,
    FailureOrSuccess,
    success,
} from "src/core/logic/FailureOrSuccess";
import { setUser, setUserLoggedIn } from "src/redux/reducers/user";

import Firebase, { firebase } from "./Firebase";

const _onError = async (error) => {
    console.error(error);
    let errorMessage = error.message;

    if (error.code === "auth/account-exists-with-different-credential") {
        const methods = await firebase
            .auth()
            .fetchSignInMethodsForEmail(error.email);
        errorMessage = "This user already has an account. ";
        if (
            methods.indexOf(
                firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
            ) !== -1
        ) {
            errorMessage +=
                "Please login with the email and password associated with this account. ";
        }
        if (
            methods.indexOf(
                firebase.auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD
            ) !== -1
        ) {
            errorMessage +=
                "Please login with the Facebook account associated with this account. ";
        }
        if (
            methods.indexOf(
                firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD
            ) !== -1
        ) {
            errorMessage +=
                "Please login with the Google account associated with this account. ";
        }
    }

    return errorMessage;
};

export const onAuthSuccess = async (
    result: firebase.auth.UserCredential,
    params?: any
) => {
    // The signed-in user info.
    const firebaseUser: firebase.User | null = result.user;

    if (!firebaseUser) {
        return null;
    }

    let firstName = "";
    let lastName = "";
    if (firebaseUser.displayName) {
        const name = firebaseUser.displayName.split(" ");
        if (name.length >= 1) {
            firstName = name[0];
        }
        if (name.length === 2) {
            lastName = name[1];
        }
    }

    const { exists } = await api.users.exists(firebaseUser.uid);

    // Create user if doesn't exist
    if (!exists) {
        const { user } = await api.users.create({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            firstName: firstName,
            lastName: lastName,
            profileUrl: firebaseUser.photoURL,
            phoneNumber: firebaseUser.phoneNumber,
            ...params,
        });

        window.analytics.alias(user.uid);
        store.dispatch(setUserLoggedIn(true));
        store.dispatch(setUser(user));
    } else {
        const { user } = await api.users.me();
        store.dispatch(setUserLoggedIn(true));
        store.dispatch(setUser(user));
    }
};

const listenForFirebaseRedirect = () => {
    firebase.auth().getRedirectResult().then(onAuthSuccess).catch(_onError);
};

const useFirebaseRedirectListener = () => {
    useEffect(() => {
        listenForFirebaseRedirect();
    }, []);
};

const thirdPartyAuth =
    (provider: firebase.auth.AuthProvider) =>
    async (): Promise<FailureOrSuccess<Error, null>> => {
        try {
            // Need to use with redirect for mobile else it doesn't work
            // in safari
            const thirdPartyAuthFxn = isMobile
                ? () => Firebase.auth().signInWithRedirect(provider)
                : () => Firebase.auth().signInWithPopup(provider);

            console.log(thirdPartyAuthFxn);

            const result = await thirdPartyAuthFxn();

            console.log(result);

            if (result) {
                await onAuthSuccess(result);
            }

            return success(null);
        } catch (err) {
            const errorMessage = await _onError(err);

            return failure(new Error(errorMessage));
        }
    };

export const getLoginErrorMessage = (methods: string[]) => {
    if (!methods.length) {
        return "You do not have an account. Please sign up.";
    }

    if (methods.includes("google.com")) {
        return "Looks like you already signed up with Google. Please sign in with Google.";
    }

    if (methods.includes("facebook.com")) {
        return "Looks like you already signed up with a Facebook account. Please sign in with Facebook.";
    }

    if (methods.includes("apple.com")) {
        return "Looks like you already signed up with an Apple account. Please sign in with Apple.";
    }

    return "Failed to login.";
};

async function loginWithEmail(
    email: string,
    password: string
): Promise<FailureOrSuccess<Error, firebase.auth.UserCredential>> {
    const methods = await Firebase.auth().fetchSignInMethodsForEmail(email);
    const canLoginWithEmail = methods.includes("password");

    if (!canLoginWithEmail) {
        return failure(new Error(getLoginErrorMessage(methods)));
    }

    try {
        const result = await Firebase.auth().signInWithEmailAndPassword(
            email.trim(),
            password
        );
        await onAuthSuccess(result);

        return success(result);
    } catch (error) {
        const errorMessage = await _onError(error);
        return failure(new Error(errorMessage));
    }
}

async function sendForgotPassword(
    email: string
): Promise<FailureOrSuccess<Error, null>> {
    try {
        await Firebase.auth().sendPasswordResetEmail(email);

        return success(null);
    } catch (error) {
        return failure(error);
    }
}

const Authentication = {
    loginWithEmail,
    sendForgotPassword,
    onAuthSuccess,
    facebook: thirdPartyAuth(new firebase.auth.FacebookAuthProvider()),
    google: thirdPartyAuth(new firebase.auth.GoogleAuthProvider()),
    apple: thirdPartyAuth(new firebase.auth.OAuthProvider("apple.com")),
    listenForFirebaseRedirect,
    useFirebaseRedirectListener,
};

export default Authentication;
