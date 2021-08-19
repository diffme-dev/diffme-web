import ApiModule from "../../libs/ApiModule";
import Request from "../../libs/Request";

/**
 * This class handles requests to /v1/groups endpoints
 */
export default class Groups extends ApiModule {
    constructor(request: Request) {
        super(request);
    }

    me = async (query?: any) => {
        const res = await this._request.get({
            url: `/v1/groups/me`,
            auth: true,
            query,
        });
        return res.data;
    };

    patch = async (groupId: string, body?: any) => {
        const res = await this._request.patch({
            url: `/v1/groups/${groupId}`,
            auth: true,
            body,
        });
        return res.data;
    };

    patchMyMember = async (groupId: string, body: any) => {
        const res = await this._request.patch({
            url: `/v1/groups/${groupId}/my-member`,
            auth: true,
            body,
        });
        return res.data;
    };

    join = async (groupId: string, body: any) => {
        const res = await this._request.post({
            url: `/v1/groups/${groupId}/join`,
            auth: true,
            body,
        });
        return res.data;
    };

    retrieve = async (groupId: string) => {
        const res = await this._request.get({
            url: `/v1/groups/${groupId}`,
            auth: true,
        });
        return res.data;
    };

    myMember = async (groupId: string) => {
        const res = await this._request.get({
            url: `/v1/groups/${groupId}/me`,
            auth: true,
        });
        return res.data;
    };

    toggleLive = async (groupId: string, body: any) => {
        const res = await this._request.patch({
            url: `/v1/groups/${groupId}/live`,
            auth: true,
            body,
        });
        return res.data;
    };

    members = async (groupId: string) => {
        const res = await this._request.get({
            url: `/v1/groups/${groupId}/members`,
            auth: true,
        });
        return res.data;
    };

    paymentBatches = async (groupId: string) => {
        const res = await this._request.get({
            url: `/v1/groups/${groupId}/payment-batches`,
            auth: true,
        });
        return res.data;
    };

    create = async (body: any) => {
        const res = await this._request.post({
            url: `/v1/groups`,
            auth: true,
            body,
        });
        return res.data;
    };
}
