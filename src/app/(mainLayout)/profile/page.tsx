import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { PenIcon, AwardIcon, FlagIcon, SoupIcon } from 'lucide-react'
import { auth } from "../../auth"

export default async function ProfilePage() {
  const session = await auth()
  const imageSrc = session?.user?.image
  return (
    <main className="flex flex-col flex-grow items-center justify-between w-screen pb-40 bg-gradient-to-br from-yellow-400 to-red-500 p-8">
      <Card className="relative max-w-3xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm shadow-xl pt-8">
        <CardHeader className="absolute right-2 top-2">
          <Button variant="outline" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-100">
            <PenIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src="/placeholder.svg?height=128&width=128"
                alt="User Avatar"
                className="rounded-full w-32 h-32 object-cover border-4 border-orange-400"
              />
              <Badge className="absolute bottom-0 right-0 bg-green-500">Online</Badge>
            </div>
            <h2 className="text-2xl font-bold text-orange-700">Sakura Tanaka</h2>
            <p className="text-orange-600">@sakura_t</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Noodles Slurped</h3>
              <div className="flex items-center space-x-2">
                <SoupIcon className="text-yellow-500" />
                <span className="text-3xl font-bold text-orange-700">1250</span>
              </div>
            </div>
            <hr className='border-orange-700' />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <AwardIcon className="text-yellow-500" />
                <div>
                  <p className="font-semibold text-orange-700">Puzzle</p>
                  <p className="text-sm text-orange-600">12 Solved</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FlagIcon className="text-red-500" />
                <div>
                  <p className="font-semibold text-orange-700">Difficulty</p>
                  <p className="text-sm text-orange-600">Easy</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Bio</h3>
              <p className="text-orange-700">
                Ramen enthusiast and chopstick master. Exploring the world of Japanese cuisine one noodle at a time.
                My goal: to slurp noodles in every prefecture of Japan!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}