import GoogleSignInBtn from "@/app/components/GoogleSignInBtn";
import { auth } from "../auth";
import { redirect } from "next/navigation";

//TODO: Update with the theme
export default async function Page() {
    const session = await auth();
    if (session?.id_token)
        redirect('/')

    return (
        <main className="flex justify-center">
            <section className="relative flex flex-col items-center justify-center h-screen">
                <div className="absolute top-40 flex flex-col items-center gap-5">
                    <span className="text-5xl">🍜</span>
                    <h1 className="text-4xl font-semibold">SudoSumo</h1>
                </div>
                <div className="border flex flex-col items-center px-5 py-8 rounded-lg">
                    <h2 className="text-xl pb-5">Login</h2>
                    <GoogleSignInBtn />
                </div>
            </section>
        </main>
    )
}