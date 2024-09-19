import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { PenIcon, AwardIcon, FlagIcon, SoupIcon } from 'lucide-react'
import SignOutBtn from "@/app/components/SignOutBtn"
import UserAvatar from "@/app/components/UserAvatar"
import { getUser } from "@/app/service/user"
import Link from "next/link"

export default async function ProfilePage() {

  const user = await getUser()

  return (
    <main className="flex flex-col flex-grow items-center justify-between w-screen pb-40 bg-gradient-to-br from-yellow-400 to-red-500 p-8">
      <Card className="w-full mx-auto md:w-[80%] lg:w-[55%]  bg-white bg-opacity-90 backdrop-blur-sm shadow-xl pt-8">
        <CardHeader className="absolute right-2 top-2">
          <Link href='/profile/edit'>
            <Button variant="outline" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-100">
              <PenIcon className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <div className="relative">
              <UserAvatar className="w-32 h-32" size={200} avatarUrl={user?.avatarUrl} />
              <Badge className="absolute bottom-0 -right-2 bg-green-500">Online</Badge>
            </div>
            <h2 className="text-2xl font-bold text-orange-700">{user?.fullname}</h2>
            <p className="text-orange-600">@{user?.username}</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Noodles Slurped</h3>
              <div className="flex items-center space-x-2">
                <SoupIcon className="text-yellow-500" />
                <span className="text-3xl font-bold text-orange-700">{user?.noodles}</span>
              </div>
            </div>
            <hr className='border-orange-700' />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <AwardIcon className="text-yellow-500" />
                <div>
                  <p className="font-semibold text-orange-700">Puzzle</p>
                  <p className="text-sm text-orange-600">{user?.nbOfSolvedPuzzle} Solved</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FlagIcon className="text-red-500" />
                <div>
                  <p className="font-semibold text-orange-700">Difficulty</p>
                  <p className="text-sm text-orange-600">{user?.puzzleDifficulty}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Bio</h3>
              <p className="text-orange-700">{user?.bio ?? ('Ramen enthusiast and chopstick master. Exploring the world of Japanese cuisine one noodle at a time. My goal: to slurp noodles in every prefecture of Japan!')
              }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <SignOutBtn />
    </main>
  )
}
