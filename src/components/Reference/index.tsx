import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import LiveChanges from "./LiveChanges";
import LatestSnapshot from "./LatestSnapshot";
import Search from "./Search";
import { ActiveTab } from "./utils";
import { useDispatch } from "react-redux";
import { fetchActiveReference } from "src/redux/reducers/activeReference";

type ActiveChangeProps = {
    referenceId: string;
};

function ActiveChange({ referenceId }: ActiveChangeProps) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<ActiveTab>("latest_snapshot");

    const onRefresh = () => {
        dispatch(fetchActiveReference(referenceId));
    };

    useEffect(() => {
        if (!referenceId) {
            return;
        }

        console.log("REF ID: ", referenceId);

        dispatch(fetchActiveReference(referenceId));
    }, [referenceId]);

    return (
        <main className="hidden xl:flex xl:flex-col flex-1 relative z-0 focus:outline-none xl:order-last bg-gray-50 px-5 py-5">
            <div className="bg-white rounded-md shadow-sm border h-full flex flex-col">
                <Header
                    onRefresh={onRefresh}
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />

                <div className="px-5 pt-2 pb-0 overflow-y-scroll h-auto flex-1">
                    {activeTab === "changes" ? (
                        <LiveChanges />
                    ) : activeTab === "search" ? (
                        <Search />
                    ) : activeTab === "latest_snapshot" ? (
                        <LatestSnapshot />
                    ) : null}
                </div>
            </div>
        </main>
    );
}

export default ActiveChange;
