import { redirect } from "next/navigation"
import { getUser } from "../service/user"
import NoSpoonLeftPage from "./NoSpoonLeftPage"
import PuzzlePage from "./(PuzzlePage)/PuzzlePage"
import PuzzlePageSkeleton from "./(PuzzlePage)/PuzzlePageSkeleton"
import { Suspense } from "react"

export default async function HomePage() {
    const user = await getUser()
    if (user == null)
        redirect('/login')
    if (user?.lifes)
        return (
            <Suspense fallback={<PuzzlePageSkeleton />}>
                <PuzzlePage />
            </Suspense>
        )
    else
        return <NoSpoonLeftPage />
}
