'use client'
import { signOutAction } from "../service/actions";
import { Button } from "./ui/button";

export default function SignOutBtn() {
    function handleSignOut() {
        localStorage.clear();
        signOutAction();
    }
    return (
        <Button variant={"outline"}
            className=" border-2 border-orange-600 bg-white bg-opacity-75 text-orange-700"
            onClick={handleSignOut}
        >Log Out</Button>
    )
}