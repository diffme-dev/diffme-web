import config from "src/config";

import { getAuthToken } from "../utils/Firebase";
import ApiV1 from "./module/v1";
import diffmeSDK from "./diffme";

export * from "./interfaces";

const domain = config.apiUrl;

// export default the v1
const api = new ApiV1({
    getAuthToken,
    domain,
});

export const diffme = api.diffme;

export default api;
