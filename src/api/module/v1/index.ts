import Request from "../../libs/Request";
import Authentication from "./Authentication";
import Messages from "./Messages";
import Uploads from "./Uploads";
import Users from "./Users";
import Groups from "./Groups";
import Payments from "./Payments";
import PaymentMethods from "./PaymentMethods";
import diffmeSDK from "../../diffme";
import { ApiModuleV1 } from "src/api/diffme/modules/v1";
import { Firebase } from "src/utils";

// Export the API module
type Params = {
    domain: string;
    getAuthToken?: () => Promise<string | null>;
};

class PayupApi {
    _request: Request;
    users: Users;
    uploads: Uploads;
    auth: Authentication;
    messages: Messages;
    groups: Groups;
    payments: Payments;
    paymentMethods: PaymentMethods;
    diffme: ApiModuleV1;

    constructor({ getAuthToken, domain }: Params) {
        // add request to super
        const request = new Request({ getAuthToken, domain });
        this._request = request;

        this.paymentMethods = new PaymentMethods(request);
        this.payments = new Payments(request);
        this.groups = new Groups(request);
        this.users = new Users(request);
        this.uploads = new Uploads(request);
        this.auth = new Authentication(request);
        this.messages = new Messages(request);
        this.diffme = diffmeSDK({
            version: "v1",
            domain: "http://localhost:3001",
            apiKey: "",
            oauth: {
                getJWTToken: async (): Promise<string | null> => {
                    try {
                        const user = await Firebase.auth().currentUser;

                        const token = await user?.getIdToken(true);

                        return token || null;
                    } catch (err) {
                        console.error(err);
                        return null;
                    }
                },
            },
        });
    }
}

export default PayupApi;
