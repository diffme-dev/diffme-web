import axios, { AxiosInstance } from "axios";
import { failure, FailureOrSuccess, success } from "../core";
import axiosRetry from "axios-retry";
import qs from "querystring";
import { Oauth } from "../domain";

type Dependencies = {
    domain: string;
    apiKey: string;
    version: string;
    oauth: Oauth;
};

type RequestParams<QueryT, DataT, HeaderT> = {
    route: string;
    query?: QueryT;
    data?: DataT;
    headers?: HeaderT;
};

class Request {
    private readonly domain: string;
    private readonly apiKey: string;
    private readonly version: string;
    private readonly oauth: Oauth;
    private readonly client: AxiosInstance;

    constructor({ domain, apiKey, version, oauth }: Dependencies) {
        this.domain = domain;
        this.apiKey = apiKey;
        this.version = version;
        this.oauth = oauth;

        const client = axios.create({
            baseURL: domain,
            headers: {
                Authorization: "Bearer " + apiKey,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params);
            },
        });

        // set to allow 3 retries
        axiosRetry(client, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
        });

        this.client = client;
    }

    getDomain(): string {
        return this.domain;
    }

    getApiKey(): string {
        return this.apiKey;
    }

    getHeaders = async <HeaderT>(headers: HeaderT): Promise<any> => {
        const token = await this.oauth.getJWTToken();

        const allHeaders = {
            ...headers,
            Authorization: "Bearer " + (token || this.apiKey),
            "Content-Type": "application/json",
        };

        console.log("HEADERS: ", allHeaders);

        return allHeaders;
    };

    getRoute = (route: string): string => `${this.version}${route}`;

    get = async <
        ResponseT,
        QueryT = unknown,
        DataT = unknown,
        HeaderT = unknown
    >({
        route,
        headers,
        query,
    }: RequestParams<QueryT, DataT, HeaderT>): Promise<
        FailureOrSuccess<Error, ResponseT>
    > => {
        try {
            const response = await this.client.get<ResponseT>(
                this.getRoute(route),
                {
                    headers: await this.getHeaders(headers),
                    params: query,
                }
            );

            return success(response.data);
        } catch (err) {
            return failure(err);
        }
    };

    patch = async <
        ResponseT,
        QueryT = unknown,
        DataT = unknown,
        HeaderT = unknown
    >({
        route,
        headers,
        query,
        data,
    }: RequestParams<QueryT, DataT, HeaderT>): Promise<
        FailureOrSuccess<Error, ResponseT>
    > => {
        try {
            const response = await this.client.patch<ResponseT>(
                this.getRoute(route),
                data,
                {
                    headers: await this.getHeaders(headers),
                    params: query,
                }
            );

            return success(response.data);
        } catch (err) {
            return failure(err);
        }
    };

    post = async <
        ResponseT,
        QueryT = unknown,
        DataT = unknown,
        HeaderT = unknown
    >({
        route,
        headers,
        data,
    }: RequestParams<QueryT, DataT, HeaderT>): Promise<
        FailureOrSuccess<Error, ResponseT>
    > => {
        try {
            const response = await this.client.post<ResponseT>(
                this.getRoute(route),
                data,
                {
                    headers: await this.getHeaders(headers),
                }
            );

            return success(response.data);
        } catch (err) {
            return failure(err);
        }
    };
}

export { Request };
