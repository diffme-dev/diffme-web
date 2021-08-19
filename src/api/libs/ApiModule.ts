import Request from "./Request";

class ApiModule {
    _request: Request;
    constructor(request: Request) {
        this._request = request;
    }
}

export default ApiModule;
