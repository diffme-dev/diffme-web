import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ViewListIcon,
    XIcon,
    PlayIcon,
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
import { useSelector } from "react-redux";
import { getUser } from "../redux/user";

const navigation = [
    { name: "Search Data", href: "/search", icon: SearchIcon, current: false },
    { name: "Live Changes", href: "/live", icon: PlayIcon, current: true },
    // {
    //     name: "View Diffs",
    //     href: "/changes",
    //     icon: CodeIcon,
    //     current: false,
    // },
    {
        name: "Team",
        href: "/team",
        icon: UserGroupIcon,
        current: false,
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

function Sidebar() {
    const user = useSelector(getUser);

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex items-center flex-shrink-0 px-6">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                        alt="Workflow"
                    />
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                    {/* User account dropdown */}
                    <Menu
                        as="div"
                        className="px-3 mt-6 relative inline-block text-left"
                    >
                        <div>
                            <Menu.Button className="group w-full bg-gray-100 dark:bg-black rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
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
                                                {user?.email ||
                                                    "andrew.j.duca@gmail.com"}
                                            </span>
                                        </span>
                                    </span>
                                    <SelectorIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                View profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="border-t py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                Logout
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Navigation */}
                    <nav className="px-3 mt-6">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
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
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
