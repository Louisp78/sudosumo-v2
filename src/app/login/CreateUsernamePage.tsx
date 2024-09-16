'use client'
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { registerUser } from "../service/user";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import UsernameInput from "../components/UsernameInput";

export default function CreateUsernamePage() {

    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    return (
        <main className="flex flex-grow justify-center items-center">
            <Card className="p-5 flex flex-col gap-3">
                <h1 className="text-xl font-semibold">{"What's your fight name ?"}</h1>
                <form action={registerUser}>
                    <UsernameInput onValid={() => setIsFormValid(true)} />

                    <div className="flex justify-center pt-5">
                        <Button type="submit" disabled={!isFormValid} className="flex gap-1 items-center">
                            <p>Continue</p>
                            <ArrowRight className="w-5" />
                        </Button>
                    </div>
                </form>
            </Card>
        </main>
    );
}
