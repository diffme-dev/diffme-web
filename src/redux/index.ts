import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

import user from "./user";

const reducer = combineReducers({
    user,
    modal,
});

export default reducer;
