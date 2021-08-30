import { Request } from "../shared/Request";
import { Oauth } from "./api";

export class Module {
    protected request: Request;

    constructor(request: Request) {
        this.request = request;
    }
}
