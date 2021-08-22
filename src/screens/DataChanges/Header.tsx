import {
    CreditCardIcon,
    OfficeBuildingIcon,
    UserIcon,
    UsersIcon,
    BookOpenIcon,
    PlayIcon,
    DatabaseIcon,
} from "@heroicons/react/solid";

const tabs = [
    { name: "Latest Snapshot", href: "#", icon: DatabaseIcon, current: false },
    { name: "Change Sets", href: "#", icon: BookOpenIcon, current: false },
    { name: "Live Changes", href: "#", icon: PlayIcon, current: true },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    return (
        <div className="border-b py-10 pb-0 pt-8 px-10">
            <div className="max-w-5xl pb-2">
                <div className="sm:block 2xl min-w-0 flex-1">
                    <h1 className="text-xl font-bold text-gray-900 truncate">
                        Reference: 5e6a636c61d2c800a381b719
                    </h1>
                </div>
            </div>

            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-white rounded-md"
                    defaultValue={tabs.find((tab) => tab.current)?.name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                <tab.icon
                                    className={classNames(
                                        tab.current
                                            ? "text-indigo-500"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        "-ml-0.5 mr-2 h-5 w-5"
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
