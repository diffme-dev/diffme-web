import ApiModule from "../../libs/ApiModule";
import Request from "../../libs/Request";

/**
 * This class handles requests to /v1/users endpoints
 */
export default class Users extends ApiModule {
    constructor(request: Request) {
        super(request);
    }
    all = async (query: any = {}) => {
        const res = await this._request.get({
            url: `/v1/users`,
            auth: true,
            query,
        });
        return res.data;
    };
    id = async (userId: string) => {
        const res = await this._request.get({
            url: `/v1/users/${userId}`,
            auth: true,
        });
        return res.data;
    };
    /**
     * Gets your profile (using your jwt to find out who you are)
     *
     * @return {Object} An object with server response
     */
    me = async () => {
        const res = await this._request.get({
            url: "/v1/users/me",
            auth: true,
        });
        return res.data;
    };

    // async isAdmin() {
    //     const res = await this._request.get({
    //         url: "/v1/users/is-admin",
    //         auth: true
    //     });
    //     return res.data;
    // }
    /**
     * Creates a new user.
     */
    create = async (fields: any) => {
        const res = await this._request.post({
            url: "/v1/users",
            body: fields,
            auth: true,
        });
        return res.data;
    };
    exists = async (uid: string): Promise<any> => {
        const res = await this._request.get({
            url: `/v1/users/uid/${uid}/exists`,
            auth: true,
        });
        return res.data;
    };
    /**
     * Updates an existing user.
     */
    update = async (fields: any): Promise<any> => {
        const res = await this._request.put({
            url: `/v1/users/me`,
            body: fields,
            auth: true,
        });
        return res.data;
    };
    updateById = async (userId: string, fields: any): Promise<any> => {
        const res = await this._request.put({
            url: `/v1/users/${userId}`,
            body: fields,
            auth: true,
        });
        return res.data;
    };
    addExternalAccount = async (cardToken: string): Promise<any> => {
        const res = await this._request.put({
            url: `/v1/users/me/external-accounts/add`,
            body: { cardToken },
            auth: true,
        });
        return res.data;
    };
    linkAccount = async (body: any): Promise<any> => {
        const res = await this._request.put({
            url: `/v1/users/me/linked-accounts`,
            body: body,
            auth: true,
        });
        return res.data;
    };
    updateDefaultPaymentMethod = async (
        paymentMethodId: string
    ): Promise<any> => {
        const res = await this._request.put({
            url: `/v1/users/me/payment-methods/default`,
            body: { paymentMethodId },
            auth: true,
        });
        return res.data;
    };
    removePaymentMethod = async (paymentMethodId: string): Promise<any> => {
        const res = await this._request.delete({
            url: `/v1/users/me/payment-methods/${paymentMethodId}`,
            auth: true,
        });
        return res.data;
    };
    addPaymentMethod = async (body: any): Promise<any> => {
        const res = await this._request.post({
            url: `/v1/users/me/payment-methods`,
            body,
            auth: true,
        });
        return res.data;
    };
    sendVerifyPhoneCode = async (body: any): Promise<any> => {
        const res = await this._request.post({
            url: `/v1/users/phone/code`,
            body,
            auth: true,
        });
        return res.data;
    };
    verifyPhoneCode = async (body: any): Promise<any> => {
        const res = await this._request.post({
            url: `/v1/users/phone/verify`,
            body,
            auth: true,
        });
        return res.data;
    };
}
