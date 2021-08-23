import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
    BellIcon,
    BriefcaseIcon,
    ChatIcon,
    CogIcon,
    DocumentSearchIcon,
    HomeIcon,
    MenuAlt2Icon,
    QuestionMarkCircleIcon,
    UsersIcon,
    XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: false },
    { name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
    {
        name: "Applications",
        href: "#",
        icon: DocumentSearchIcon,
        current: false,
    },
    { name: "Messages", href: "#", icon: ChatIcon, current: false },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
    { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
    { name: "Logout", href: "#", icon: CogIcon },
];
const tabs = [
    { name: "General", href: "#", current: true },
    { name: "Password", href: "#", current: false },
    { name: "Billing (WIP)", href: "#", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
        useState(true);
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
        useState(false);

    return (
        <div className="relative h-screen bg-white overflow-hidden flex">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40 flex md:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-14 p-1">
                                    <button
                                        type="button"
                                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <XIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 px-4 flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                                    alt="Easywire"
                                />
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="h-full flex flex-col">
                                    <div className="space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-purple-50 border-purple-600 text-purple-600"
                                                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                    "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? "text-purple-500"
                                                            : "text-gray-400 group-hover:text-gray-500",
                                                        "mr-4 flex-shrink-0 h-6 w-6"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-10 space-y-1">
                                        {secondaryNavigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                            >
                                                <item.icon
                                                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Content area */}
            <div className="px-10 w-5/6 h-full m-auto shadow-lg rounded-lg my-10 border border-gray-100">
                <main className="px-1 flex-1 overflow-y-auto focus:outline-none">
                    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                        <div className="pt-10 pb-16">
                            <div className="px-4 sm:px-6 md:px-0">
                                <h1 className="text-3xl font-extrabold text-gray-900">
                                    Settings
                                </h1>
                            </div>
                            <div className="px-4 sm:px-6 md:px-0">
                                <div className="py-6">
                                    {/* Tabs */}
                                    <div className="lg:hidden">
                                        <label
                                            htmlFor="selected-tab"
                                            className="sr-only"
                                        >
                                            Select a tab
                                        </label>
                                        <select
                                            id="selected-tab"
                                            name="selected-tab"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                                            defaultValue={
                                                tabs.find((tab) => tab.current)
                                                    ?.name
                                            }
                                        >
                                            {tabs.map((tab) => (
                                                <option key={tab.name}>
                                                    {tab.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className="border-b border-gray-200">
                                            <nav className="-mb-px flex space-x-8">
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.name}
                                                        href={tab.href}
                                                        className={classNames(
                                                            tab.current
                                                                ? "border-purple-500 text-purple-600"
                                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                                        )}
                                                    >
                                                        {tab.name}
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>

                                    {/* Description list with inline editing */}
                                    <div className="mt-10 divide-y divide-gray-200">
                                        <div className="space-y-1">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Profile
                                            </h3>
                                            <p className="max-w-2xl text-sm text-gray-500">
                                                This information will be
                                                displayed publicly so be careful
                                                what you share.
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <dl className="divide-y divide-gray-200">
                                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Name
                                                    </dt>
                                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <span className="flex-grow">
                                                            Chelsea Hagon
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Update
                                                            </button>
                                                        </span>
                                                    </dd>
                                                </div>
                                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Photo
                                                    </dt>
                                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <span className="flex-grow">
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                alt=""
                                                            />
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                            <button
                                                                type="button"
                                                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Update
                                                            </button>
                                                            <span
                                                                className="text-gray-300"
                                                                aria-hidden="true"
                                                            >
                                                                |
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </span>
                                                    </dd>
                                                </div>
                                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Email
                                                    </dt>
                                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <span className="flex-grow">
                                                            chelsea.hagon@example.com
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                            >
                                                                Update
                                                            </button>
                                                        </span>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
