import React, { Fragment } from "react";
import {
    RefreshIcon,
    TrashIcon,
    PlusCircleIcon,
    ChevronDoubleRightIcon,
    ArrowRightIcon,
} from "@heroicons/react/solid";
import { diffme } from "src/api";
import { useQuery } from "react-query";
import moment from "moment-timezone";
import { Helpers } from "src/utils";
import { isUndefined } from "lodash/fp";
import Change from "src/components/Changes/ChangeRow";

// Access the key, status and page variables in your query function!
function getChanges({ queryKey }) {
    const [_key] = queryKey;
    return diffme.changes.list({
        limit: 50,
    });
}

function LiveChanges() {
    const { data, isLoading } = useQuery(["changes", {}], getChanges, {
        enabled: true,
    });

    const changes = data?.isSuccess() ? data.value.changes : [];

    return (
        <div className="flow-root px-3 py-6">
            <ul className="-mb-8">
                {changes.map((change, index) => (
                    <li key={change.id}>
                        <div className="relative pb-6">
                            {index !== changes.length - 1 ? (
                                <span
                                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                />
                            ) : null}

                            <div className="relative flex items-start space-x-3">
                                <Change change={change} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LiveChanges;
