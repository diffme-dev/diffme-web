import Request from "../../libs/Request";
import Authentication from "./Authentication";
import Messages from "./Messages";
import Uploads from "./Uploads";
import Users from "./Users";
import Groups from "./Groups";
import Payments from "./Payments";
import PaymentMethods from "./PaymentMethods";

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
    }
}

export default PayupApi;
