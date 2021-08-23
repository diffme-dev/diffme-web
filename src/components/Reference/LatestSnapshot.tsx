import { omit } from "lodash/fp";
import React from "react";
import ReactJson from "react-json-view";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { diffme } from "src/api";
import { getReferenceLatestSnapshot } from "src/redux/reducers/activeReference";

function LatestSnapshot() {
    const snapshot = useSelector(getReferenceLatestSnapshot);

    console.log("SNAP: ", snapshot);

    return (
        <div className="mt-7 flex-1 mb-0 px-5 pb-10">
            <ReactJson
                displayDataTypes={false}
                quotesOnKeys={false}
                style={{ padding: 25, borderRadius: 15, fontSize: 14 }}
                theme="shapeshifter"
                name="snapshot"
                src={omit("id", snapshot)}
            />
        </div>
    );
}

export default LatestSnapshot;
