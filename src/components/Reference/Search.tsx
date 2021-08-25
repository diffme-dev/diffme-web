import React, { Fragment, useCallback, useEffect, useState } from "react";
import api, { diffme } from "src/api";
import { debounce, isNull } from "lodash";
import { getReferenceLatestSnapshot } from "src/redux/reducers/activeReference";
import { useSelector } from "react-redux";
import ChangeRow from "src/components/Changes/ChangeRow";

function Search() {
    const snapshot = useSelector(getReferenceLatestSnapshot);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const _buildQuery = (queryStr: string) => {
        const [name, value] = queryStr.split(":");

        const query = {
            ...(name === "editor" && {
                editor: value,
            }),
            ...(name === "field" && {
                field: value,
            }),
            ...(name === "value" && {
                value: value,
            }),
        };

        return query;
    };

    const onSearch = useCallback(
        debounce(async () => {
            // TODO:
            const params = search.split(" ");
            const query = params.reduce(
                (acc, elem) => ({ ...acc, ..._buildQuery(elem) }),
                {
                    reference_ids: [snapshot.reference_id],
                }
            );

            // TODO: figure out...
            const response = await api.diffme.changes.search(query);

            if (response.isFailure()) {
                return;
            }

            setResults(response.value.changes);
        }, 500),
        [search]
    );

    useEffect(() => {
        onSearch();
    }, [search]);

    return (
        <div className="flow-root px-0 w-full">
            <div className="w-full inline-block align-bottom bg-white px-4 pb-4 text-left overflow-hidden transform transition-all sm:align-top sm:p-6">
                <div>
                    <div className="ext-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            <div className="relative flex items-center max-w-md">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    value={search}
                                    autoFocus
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="What are you looking for?"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 rounded-md w-full"
                                />
                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                    <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                                        ⌘S
                                    </kbd>
                                </div>
                            </div>
                        </h3>

                        <div className="mt-5 pb-2">
                            <p className="text-sm text-gray-500 text-left font-medium">
                                💡 Tip: try typing in "editor:" or "field:" to
                                focus your search. For example,{" "}
                                <div className="code text-red-600 font-semibold inline-block bg-gray-100 rounded-md px-2 py-1">
                                    editor:andrew field:name
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flow-root px-3 py-6">
                <ul className="-mb-8">
                    {results.map((change, index) => (
                        <li key={change.id}>
                            <div className="relative pb-6">
                                {index !== results.length - 1 ? (
                                    <span
                                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}

                                <div className="relative flex items-start space-x-3">
                                    <ChangeRow change={change} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
