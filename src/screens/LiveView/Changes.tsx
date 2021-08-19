import React from "react";

import {
    CheckCircleIcon,
    ChevronRightIcon,
    MailIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

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
        to: "/references/124",
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
        to: "/references/124",
    },
];

function Changes() {
    return (
        <div className="bg-white px-4 py-10 sm:px-10">
            {/* <h3 className="text-lg leading-6 font-medium text-gray-900 py-10">
                Live Changes
            </h3> */}

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {applications.map((application) => (
                        <li key={application.applicant.email}>
                            <Link
                                to={application.to}
                                className="block hover:bg-gray-50"
                            >
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src={
                                                    application.applicant
                                                        .imageUrl
                                                }
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
                                                            application
                                                                .applicant.email
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
                                                            {
                                                                application.dateFull
                                                            }
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
                                    <div>
                                        <ChevronRightIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Changes;
