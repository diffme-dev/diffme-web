import ApiModule from "../../libs/ApiModule";
import Request from "../../libs/Request";

/**
 * This class handles requests to /v1/payments endpoints
 */
export default class Payments extends ApiModule {
    constructor(request: Request) {
        super(request);
    }

    plaidLink = async () => {
        const res = await this._request.post({
            url: `/v1/payments/plaid/link`,
            auth: true,
        });
        return res.data;
    };
}
