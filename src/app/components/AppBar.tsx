"use client"

import { ArrowLeftIcon, SoupIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import { GiSpoon } from "react-icons/gi";

export default function AppBar(props: { avatarUrl?: string | null, lifes: number }) {
    const pathname = usePathname();
    return (
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-orange-700 font-japanese flex items-center">
                    <SoupIcon className="mr-2 text-yellow-500" />
                    SudoSumo
                </h1>
                <nav className="flex items-center space-x-4">
                    {pathname === "/profile" &&
                        <Link href={"/"}>
                            <Button variant="ghost" className="bg-opacity-80 text-orange-700 flex gap-3">
                                <ArrowLeftIcon />
                                Go back to puzzle
                            </Button>
                        </Link>
                    }
                    <div className="flex items-center space-x-2">
                        <GiSpoon className="text-red-500" size={23} />
                        <span className='text-xl font-semibold text-red-500'>{props.lifes}</span>
                    </div>
                    <Link href={"/profile"}>
                        <UserAvatar size={50} className="w-10 h-10" avatarUrl={props.avatarUrl} />
                    </Link>
                </nav>
            </div>
        </header>
    )
}
