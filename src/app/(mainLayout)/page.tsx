import { redirect } from "next/navigation"
import { getUser } from "../service/user"
import NoSpoonLeftPage from "./NoSpoonLeftPage"
import PuzzlePage from "./(PuzzlePage)/PuzzlePage"

export default async function HomePage() {
    const user = await getUser()
    if (user == null)
        redirect('/login')
    if (user?.lifes)
        return (
            <PuzzlePage />
        )
    else
        return <NoSpoonLeftPage />
}
