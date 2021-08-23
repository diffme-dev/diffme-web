import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    CogIcon,
    PlayIcon,
    UserIcon,
    DatabaseIcon,
    UserGroupIcon,
    CodeIcon,
} from "@heroicons/react/outline";
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    DuplicateIcon,
    PencilAltIcon,
    SearchIcon,
    SelectorIcon,
    TrashIcon,
    UserAddIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/redux/reducers/user";
import { show } from "redux-modal";
import { Link } from "react-router-dom";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

function Sidebar() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(show("SearchModal"));
    };

    const navigation = [
        {
            name: "Search Data",
            onClick: showModal,
            icon: SearchIcon,
            current: false,
        },
        // {
        //     name: "References",
        //     href: "/references",
        //     icon: DatabaseIcon,
        //     current: false,
        // },
        {
            name: "View Diffs",
            href: "/changes",
            icon: CodeIcon,
            current: false,
        },
        {
            name: "Your Team",
            href: "/team",
            icon: UserGroupIcon,
            current: false,
        },
        {
            name: "Settings",
            href: "/settings",
            icon: CogIcon,
            current: false,
        },
    ];

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-200 pt-8 pb-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex items-center flex-shrink-0 px-5">
                    <h3 className="code font-black text-xl text-gray-800">
                        {"diffme"}
                    </h3>
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                    {/* User account dropdown */}
                    {/* Navigation */}
                    <nav className="px-3 mt-6">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href || "#"}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                    onClick={item.onClick}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? "text-gray-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="border-t border-gray-200 p-4">
                    <span className="flex w-full justify-between items-center">
                        <span className="flex min-w-0 items-center justify-between space-x-3">
                            {/* TODO: */}
                            <img
                                className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                alt=""
                            />
                            <span className="flex-1 flex flex-col min-w-0">
                                <span className="text-gray-900 text-sm font-medium truncate">
                                    {user?.firstName || "Andrew"}
                                </span>
                                <span className="text-gray-500 text-sm truncate">
                                    {user?.email || "andrew.j.duca@gmail.com"}
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
