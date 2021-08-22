import React from "react";

type ButtonProps = {
    label: string;
    icon: any;
};

function Button({ icon, label }: ButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {label}
            {icon}
        </button>
    );
}

export default Button;
