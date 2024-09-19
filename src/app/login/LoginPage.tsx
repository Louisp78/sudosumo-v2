'use client'
import { useEffect } from "react"
import GoogleSignInBtn from "../components/GoogleSignInBtn"
import { Card } from "../components/ui/card"

export default function LoginPage() {
    useEffect(() => {
        if (localStorage.length > 0)
            localStorage.clear()
    })
    return (
        <main className="flex flex-grow justify-center items-center flex-col w-full gap-20">
            <div className="flex flex-col items-center gap-5">
                <span className="text-5xl">🍜</span>
                <h1 className="text-4xl font-semibold">SudoSumo</h1>
            </div>
            <Card className="flex flex-col items-center justify-center w-fit">
                <div className="border flex flex-col items-center px-5 py-8 rounded-lg">
                    <h2 className="text-xl pb-5">Login</h2>
                    <GoogleSignInBtn />
                </div>
            </Card>
        </main>
    )
}
