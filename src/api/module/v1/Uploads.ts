import Request from "../../libs/Request";
import ApiModule from "../../libs/ApiModule";

/**
 * This class handles requests to /v1/uploads endpoints
 */
export default class Uploads extends ApiModule {
    constructor(request: Request) {
        super(request);
    }
    file = async (query: any, file: File): Promise<any> => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await this._request.post({
            url: `/v1/uploads`,
            header: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
            auth: true,
            query,
        });
        return res.data;
    };
    uploadDocument = async (query: any, file: File): Promise<any> => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await this._request.post({
            url: `/v1/uploads/documents`,
            header: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
            auth: true,
            query,
        });
        return res.data;
    };
}
