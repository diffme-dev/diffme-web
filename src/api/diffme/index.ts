import { Oauth } from "./domain";
import { ApiModuleV1 } from "./modules/v1";

type ClientParams = {
    version: "v1";
    apiKey: string;
    domain: string;
    oauth: Oauth;
};

const _client = ({
    version = "v1",
    domain,
    apiKey,
    oauth,
}: ClientParams): ApiModuleV1 => {
    switch (version) {
        case "v1": {
            return new ApiModuleV1({ domain, apiKey, version, oauth });
        }
        default: {
            throw new Error(
                "please specify field 'version' in constructor args"
            );
        }
    }
};

export default _client;
