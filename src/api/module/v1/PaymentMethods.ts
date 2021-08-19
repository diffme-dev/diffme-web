import ApiModule from "../../libs/ApiModule";
import Request from "../../libs/Request";

/**
 * This class handles requests to /v1/payment-methods endpoints
 */
export default class PaymentMethods extends ApiModule {
    constructor(request: Request) {
        super(request);
    }

    myDefault = async () => {
        const res = await this._request.get({
            url: `/v1/payment-methods/me/default`,
            auth: true,
        });

        return res.data;
    };

    me = async () => {
        const res = await this._request.get({
            url: `/v1/payment-methods/me`,
            auth: true,
        });

        return res.data;
    };

    setDefault = async (paymentMethodId: string) => {
        const res = await this._request.get({
            url: `/v1/payment-methods/${paymentMethodId}/set-default`,
            auth: true,
        });

        return res.data;
    };

    patch = async (paymentMethodId: string, body: any) => {
        const res = await this._request.patch({
            url: `/v1/payment-methods/${paymentMethodId}`,
            auth: true,
            body,
        });

        return res.data;
    };

    create = async (body: any) => {
        const res = await this._request.post({
            url: `/v1/payment-methods`,
            auth: true,
            body,
        });

        return res.data;
    };
}
