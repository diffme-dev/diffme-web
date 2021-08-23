import React, { useState } from "react";

type ButtonProps = {
    label: string;
    icon?: any;
    onClick: any;
    loading?: boolean;
    timeout?: number;
    type?: "submit" | "button";
    className?: string;
};

function Button({
    type = "button",
    loading,
    icon,
    label,
    onClick,
    timeout = 500,
    className,
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

    return (
        <button
            type={type}
            onClick={_onClick}
            disabled={isLoading || loading}
            className={
                `inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    className || ""
                }` +
                (isLoading || loading
                    ? " disabled:opacity-60 cursor-wait "
                    : "")
            }
        >
            {label}
            {icon}
        </button>
    );
}

export default Button;
