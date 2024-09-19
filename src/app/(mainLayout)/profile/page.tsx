import SignOutBtn from "@/app/components/SignOutBtn"
import { Suspense } from "react"
import ProfileCardSkeleton from "./(profileCard)/ProfileCardSkeleton"
import ProfileCard from "./(profileCard)/ProfileCard"

export default async function ProfilePage() {
  return (
    <main className="flex flex-col flex-grow items-center justify-between w-screen pb-40 p-8">
      <Suspense fallback={<ProfileCardSkeleton />}>
        <ProfileCard />
      </Suspense>
      <SignOutBtn />
    </main>
  )
}
