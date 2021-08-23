import React from "react";

function Logo({ className }: { className?: string }) {
    return (
        <h3
            className={`text-center items-center m-auto font-black text-xl text-gray-800 ${
                className || ""
            }`}
        >
            {"diffme"}
        </h3>
    );
}

export default Logo;
