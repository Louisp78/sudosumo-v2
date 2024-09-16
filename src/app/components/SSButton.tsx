import React from "react"
import { Button, ButtonProps } from "./ui/button"
import clsx from "clsx"

export default function SSButton({ className, type, children, ...props }: ButtonProps) {
    return (
        <Button
            type={type}
            className={clsx("rounded-lg border-2 border-orange-500 px-4 py-2 hover:bg-orange-500 font-medium text-orange-700 hover:text-white transition-colors flex items-center bg-transparent",
                className)}
            {...props}
        >
            {children}
        </Button>
    )
}
