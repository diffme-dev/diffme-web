import fp from "lodash/fp";
import React, { useEffect, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Router, Switch, useLocation } from "react-router-dom";
import { history } from "src/App";
import config from "src/config";
import {
    fetchUser,
    logoutUser,
    setUserAuthState,
    setUserAuthStateChanged,
    setUserLoggedIn,
} from "src/redux/reducers/user";

import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ViewListIcon,
    XIcon,
} from "@heroicons/react/outline";
import Sidebar from "./Sidebar";

import Login from "src/screens/Authentication/Login";
import Signup from "src/screens/Authentication/Signup";
import ForgotPassword from "src/screens/Authentication/ForgotPassword";
import LiveView from "src/screens/LiveView";
import DataChanges from "src/screens/DataChanges";
import Team from "src/screens/Team";

import SearchModal from "src/modals/SearchModal";

import { Firebase } from "src/utils";
import LogRocket from "logrocket";
import ReferenceDetails from "../screens/ReferenceDetails";
import Settings from "src/screens/Settings";

const Intercom = window.Intercom;

type Props = {
    history: any;
};

const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: true },
    { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
    { name: "Recent", href: "#", icon: ClockIcon, current: false },
];

const teams = [
    { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
    { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
    { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];

const projects = [
    {
        id: 1,
        title: "GraphQL API",
        initials: "GA",
        team: "Engineering",
        members: [
            {
                name: "Dries Vincent",
                handle: "driesvincent",
                imageUrl:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Lindsay Walton",
                handle: "lindsaywalton",
                imageUrl:
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Courtney Henry",
                handle: "courtneyhenry",
                imageUrl:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Tom Cook",
                handle: "tomcook",
                imageUrl:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
        ],
        totalMembers: 12,
        lastUpdated: "March 17, 2020",
        pinned: true,
        bgColorClass: "bg-pink-600",
    },
    // More projects...
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const recordLogrocketUser = (user: any) => {
    LogRocket.identify(user.uid, {
        name: user.name,
        email: user.email,
    });
};

const recordSegmentUser = (user: any) => {
    // window.analytics.identify(user.uid, {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     phone: user.phoneNumber,
    //     avatar: user.profileUrl,
    //     referralId: user.referredById,
    //     createdAt: user.createdAt,
    //     // custom traits
    //     isGuide: !!user.activeMerchantId,
    //     userType: user.activeMerchantId ? "guide" : "guest",
    //     timezone: user.timezone,
    // });
};

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative h-screen flex overflow-hidden bg-white">
            <SearchModal />

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 lg:hidden"
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
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2">
                                    <div className="space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                                    "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
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
                                    <div className="mt-8">
                                        <h3
                                            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                            id="mobile-teams-headline"
                                        >
                                            Teams
                                        </h3>
                                        <div
                                            className="mt-1 space-y-1"
                                            role="group"
                                            aria-labelledby="mobile-teams-headline"
                                        >
                                            {teams.map((team) => (
                                                <a
                                                    key={team.name}
                                                    href={team.href}
                                                    className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                                >
                                                    <span
                                                        className={classNames(
                                                            team.bgColorClass,
                                                            "w-2.5 h-2.5 mr-4 rounded-full"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="truncate">
                                                        {team.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
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

            {/* Static sidebar for desktop */}

            <Sidebar />
            {/* Main column */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Search header */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <Route exact component={LiveView} path="/live" />
                    <Route exact component={DataChanges} path="/changes" />
                    <Route exact component={Team} path="/team" />
                    <Route exact component={DataChanges} path="/references" />
                    <Route exact component={Settings} path="/settings" />
                    <Route
                        exact
                        component={DataChanges}
                        path="/references/:id"
                    />
                    <Route
                        exact
                        component={ReferenceDetails}
                        path="/references/details/:id"
                    />
                </main>
            </div>
        </div>
    );
}

function Navigation(props: Props) {
    const dispatch = useDispatch();
    const _setUserLoggedIn = fp.compose(dispatch, setUserLoggedIn);
    const _setUserAuthStateChanged = fp.compose(
        dispatch,
        setUserAuthStateChanged
    );

    const logout = async () => {
        // window.analytics.reset();
        await Firebase.auth().signOut();
        dispatch(logoutUser());
    };

    const bootIntercom = (user: firebase.default.User | null) => {
        if (!Intercom) {
            return;
        }

        Intercom("boot", {
            hide_default_launcher: false,
            app_id: config.intercomAppId,
            ...(user && {
                email: user.email,
                name: user.displayName,
                user_id: user.uid,
            }),
        });
    };

    // On mount
    useEffect(() => {
        dispatch(setUserAuthState("NOT_LOADED"));

        Firebase.auth().onAuthStateChanged(async (u) => {
            dispatch(setUserAuthState(u ? "LOGGED_IN" : "NOT_LOGGED_IN"));

            // Note: order of intercom matters
            if (u) {
                bootIntercom(u);
                _setUserAuthStateChanged(true);
                _setUserLoggedIn(true);
                const user = await dispatch(fetchUser());
                recordLogrocketUser(user);
                recordSegmentUser(user);
            } else {
                bootIntercom(null);
                _setUserAuthStateChanged(true);
                _setUserLoggedIn(false);
            }
        });
    }, []);

    useEffect(() => {
        const unListen = history.listen(() => {
            // window.analytics.page();
        });

        return () => {
            unListen();
        };
    }, []);

    return (
        <Router history={props.history}>
            <ScrollToTop />

            <div style={{ height: "100%", width: "100%" }} id="go__container">
                <Switch>
                    <Route
                        exact
                        path="/logout"
                        component={(props: Props) => {
                            void logout();
                            props.history.push("/");
                            return <div> Logging Out... </div>;
                        }}
                    />
                    <Route
                        exact
                        component={ForgotPassword}
                        path="/forgot-password"
                    />
                    <Route exact component={Login} path="/login" />
                    <Route exact component={Signup} path="/sign-up" />
                    <Dashboard />
                </Switch>
            </div>
        </Router>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default Navigation;
