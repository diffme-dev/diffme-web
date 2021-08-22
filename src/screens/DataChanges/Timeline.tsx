import React, { Fragment } from "react";
import {
    ChatAltIcon,
    TagIcon,
    RefreshIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/solid";
import { diffme } from "../../api";
import { useQuery } from "react-query";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// Access the key, status and page variables in your query function!
function getChanges({ queryKey }) {
    const [_key] = queryKey;
    return diffme.changes.list({
        limit: 50,
    });
}

export default function Timeline() {
    const { data, isLoading } = useQuery(["changes", {}], getChanges, {
        enabled: true,
    });

    const changes = data?.isSuccess() ? data.value.changes : [];

    return (
        <div className="flow-root">
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

const Change = React.memo<ChangeProps>(
    ({ change }) => {
        console.log("CHANGE: ", change);

        return (
            <>
                <div>
                    <div className="relative px-1">
                        <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                            <ChangeIcon change={change} />
                        </div>
                    </div>
                </div>
                <div className="min-w-0 flex-1 py-0">
                    <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {change.editor}
                                    {"  "}
                                    <span className="font-normal text-gray-600">
                                        edited field
                                    </span>
                                </h3>
                            </div>{" "}
                        </span>{" "}
                        <span className="mr-0.5">
                            <Fragment>
                                <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                    <span className="absolute flex-shrink-0 flex items-center justify-center">
                                        <span
                                            className={
                                                "h-1.5 w-1.5 rounded-full bg-green-400"
                                            }
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="ml-3.5 font-medium text-gray-900">
                                        Email Andrew
                                    </span>
                                </div>
                            </Fragment>
                        </span>
                        <span className="whitespace-nowrap">{change.date}</span>
                    </div>
                </div>
            </>
        );
    },
    (prev, next) => prev.change.id !== next.change.id
);
