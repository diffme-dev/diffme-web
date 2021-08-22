import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    CalendarIcon,
    CogIcon,
    HomeIcon,
    MapIcon,
    MenuIcon,
    SearchCircleIcon,
    SpeakerphoneIcon,
    UserGroupIcon,
    ViewGridAddIcon,
    XIcon,
} from "@heroicons/react/outline";
import {
    ChevronLeftIcon,
    FilterIcon,
    MailIcon,
    PhoneIcon,
    SearchIcon,
} from "@heroicons/react/solid";
import Timeline from "./Timeline";
import { diffme } from "../../api";
import { useQuery } from "react-query";
import moment from "moment-timezone";
import ActiveChange from "./ActiveChange";
import { useDispatch } from "react-redux";
import { show } from "redux-modal";

export default function DataChanges() {
    const dispatch = useDispatch();

    const onClickSearch = () => {
        dispatch(show("SearchModal"));
    };

    return (
        <div className="relative h-screen flex overflow-hidden bg-white">
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
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
                                            className="py-3 bg-gray-100 focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 text-left rounded-md"
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

                        <ChangeList />
                    </aside>

                    <ActiveChange />
                </div>
            </div>
        </div>
    );
}

// Access the key, status and page variables in your query function!
function getChanges({ queryKey }) {
    const [_key] = queryKey;
    return diffme.changes.list("");
}

const ChangeList = () => {
    const { data, isLoading } = useQuery(["changes", {}], getChanges, {
        enabled: true,
    });

    const changes = data?.isSuccess() ? data.value.changes : [];

    return (
        <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
                {changes.map((change) => (
                    <li key={change.id}>
                        <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                            <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    <p className="text-sm font-medium text-gray-900">
                                        {change.reference_id}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Edited by {change.editor}
                                    </p>
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 truncate">
                                    {moment(change.created_at).fromNow(false)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
