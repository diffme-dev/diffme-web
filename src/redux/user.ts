import _ from "lodash";
import fp from "lodash/fp";
import { createSelector } from "reselect";
import api from "src/api";

// Constants
const SET_USER = "SET_USER";
const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";
const SET_USER_AUTH_STATE_CHANGED = "SET_USER_AUTH_STATE_CHANGED";
const REMOVE_USER = "REMOVE_USER";
const SET_USER_AUTH_STATUS = "SET_USER_AUTH_STATUS";
const SET_ACTIVE_PAYMENT_METHOD = "SET_ACTIVE_PAYMENT_METHOD";

type AuthStatus = "NOT_LOADED" | "LOGGED_IN" | "NOT_LOGGED_IN";

// Initial state
const initialState = {
    loggedIn: false,
    authStateChanged: false,
    user: null,
    activePaymentMethod: null,
    authStatus: "NOT_LOADED",
};

// Actions
export function setUser(user: any) {
    return { type: SET_USER, payload: { user } };
}

export function setUserLoggedIn(loggedIn: boolean) {
    return { type: SET_USER_LOGGED_IN, payload: { loggedIn } };
}

export function setUserAuthStateChanged(authStateChanged: boolean) {
    return { type: SET_USER_AUTH_STATE_CHANGED, payload: { authStateChanged } };
}

export function setUserAuthState(authStatus: AuthStatus) {
    return { type: SET_USER_AUTH_STATUS, payload: { authStatus } };
}

export function setActivePaymentMethod(paymentMethod: any) {
    return { type: SET_ACTIVE_PAYMENT_METHOD, payload: { paymentMethod } };
}

export function logoutUser() {
    return { type: REMOVE_USER };
}

// Reducer
export default function reducer(state = initialState, action: any = {}) {
    switch (action.type) {
        case SET_USER_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
            };
        case SET_ACTIVE_PAYMENT_METHOD:
            return {
                ...state,
                activePaymentMethod: action.payload.paymentMethod,
            };
        case SET_USER_AUTH_STATE_CHANGED:
            return {
                ...state,
                authStateChanged: action.payload.authStateChanged,
            };
        case SET_USER_AUTH_STATUS:
            return {
                ...state,
                authStatus: action.payload.authStatus,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case REMOVE_USER:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        const { user } = await api.users.me();
        dispatch(setUser(user));

        // fetch active payment method if the user has one
        if (user.activePaymentMethodId) {
            dispatch(fetchActivePaymentMethod());
        }

        return user;
    };
};

export const fetchActivePaymentMethod = () => {
    return async (dispatch) => {
        const { paymentMethod } = await api.paymentMethods.myDefault();
        dispatch(setActivePaymentMethod(paymentMethod));
        return paymentMethod;
    };
};

export const getUser = (state: any): any => state.user.user;
export const getUserIsLoggedIn = (state: any): boolean => state.user.loggedIn;
export const getUserAuthStateChanged = (state: any): boolean =>
    state.user.authStateChanged;
export const getUserAuthStatus = (state: any): AuthStatus =>
    state.user.authStatus;
export const getUserIsAdmin = (state: any): boolean =>
    _.get(state.user, "user.admin.isAdmin") || false;
export const getUserActivePaymentMethod = (state) =>
    state.user.activePaymentMethod || null;
