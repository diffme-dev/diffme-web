import { ApiModuleParams, Oauth } from "../../domain";
import { Request } from "../../shared/Request";
import { Changes } from "./Changes";
import { Snapshots } from "./Snapshots";
import { Users } from "./Users";

class ApiModuleV1 {
    private request: Request;
    private oauth: Oauth;
    public changes: Changes;
    public snapshots: Snapshots;
    public users: Users;

    constructor({ domain, apiKey, version, oauth }: ApiModuleParams) {
        this.oauth = oauth;
        this.request = new Request({
            domain,
            apiKey,
            version,
            oauth,
        });
        this.changes = new Changes(this.request);
        this.snapshots = new Snapshots(this.request);
        this.users = new Users(this.request);
    }
}

export { ApiModuleV1 };
