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

const user = {
    name: "Tom Cook",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Teams", href: "#", icon: UserGroupIcon, current: false },
    { name: "Directory", href: "#", icon: SearchCircleIcon, current: false },
    {
        name: "Announcements",
        href: "#",
        icon: SpeakerphoneIcon,
        current: false,
    },
    { name: "Office Map", href: "#", icon: MapIcon, current: false },
];
const secondaryNavigation = [
    { name: "Apps", href: "#", icon: ViewGridAddIcon },
    { name: "Settings", href: "#", icon: CogIcon },
];
const tabs = [
    { name: "Profile", href: "#", current: true },
    { name: "Calendar", href: "#", current: false },
    { name: "Recognition", href: "#", current: false },
];
const profile = {
    name: "Ricardo Cooper",
    imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    coverImageUrl:
        "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
    fields: {
        Phone: "(555) 123-4567",
        Email: "ricardocooper@example.com",
        Title: "Senior Front-End Developer",
        Team: "Product Development",
        Location: "San Francisco",
        Sits: "Oasis, 4th floor",
        Salary: "$145,000",
        Birthday: "June 8, 1990",
    },
};
const directory = {
    A: [
        {
            id: 1,
            name: "Leslie Abbott",
            role: "Co-Founder / CEO",
            imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 2,
            name: "Hector Adams",
            role: "VP, Marketing",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            name: "Blake Alexander",
            role: "Account Coordinator",
            imageUrl:
                "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 4,
            name: "Fabricio Andrews",
            role: "Senior Art Director",
            imageUrl:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    B: [
        {
            id: 5,
            name: "Angela Beaver",
            role: "Chief Strategy Officer",
            imageUrl:
                "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 6,
            name: "Yvette Blanchard",
            role: "Studio Artist",
            imageUrl:
                "https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 7,
            name: "Lawrence Brooks",
            role: "Content Specialist",
            imageUrl:
                "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    C: [
        {
            id: 8,
            name: "Jeffrey Clark",
            role: "Senior Art Director",
            imageUrl:
                "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 9,
            name: "Kathryn Cooper",
            role: "Associate Creative Director",
            imageUrl:
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    E: [
        {
            id: 10,
            name: "Alicia Edwards",
            role: "Junior Copywriter",
            imageUrl:
                "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 11,
            name: "Benjamin Emerson",
            role: "Director, Print Operations",
            imageUrl:
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 12,
            name: "Jillian Erics",
            role: "Designer",
            imageUrl:
                "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 13,
            name: "Chelsea Evans",
            role: "Human Resources Manager",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    G: [
        {
            id: 14,
            name: "Michael Gillard",
            role: "Co-Founder / CTO",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 15,
            name: "Dries Giuessepe",
            role: "Manager, Business Relations",
            imageUrl:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    M: [
        {
            id: 16,
            name: "Jenny Harrison",
            role: "Studio Artist",
            imageUrl:
                "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 17,
            name: "Lindsay Hatley",
            role: "Front-end Developer",
            imageUrl:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 18,
            name: "Anna Hill",
            role: "Partner, Creative",
            imageUrl:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    S: [
        {
            id: 19,
            name: "Courtney Samuels",
            role: "Designer",
            imageUrl:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 20,
            name: "Tom Simpson",
            role: "Director, Product Development",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    T: [
        {
            id: 21,
            name: "Floyd Thompson",
            role: "Principal Designer",
            imageUrl:
                "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 22,
            name: "Leonard Timmons",
            role: "Senior Designer",
            imageUrl:
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 23,
            name: "Whitney Trudeau",
            role: "Copywriter",
            imageUrl:
                "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    W: [
        {
            id: 24,
            name: "Kristin Watson",
            role: "VP, Human Resources",
            imageUrl:
                "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 25,
            name: "Emily Wilson",
            role: "VP, User Experience",
            imageUrl:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    Y: [
        {
            id: 26,
            name: "Emma Young",
            role: "Senior Front-end Developer",
            imageUrl:
                "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
};
const team = [
    {
        name: "Leslie Alexander",
        handle: "lesliealexander",
        role: "Co-Founder / CEO",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Michael Foster",
        handle: "michaelfoster",
        role: "Co-Founder / CTO",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Dries Vincent",
        handle: "driesvincent",
        role: "Manager, Business Relations",
        imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        role: "Front-end Developer",
        imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function DataChanges() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative h-screen flex overflow-hidden bg-white">
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                        {/* Breadcrumb */}
                        <nav
                            className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                            aria-label="Breadcrumb"
                        >
                            <a
                                href="#"
                                className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                            >
                                <ChevronLeftIcon
                                    className="-ml-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span>Directory</span>
                            </a>
                        </nav>

                        <article>
                            {/* Profile header */}
                            <div className="border-b py-8 pb-7">
                                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="sm:block 2xl min-w-0 flex-1">
                                        <h1 className="text-xl font-bold text-gray-900 truncate">
                                            Reference: 5e6a636c61d2c800a381b719
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 pt-12 pb-4">
                                <Timeline />
                            </div>
                        </article>
                    </main>
                    <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                        <div className="px-6 pt-6 pb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Data Changes
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Search recent diffs
                            </p>
                            <form className="mt-6 flex space-x-4" action="#">
                                <div className="flex-1 min-w-0">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            type="search"
                                            name="search"
                                            id="search"
                                            className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Search"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                    <FilterIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                        {/* Directory list */}
                        <nav
                            className="flex-1 min-h-0 overflow-y-auto"
                            aria-label="Directory"
                        >
                            <ul
                                role="list"
                                className="relative z-0 divide-y divide-gray-200"
                            >
                                {Array.from({ length: 50 }).map(
                                    (letter, index) => (
                                        <li key={index}>
                                            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                                                <div className="flex-1 min-w-0">
                                                    <a
                                                        href="#"
                                                        className="focus:outline-none"
                                                    >
                                                        {/* Extend touch target to entire panel */}
                                                        <span
                                                            className="absolute inset-0"
                                                            aria-hidden="true"
                                                        />
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Doc Name
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            edited by Andrew
                                                        </p>
                                                    </a>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        5s ago
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
}
