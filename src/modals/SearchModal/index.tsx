import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { connectModal, InjectedProps } from "redux-modal";

type Props = InjectedProps & {};

function SearchModal({ handleHide, show }: Props) {
    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleHide}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-top sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-3 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="ext-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900 border-b pb-5"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                placeholder="What are you looking for?"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                                <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                                                    ⌘S
                                                </kbd>
                                            </div>
                                        </div>
                                    </Dialog.Title>

                                    <div className="mt-5 pb-2">
                                        <p className="text-sm text-gray-500 text-center font-medium">
                                            💡 Tip: try typing in "ref:" to
                                            focus your search
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default connectModal({ name: "SearchModal" })(SearchModal);
