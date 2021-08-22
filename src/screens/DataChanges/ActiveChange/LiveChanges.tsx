import React, { Fragment } from "react";
import { RefreshIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { diffme } from "src/api";
import { useQuery } from "react-query";
import moment from "moment-timezone";
import { Helpers } from "src/utils";

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
            <ul role="list" className="-mb-8">
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

const ChangeIcon = ({ change }) => {
    if (change.diff.op === "replace") {
        return (
            <RefreshIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        );
    }

    if (change.diff.op === "remove") {
        return (
            <TrashIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        );
    }

    if (change.diff.op === "add") {
        return (
            <PlusCircleIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
            />
        );
    }

    return null;
};

type ChangeProps = { change: any };

const getSanitizedPath = (change) => {
    const path: string = change.diff.path;

    // remove first character and replace / with >
    return path.slice(1).replace(/\//g, " > ");
};

const getOperation = (change) => {
    const op = change.diff.op;

    if (op === "add") {
        return "Added";
    }

    if (op === "remove") {
        return "Removed";
    }

    if (op === "replace") {
        return "Replaced";
    }

    return "Replaced";
};

const Change = React.memo<ChangeProps>(
    ({ change }) => {
        console.log("CHANGE: ", change);
        const path = getSanitizedPath(change);
        const operation = getOperation(change);

        return (
            <>
                <div>
                    <div className="relative px-1">
                        <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                            <ChangeIcon change={change} />
                        </div>
                    </div>
                </div>
                <div className="min-w-0 flex-1 py-0 pt-1 pb-5">
                    <div className="text-sm leading-8 text-gray-500">
                        <div className="flex flex-row items-center">
                            <h3 className="font-bold text-gray-900 text-base">
                                {change.editor}
                            </h3>
                            <div className="ml-4 whitespace-nowrap text-base">
                                {moment(change.created_at).fromNow()}
                            </div>
                        </div>

                        <div className="mt-2 flex flex-row items-center">
                            <h3 className="text-base text-gray-600 font-normal">
                                {operation}
                            </h3>

                            <div className="text-base code mx-2 font-bold text-red-600">
                                {path}
                            </div>

                            <Values change={change} />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    (prev, next) => prev.change.id !== next.change.id
);

const getValueStringified = (val: any) => {
    if (typeof val === "string") {
        return val;
    }

    return JSON.stringify(val, null, 2);
};

const Values = ({ change }) => {
    const oldValue = change.diff.old_value;
    const newValue = change.diff.value;

    return (
        <div className="flex flex-row items-center">
            {oldValue && (
                <div className="text-base font-bold text-gray-600">
                    {getValueStringified(oldValue)}
                </div>
            )}

            {oldValue && (
                <div className="text-base font-normal text-gray-600 mx-2">
                    to
                </div>
            )}

            {newValue && (
                <div className="text-base text-gray-600 mx-2">
                    {getValueStringified(newValue)}
                </div>
            )}
        </div>
    );
};

export default LiveChanges;
