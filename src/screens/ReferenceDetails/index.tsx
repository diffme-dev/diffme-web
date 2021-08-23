import { Fragment, useState } from "react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Reference from "src/components/Reference";

export default function ReferenceDetails() {
    return (
        <div className="relative h-screen flex overflow-hidden bg-white">
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <Reference referenceId="" />
                </div>
            </div>
        </div>
    );
}
