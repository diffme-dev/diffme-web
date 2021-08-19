import Request from "../../libs/Request";
import ApiModule from "../../libs/ApiModule";

/**
 * This class handles requests to /v1/messages endpoints
 */
export default class Messages extends ApiModule {
    constructor(request: Request) {
        super(request);
    }
    delete = async (messageId: string) => {
        const res = await this._request.delete({
            url: `/v1/messages/${messageId}`,
            auth: true
        });
        return res.data;
    };
    update = async (messageId: string, body: any) => {
        const res = await this._request.put({
            url: `/v1/messages/${messageId}`,
            auth: true,
            body
        });
        return res.data;
    };
}
