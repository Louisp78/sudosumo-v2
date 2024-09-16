'use client'
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function NoSpoonLeftPage() {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>(timeUntilMidnight());


    // Function to calculate time until midnight
    function timeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // Set to next midnight

        const difference = midnight.getTime() - now.getTime();

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeUntilMidnight());
        }, 1000); // Update every second

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <main className="flex w-full justify-center items-center flex-grow">
            <Card className="p-5">
                <h1 className="font-semibold text-2xl">No spoon left ...</h1>
                <p className="text-lg font-medium text-gray-500">{"Come back in "}
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                </p>
            </Card>
        </main>
    )
}