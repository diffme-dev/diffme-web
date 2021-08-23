import _ from "lodash";
import api from "src/api";

// Constants
export const SET_ACTIVE_REFERENCE_SNAPSHOT = "SET_ACTIVE_REFERENCE_SNAPSHOT";
export const SET_ACTIVE_REFERENCE_CHANGES = "SET_ACTIVE_REFERENCE_CHANGES";

export type SET_ACTIVE_REFERENCE_SNAPSHOT =
    typeof SET_ACTIVE_REFERENCE_SNAPSHOT;
export type SET_ACTIVE_REFERENCE_CHANGES = typeof SET_ACTIVE_REFERENCE_CHANGES;

// Initial state
type ActiveReferenceState = {
    snapshot: any | null;
    changes: any[];
};

const initialState: ActiveReferenceState = {
    snapshot: null,
    changes: [],
};

// Actions
type SetActiveReferenceSnapshot = {
    type: SET_ACTIVE_REFERENCE_SNAPSHOT;
    payload: { snapshot: any };
};

export function setActiveReferenceSnapshot(
    snapshot: any
): SetActiveReferenceSnapshot {
    return { type: SET_ACTIVE_REFERENCE_SNAPSHOT, payload: { snapshot } };
}

type SetActiveReferenceChanges = {
    type: SET_ACTIVE_REFERENCE_CHANGES;
    payload: { changes: any[] };
};

export function setActiveReferenceChanges(
    changes: any[]
): SetActiveReferenceChanges {
    return { type: SET_ACTIVE_REFERENCE_CHANGES, payload: { changes } };
}

type ActiveReferenceActions =
    | SetActiveReferenceSnapshot
    | SetActiveReferenceChanges;

// Reducer
export default function reducer(
    state = initialState,
    action: ActiveReferenceActions
) {
    switch (action.type) {
        case SET_ACTIVE_REFERENCE_CHANGES:
            return {
                ...state,
                changes: action.payload.changes,
            };
        case SET_ACTIVE_REFERENCE_SNAPSHOT:
            return {
                ...state,
                snapshot: action.payload.snapshot,
            };
        default:
            return state;
    }
}

export const fetchActiveReference = (referenceId: string) => {
    return async (dispatch) => {
        const snapshotResponse = await api.diffme.snapshots.forReferenceId(
            referenceId
        );

        if (snapshotResponse.isFailure()) {
            return null;
        }

        const snapshot = snapshotResponse.value;
        const changeResponse = await api.diffme.changes.forReferenceId(
            referenceId
        );

        if (changeResponse.isFailure()) {
            return null;
        }

        const changes = changeResponse.value.changes;

        dispatch(setActiveReferenceSnapshot(snapshot));
        dispatch(setActiveReferenceChanges(changes));

        return null;
    };
};

export const getReferenceLatestSnapshot = (state) =>
    state.activeReference.snapshot || null;
export const getReferenceChanges = (state) =>
    state.activeReference.changes || [];
