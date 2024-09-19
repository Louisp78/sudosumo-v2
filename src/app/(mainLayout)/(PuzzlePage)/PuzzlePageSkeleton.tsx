import { Skeleton } from "@/components/ui/skeleton"

export default function PuzzlePageSkeleton() {
    return (
        <main className="w-full flex  flex-col gap-8 md:gap-5 flex-grow justify-center items-center">
            <Skeleton className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
            <Skeleton className="h-36 md:h-24 w-80 md:w-[600px]" />
        </main>
    )
}
