export const getAdobeApiKey = (): string => {
    return process.env.REACT_APP_ADOBE_API_KEY || "";
};

const config = {
    freshchatToken: "3297e937-c659-4c16-b1b9-c72bcd46f843",
    env: process.env.REACT_APP_ENV || "local",
    apiUrl: process.env.REACT_APP_API_URL || "https://api.payup.rent",
    merchantAdminUrl:
        process.env.REACT_APP_MERCHANT_ADMIN_URL || "https://api.payup.rent",
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    mapboxStyleUrl:
        "mapbox://styles/andrew-great-outdoors/ckouhiui6264x18ln9g8g9a2q",
    mapboxToken:
        "pk.eyJ1IjoiYW5kcmV3LWdyZWF0LW91dGRvb3JzIiwiYSI6ImNrb3VoaTFsMTAxaW4ycHF2ampqaTZnZnoifQ.ps_pubdeojwkhTdltCN_aw",
    logrocketAppId: process.env.REACT_APP_LOGROCKET_APP_ID,
    stripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    stripeClientId: process.env.REACT_APP_STRIPE_CLIENT_ID,
    pubnubPublishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
    pubnubSubscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
    algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID,
    algoliaSearchApiKey: process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY,
    intercomAppId: "aes5z2vu",
    adobeApiKey: getAdobeApiKey(),
    plaid: {
        environment: process.env.REACT_APP_PLAID_ENVIRONMENT || "sandbox",
    },
};

export function isProduction() {
    return config.env === "production";
}

export default config;
