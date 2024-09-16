'use client'

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import UsernameInput from "@/app/components/UsernameInput";
import { UserDTO } from "@/app/service/dto/UserDTO";
import { getUser, updateUserInfos } from "@/app/service/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
    const router = useRouter()

    const [user, setUser] = useState<UserDTO | undefined>(undefined)
    const [usernameValid, setUsernameValid] = useState<boolean>(true)

    useEffect(() => {
        getUser().then((user) => {
            if (user)
                setUser(user)
        })
    }, [setUser])

    function handleSubmit(data: FormData) {
        updateUserInfos(data).then(() => router.push('/profile'))
    }

    return (
        <main className="flex flex-grow w-full justify-center items-center">
            <Card className="p-5">
                <form action={handleSubmit} className="flex flex-col items-start gap-3">
                    <div className="flex justify-center w-full">

                        <h1>Edit Profile</h1>
                    </div>
                    <div>
                        <Label>Fullname</Label>
                        <Input name="name" placeholder="Fullname" defaultValue={user?.fullname} />
                    </div>
                    <UsernameInput name="username" placeholder="Username" onValid={() => setUsernameValid(true)} defaultValue={user?.username} />
                    <div className="flex flex-col w-full gap-1">
                        <Label>Biography</Label>
                        <Textarea
                            className="w-full"
                            name="bio" placeholder="Describe you..." defaultValue={user?.bio} />
                    </div>
                    <div className="flex w-full gap-3 justify-center">
                        <Button type="submit" disabled={!usernameValid}>Save</Button>
                        <Link href={'/profile'}>
                            <Button>Cancel</Button>
                        </Link>
                    </div>
                </form>

            </Card>
        </main>
    )
}
