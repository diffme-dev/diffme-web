import {
    RefreshIcon,
    BookOpenIcon,
    CodeIcon,
    PlayIcon,
    DatabaseIcon,
    SearchIcon,
} from "@heroicons/react/solid";
import Button from "src/components/styled/Button";
import { ActiveTab } from "./utils";
import { useClipboard } from "use-clipboard-copy";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

type HeaderProps = {
    onSelectTab: (tab: ActiveTab) => void;
    activeTab: ActiveTab;
    onRefresh: () => void;
};

export default function Header({
    onRefresh,
    onSelectTab,
    activeTab,
}: HeaderProps) {
    const clipboard = useClipboard({
        copiedTimeout: 5000, // 5 seconds timeout
    });

    const tabs = [
        {
            name: "Latest Data",
            key: "latest_snapshot",
            icon: DatabaseIcon,
            onClick: () => onSelectTab("latest_snapshot"),
            current: activeTab === "latest_snapshot",
        },
        // {
        //     name: "Change Sets",
        //     key: "change_set",
        //     icon: BookOpenIcon,
        //     onClick: () => onSelectTab("change_set"),
        //     current: activeTab === "change_set",
        // },
        {
            name: "Changes",
            key: "live_changes",
            icon: CodeIcon,
            onClick: () => onSelectTab("changes"),
            current: activeTab === "changes",
        },
        {
            name: "Search changes",
            key: "search",
            icon: SearchIcon,
            onClick: () => onSelectTab("search"),
            current: activeTab === "search",
        },
    ];

    return (
        <div className="border-b py-10 pb-0 pt-8 px-10">
            <div className="max-w-5xl pb-2 flex-row flex">
                <div className="min-w-0 flex-1 flex flex-row items-center">
                    <h1 className="mr-3 text-xl font-bold text-gray-900 truncate">
                        Reference ID:{" "}
                    </h1>
                    <kbd
                        onClick={() =>
                            clipboard.copy("5e6a636c61d2c800a381b719")
                        }
                        className="cursor-pointer bg-gray-100 code inline-flex items-center border border-gray-200 rounded-lg px-3 py-1 text-sm font-sans font-bold text-gray-400"
                    >
                        5e6a636c61d2c800a381b719
                    </kbd>
                    {clipboard.copied && <div className="ml-2">Copied!</div>}
                </div>

                <div className="w-auto">
                    <Button
                        label="Refresh"
                        onClick={onRefresh}
                        icon={
                            <RefreshIcon
                                className="ml-3 -mr-1 h-5 w-5"
                                aria-hidden="true"
                            />
                        }
                    />
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
                        <option onClick={tab.onClick} key={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <div
                                key={tab.name}
                                onClick={tab.onClick}
                                className={classNames(
                                    tab.current
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
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
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
