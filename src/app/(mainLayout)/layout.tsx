import Link from "next/link"
import { SoupIcon, GithubIcon, HeartIcon } from 'lucide-react'
import AppBar from "../components/AppBar"
import { auth } from "../auth"
import { getUser } from "../service/user"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sudosumo - Let's eat sudokus",
  description: "SudoSumo is a dynamic and engaging Sudoku game offering puzzles for all skill levels. Solve 9x9 grids, challenge your logic, and improve your puzzle-solving skills with intuitive gameplay and sleek design. Play now on web or mobile and become a Sudoku master!",
}


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const imageSrc = session?.user?.image

  const user = await getUser()

  return (
    <>
      <AppBar avatarUrl={imageSrc} lifes={user?.lifes || 0} />
      {children}
      <footer className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-xl py-2 md:py-4  px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-orange-700 flex items-center">
            Made with <HeartIcon className="text-red-500 mx-1 w-5 h-5" /> and a bowl of
            <SoupIcon className="text-yellow-500 mx-1 w-5 h-5" /> Next.js
          </p>
          <Link
            className="rounded-lg border-2 border-orange-500 px-4 py-2 hover:bg-orange-500 font-medium text-orange-700 hover:text-white transition-colors flex items-center"
            href="https://github.com/Louisp78/sudosumo-v2"
            target="_blank"
          >
            <GithubIcon className="mr-2 w-5 h-5" />
            More on Github
          </Link>
        </div>
      </footer>
    </>
  )
}
