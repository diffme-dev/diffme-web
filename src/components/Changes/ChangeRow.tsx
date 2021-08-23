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
import { isNull } from "lodash";

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

    return <RefreshIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />;
};

type ChangeProps = { change: any };

const getSanitizedPath = (change) => {
    const path: string = change.diff.path;

    // remove first character and replace / with >
    return path.slice(1).replace(/\//g, ".");
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
    if (!val && isNull(val)) {
        return "null";
    }

    if (typeof val === "string") {
        return val;
    }

    return JSON.stringify(val, null, 2);
};

const Values = ({ change }) => {
    const oldValue = change.diff.old_value;
    const newValue = change.diff.value;
    // null case is ALLOWED so only check undefed
    const hasOldValue = !isUndefined(oldValue);
    const hasNewValue = !isUndefined(newValue);

    return (
        <div className="flex flex-row items-center mx-3">
            {oldValue && (
                <div className="text-base font-bold text-gray-600">
                    {getValueStringified(oldValue)}
                </div>
            )}

            {hasOldValue && hasNewValue && (
                <div className="text-base font-normal text-gray-600 mx-3">
                    <ChevronDoubleRightIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                    />
                </div>
            )}

            {newValue && (
                <div className="text-base  font-bold text-gray-600">
                    {getValueStringified(newValue)}
                </div>
            )}
        </div>
    );
};

export default Change;
