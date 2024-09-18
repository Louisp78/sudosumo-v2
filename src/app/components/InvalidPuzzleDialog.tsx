import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import React, { useEffect, useState } from "react"
import SSButton from "./SSButton"
import { DialogProps } from "@radix-ui/react-dialog"
import { getUser } from "../service/user"
import { UserDTO } from "../service/dto/UserDTO"

export default function InvalidPuzzleDialog({ onContinue, ...props }: {
    onContinue: () => void;
} & DialogProps) {
    const [user, setUser] = useState<UserDTO>()
    useEffect(() => {
        getUser().then((user) => user ? setUser(user) : null)
    }, [setUser])
    return (<Dialog {...props}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='text-xl font-semibold'>You have lost your spoon</DialogTitle>
                <DialogDescription>
                    You have done an invalid move and you broke your spoon.
                </DialogDescription>
                <DialogDescription className='text-gray-500'>
                    {`If you are stuck don't hesitate to clear the board and retry.
                    You have ${user?.lifes} spoon left.`}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <SSButton onClick={() => onContinue()}>Continue</SSButton>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}
