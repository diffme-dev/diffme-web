import { SearchIcon } from "@heroicons/react/solid";
import MainFeed from "./MainFeed";
import Reference from "src/components/Reference";
import { useDispatch } from "react-redux";
import { show } from "redux-modal";
import { useRouteMatch } from "react-router-dom";

type MatchParams = {
    id?: string;
};

export default function DataChanges() {
    const dispatch = useDispatch();
    const match = useRouteMatch<MatchParams>();
    const { id } = match.params || {};

    const onClickSearch = () => {
        dispatch(show("SearchModal"));
    };

    return (
        <div className="relative h-screen flex overflow-hidden bg-white">
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <aside className="xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                        <div className="border-b px-6 pt-5 pb-5">
                            <h2 className="text-lg font-medium text-gray-900">
                                Search Recent Diffs
                            </h2>

                            <form className="mt-3 flex space-x-4" action="#">
                                <div className="flex-1 min-w-0">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative rounded-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <button
                                            name="search"
                                            onClick={onClickSearch}
                                            id="search"
                                            className="py-3 bg-gray-100 focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 text-left rounded-xl"
                                            placeholder="Search"
                                        >
                                            <div className="opacity-40 font-semibold text-small">
                                                Search changes...
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <MainFeed />
                    </aside>

                    {id ? (
                        <Reference referenceId={id} />
                    ) : (
                        <div>Select a reference...</div>
                    )}
                </div>
            </div>
        </div>
    );
}
