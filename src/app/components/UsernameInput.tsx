import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { isUsernameExist } from "../service/user";
import { CheckCircle2Icon, CircleAlertIcon } from "lucide-react";
import clsx from "clsx";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValid?: () => void
}

const UsernameInput: React.FC<CustomInputProps> = ({ onValid, ...props }) => {
    const [isUsernameValid, setIsUsernameValid] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (isUsernameValid) {
            onValid?.()
        }
    }, [isUsernameValid, onValid])

    const handleChange = debounce(async (query: string) => {
        if (query === props.defaultValue) return setIsUsernameValid(undefined)
        if (query.length <= 3) return setIsUsernameValid(undefined)
        const response: boolean = await isUsernameExist(query);
        setIsUsernameValid(response);
    }, 1000);

    const renderIcon = () => {
        if (isUsernameValid == null)
            return null;
        else if (isUsernameValid)
            return <CheckCircle2Icon />
        else
            return <CircleAlertIcon color="red" />
    }

    return (
        <div>
            <Label htmlFor="username">Username</Label>
            <div className="flex gap-2 items-center">
                <Input name="username" id="username"
                    placeholder="Enter username"
                    onChange={(value) => handleChange(value.target.value)} className={clsx({
                        "border-red-500": isUsernameValid === false,
                    })}
                    {...props}
                />
                {renderIcon()}
            </div>
            {isUsernameValid === false && <span className="text-red-500 text-xs">This username is not available</span>}
            {isUsernameValid === undefined && <span className="text-gray-500 text-xs">It must contains at least 4 characters</span>}
        </div>
    )
}

export default UsernameInput;
