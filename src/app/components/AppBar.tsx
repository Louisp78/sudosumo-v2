"use client"

import { ArrowLeftIcon, SoupIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"
import { usePathname } from "next/navigation"
import { GiSpoon } from "react-icons/gi"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"

export default function AppBar(props: { avatarUrl?: string | null, lifes: number }) {
    const pathname = usePathname()
    return (
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-2 px-6 z-40">
            <div className="flex justify-evenly items-center">
                {pathname !== "/profile" && <Link href={"/"}>
                    <h1 className="text-2xl font-bold text-orange-700 font-japanese flex items-center">
                        <SoupIcon className="mr-2 text-yellow-500" />
                        SudoSumo
                    </h1>
                </Link>
                }
                {pathname === "/profile" &&
                    <Link href={"/"}>
                        <Button variant="ghost" className="bg-opacity-80 text-orange-700 flex gap-3">
                            <ArrowLeftIcon />
                            Go back to puzzle
                        </Button>
                    </Link>
                }
                <nav className="flex gap-3 md:gap-7">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="flex items-center space-x-2 px-2 md:hover:bg-red-500 text-red-500 md:hover:text-white rounded-sm">
                                    <GiSpoon className="" size={25} />
                                    <span className='text-xl font-semibold'>{props.lifes}</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="hidden md:block bg-white rounded-md p-2">
                                <p>{"Every day, your lives are reset to 5"}</p>
                                <p>Use them wisely to solve puzzles!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Link href={"/profile"}>
                        <UserAvatar size={50} className="w-12 h-12" avatarUrl={props.avatarUrl} />
                    </Link>

                </nav>
            </div>
        </header>
    )
}
