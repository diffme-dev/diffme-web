export type ApiModuleParams = {
    domain: string;
    apiKey: string;
    version: string;
    oauth: Oauth;
};

export type Oauth = {
    getJWTToken(): Promise<string | null>;
};
