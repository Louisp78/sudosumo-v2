import { auth } from "../auth";
import { redirect } from "next/navigation";
import { getUser } from "../service/user";
import CreateUsernamePage from "./CreateUsernamePage";
import LoginPage from "./LoginPage";

export default async function Page() {
    const [session, user] = await Promise.all([auth(), getUser()]);

    if (session?.id_token && user?.username != null) {
        redirect("/")
    }

    if (session?.id_token == null)
        return (<LoginPage />)
    else
        return (<CreateUsernamePage />)
}
