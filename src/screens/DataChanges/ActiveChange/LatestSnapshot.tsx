import { omit } from "lodash/fp";
import React from "react";
import ReactJson from "react-json-view";
import { useQuery } from "react-query";
import { diffme } from "src/api";

const fetchLatestRef = async () => {
    const response = await diffme.snapshots.forReferenceId("hi");

    if (response.isFailure()) {
        return null;
    }

    return response.value;
};

function LatestSnapshot() {
    const { data, isLoading } = useQuery(["latestSnapshot"], fetchLatestRef);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>None...</div>;
    }

    return (
        <div className="mt-7 flex-1 mb-0 px-5">
            <ReactJson
                style={{ padding: 15, borderRadius: 15 }}
                theme="shapeshifter"
                name="snapshot"
                src={omit("id", data)}
            />
        </div>
    );
}

export default LatestSnapshot;
