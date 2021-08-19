import axios from "axios";

// Type definition for input params for functions of Request
type ReqInfo = {
    url: string;
    header?: any;
    auth?: boolean;
    body?: any;
    query?: any;
};

export default class Request {
    _getAuthToken: () => Promise<string | null>;
    _domain: string;
    _axios;

    constructor({ getAuthToken, domain }: any) {
        this._getAuthToken = getAuthToken;
        this._domain = domain;

        const axiosClient = axios.create({
            baseURL: domain,
            timeout: 30 * 1000, // 30 seconds
            // this allows settings cookies
            withCredentials: true,
        });

        this._axios = axiosClient;
    }

    /**
     * This makes a get request to server
     *
     * @param {ReqInfo} obj An object with request info
     * @param {String} obj.url The url endpoint, ie /api/users
     * @param {Object} obj.header An object with any headers
     * @param {Boolean} obj.auth Whether or not to send the jwt
     */
    async get({ url, header, query, auth = true }: ReqInfo): Promise<any> {
        const headers: any = {
            ...header,
            "Content-Type": "application/json",
        };
        // Try to set auth if it is passed
        const token: string | null = await this._getAuthToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        return await this._axios.get(url, {
            headers: headers,
            params: query,
        });
    }

    /**
     * This makes a post request to server
     *
     * @param {ReqInfo} obj An object with request info
     * @param {String} obj.url The url endpoint, ie /api/users
     * @param {Object} obj.header An object with any headers
     * @param {Object} obj.body An object with request body
     * @param {Boolean} obj.auth Whether or not to send the jwt
     */
    async post({
        url,
        header,
        body,
        query,
        auth = true,
    }: ReqInfo): Promise<any> {
        const headers: any = {
            ...header,
            "Content-Type": "application/json",
        };
        // Try to set auth if it is passed
        const token: string | null = await this._getAuthToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        return await this._axios.post(url, body, {
            headers: headers,
            params: query,
        });
    }
    /**
     * This makes a put request to server
     *
     * @param {ReqInfo} obj An object with request info
     * @param {String} obj.url The url endpoint, ie /api/users
     * @param {Object} obj.header An object with any headers
     * @param {Object} obj.body An object with request body
     * @param {Boolean} obj.auth Whether or not to send the jwt
     */
    async put({
        url,
        header,
        body,
        query,
        auth = true,
    }: ReqInfo): Promise<any> {
        const headers: any = {
            ...header,
            "Content-Type": "application/json",
        };
        // Try to set auth if it is passed
        const token: string | null = await this._getAuthToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }
        return await this._axios.put(url, body, {
            headers: headers,
            params: query,
        });
    }
    /**
     * This makes a put request to server
     *
     * @param {ReqInfo} obj An object with request info
     * @param {String} obj.url The url endpoint, ie /api/users
     * @param {Object} obj.header An object with any headers
     * @param {Object} obj.body An object with request body
     * @param {Boolean} obj.auth Whether or not to send the jwt
     */
    async delete({ url, header, query, auth = true }: ReqInfo): Promise<any> {
        const headers: any = {
            ...header,
            "Content-Type": "application/json",
        };
        // Try to set auth if it is passed
        const token: string | null = await this._getAuthToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }
        return await this._axios.delete(url, {
            headers: headers,
            params: query,
        });
    }
    /**
     * This makes a put request to server
     *
     * @param {ReqInfo} obj An object with request info
     * @param {String} obj.url The url endpoint, ie /api/users
     * @param {Object} obj.header An object with any headers
     * @param {Object} obj.body An object with request body
     * @param {Boolean} obj.auth Whether or not to send the jwt
     */
    async patch({
        url,
        header,
        body,
        query,
        auth = true,
    }: ReqInfo): Promise<any> {
        const headers: any = {
            ...header,
            "Content-Type": "application/json",
        };
        // Try to set auth if it is passed
        const token: string | null = await this._getAuthToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }
        return await this._axios.patch(url, body, {
            headers: headers,
            params: query,
        });
    }
}
