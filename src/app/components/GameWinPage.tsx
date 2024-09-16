'use client'

import Link from "next/link";

import { Card } from "@/app/components/ui/card"
import { SoupIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
export default function GameWinPage(props: { onClose: () => void, noodles: number }) {
    return (
        <main className="w-full flex-grow flex flex-col items-center justify-center">
            <Card className="bg-white bg-opacity-80 flex flex-col justify-center items-center px-10 py-5">
                <SoupIcon className="h-32 w-32" />
                <h1 className="text-2xl font-semibold text-center">Congratulation</h1>
                <h2 className="text-md text-center font-semibold text-orange-600 pb-20">You have slurped {props.noodles} noodles</h2>
                <div className="flex-1" />
                <div className="pb-10">
                    <Button onClick={props.onClose}>
                        {"More noodles !"}
                    </Button>
                </div>
            </Card>
        </main>
    )
}