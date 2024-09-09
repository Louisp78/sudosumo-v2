import { signOut } from "../auth";
import { signOutAction } from "../lib/actions";

export default function SignOutBtn(props : BaseProps) {
    return (
        <form action={signOutAction} className={props.className}>
            <button>Log Out</button>
        </form>
    )
}