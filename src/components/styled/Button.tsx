import React, { useState } from "react";

type ButtonProps = {
    label: string;
    icon?: any;
    onClick: any;
    loading?: boolean;
    timeout?: number;
    type?: "submit" | "button";
    className?: string;
    disabled?: boolean;
};

function Button({
    type = "button",
    loading,
    icon,
    label,
    onClick,
    timeout = 0,
    className,
    disabled = false,
}: ButtonProps) {
    const [isLoading, setLoading] = useState(false);

    const _onClick = async () => {
        setLoading(true);

        try {
            await onClick();
        } catch (err) {
        } finally {
            setTimeout(() => setLoading(false), timeout);
        }
    };

    const isDisabled = disabled || isLoading || loading;

    return (
        <button
            type={type}
            onClick={_onClick}
            disabled={isDisabled}
            className={
                `inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    className || ""
                }` +
                (isDisabled ? " disabled:opacity-60 cursor-not-allowed" : "") +
                (isLoading || loading ? " cursor-wait " : "")
            }
        >
            {label}
            {icon}
        </button>
    );
}

export default Button;
