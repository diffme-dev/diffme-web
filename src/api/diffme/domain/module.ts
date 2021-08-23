import { Request } from "../shared/Request";

export class Module {
    protected request: Request;

    constructor(request: Request) {
        this.request = request;
    }
}
