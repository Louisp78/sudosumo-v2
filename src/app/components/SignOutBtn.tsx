import { signOut } from "../auth";
import { signOutAction } from "../lib/actions";
import { Button } from "./ui/button";

export default function SignOutBtn(props: BaseProps) {
    return (
        <form action={signOutAction} className={props.className}>
            <Button variant={"outline"} className=" border-2 border-orange-600 bg-white bg-opacity-75 text-orange-700">Log Out</Button>
        </form>
    )
}