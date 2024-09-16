import { getUser } from "../service/user";
import NoSpoonLeftPage from "./NoSpoonLeftPage";
import PuzzlePage from "./PuzzlePage";

export default async function HomePage() {

    const user = await getUser();
    if (user?.lifes)
        return <PuzzlePage />
    else
        return <NoSpoonLeftPage />
}
