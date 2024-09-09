import Link from "next/link";

//TODO: refactor with new theme
export default function GameWinPage() {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-center pt-20 pb-5">Congratulation you won !</h1>
            <h2 className="text-xl font-bold text-center text-green-500">+10 noodles</h2>
            <div className="flex-1" />
            <div className="pb-10">
                <Link href="/" className="bg-cyan-600 border px-3 py-2 rounded-md text-white">{"Let's make ramen !"}</Link>
            </div>
        </main>
    )
}