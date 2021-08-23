import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

import user from "./user";
import activeReference from "./activeReference";

const reducer = combineReducers({
    user,
    modal,
    activeReference,
});

export default reducer;
