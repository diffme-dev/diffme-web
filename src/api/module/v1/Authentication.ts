import Request from "../../libs/Request";
import ApiModule from "../../libs/ApiModule";

/**
 * This class handles requests to /v1/analytics endpoints
 */
export default class Authentication extends ApiModule {
    constructor(request: Request) {
        super(request);
    }
    token = async (): Promise<any> => {
        const res = await this._request.post({
            url: `/v1/auth/token`,
            auth: true
        });
        return res.data;
    };
}
