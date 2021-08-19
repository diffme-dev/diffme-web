import "./App.css";

import * as sentry from "@sentry/browser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createBrowserHistory, History } from "history";
import localforage from "localforage";
import LogRocket from "logrocket";
import { PubNubProvider } from "pubnub-react";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import config, { isProduction } from "src/config";
import pubnub from "src/utils/Pubnub";

import Navigation from "./navigation";
import reducers from "./redux";
import Authentication from "./utils/Authentication";

// Create persisted reducer and store
const persistConfig: PersistConfig<any, any, any> = {
    key: "root",
    storage: localforage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["createGroup"],
};

const middleware: any[] = [thunk];

if (isProduction()) {
    LogRocket.init(config.logrocketAppId!);

    // Add logrocket url to segment so it gets funneled to mixpanel
    LogRocket.getSessionURL(function (sessionURL: string) {
        window.analytics.track("Log Rocket Session - Client", {
            sessionURL: sessionURL,
        });
    });

    sentry.init({
        dsn: config.sentryDsn,
        environment: config.env,
    });

    // Attach logrocket url to the sentry error
    LogRocket.getSessionURL((sessionURL) => {
        sentry.configureScope((scope) => {
            scope.addEventProcessor(async (event: any) => {
                event.extra.sessionURL = sessionURL;
                return event;
            });
        });
    });

    middleware.push(LogRocket.reduxMiddleware());
} else {
    middleware.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);
const history: History = createBrowserHistory();
const stripePromise = loadStripe(config.stripePublicKey as string);
const queryClient = new QueryClient();

const App: React.FC = () => {
    Authentication.useFirebaseRedirectListener();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Elements stripe={stripePromise}>
                    <PubNubProvider client={pubnub}>
                        <QueryClientProvider client={queryClient}>
                            <Navigation history={history} />
                        </QueryClientProvider>
                    </PubNubProvider>
                </Elements>
            </PersistGate>
        </Provider>
    );
};

export { history, store };

export default App;
