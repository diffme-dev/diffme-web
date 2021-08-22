import React from "react";
import { useState } from "react";
import Header from "./Header";
import LiveChanges from "./LiveChanges";
import LatestSnapshot from "./LatestSnapshot";
import { ActiveTab } from "./utils";

function ActiveChange() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("latest_snapshot");

    return (
        <main className="hidden xl:flex xl:flex-col flex-1 relative z-0 focus:outline-none xl:order-last bg-gray-50 px-5 py-5">
            <div className="bg-white rounded-md shadow-sm border h-full flex flex-col">
                <Header activeTab={activeTab} onSelectTab={setActiveTab} />

                <div className="px-5 pt-2 pb-0 overflow-y-scroll h-auto flex-1">
                    {activeTab === "live_changes" ? (
                        <LiveChanges />
                    ) : activeTab === "change_set" ? null : activeTab ===
                      "latest_snapshot" ? (
                        <LatestSnapshot />
                    ) : null}
                </div>
            </div>
        </main>
    );
}

export default ActiveChange;
