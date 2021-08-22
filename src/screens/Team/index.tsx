import React from "react";
import {
    ChevronDownIcon,
    SearchIcon,
    SortAscendingIcon,
} from "@heroicons/react/solid";
import {
    CheckCircleIcon,
    ChevronRightIcon,
    MailIcon,
} from "@heroicons/react/solid";

const applications = [
    {
        applicant: {
            name: "Ricardo Cooper",
            email: "ricardo.cooper@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Kristen Ramos",
            email: "kristen.ramos@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
];

function Team() {
    return (
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden rounded-md">
                <Header />
                <UsersTable />
            </div>
        </div>
    );
}

const UsersTable = () => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {applications.map((application) => (
                    <li key={application.applicant.email}>
                        <a
                            href={application.href}
                            className="block hover:bg-gray-50"
                        >
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={application.applicant.imageUrl}
                                            alt=""
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">
                                                {application.applicant.name}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <MailIcon
                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span className="truncate">
                                                    {
                                                        application.applicant
                                                            .email
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Applied on{" "}
                                                    <time
                                                        dateTime={
                                                            application.date
                                                        }
                                                    >
                                                        {application.dateFull}
                                                    </time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <CheckCircleIcon
                                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                        aria-hidden="true"
                                                    />
                                                    {application.stage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Header = () => {
    return (
        <div className="pb-5 py-5 px-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Team
            </h3>
            <div className="mt-3 sm:mt-0 sm:ml-4">
                <label htmlFor="mobile-search-candidate" className="sr-only">
                    Search
                </label>
                <label htmlFor="desktop-search-candidate" className="sr-only">
                    Search
                </label>
                <div className="flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="text"
                            name="mobile-search-candidate"
                            id="mobile-search-candidate"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
                            placeholder="Search"
                        />
                        <input
                            type="text"
                            name="desktop-search-candidate"
                            id="desktop-search-candidate"
                            className="hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
                            placeholder="Search candidates"
                        />
                    </div>
                    <button
                        type="button"
                        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <SortAscendingIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <span className="ml-2">Sort</span>
                        <ChevronDownIcon
                            className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Team;
