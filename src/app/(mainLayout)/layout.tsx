import Link from "next/link";
import { SoupIcon, FlameIcon, GithubIcon, HeartIcon, MenuIcon } from 'lucide-react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: style the nav appbar
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 flex flex-col">
      <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-700 font-japanese flex items-center">
            <SoupIcon className="mr-2 text-yellow-500" />
            SudoSumo
          </h1>
          <nav className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FlameIcon className="text-red-500" />
              <span className='text-xl font-semibold text-orange-600'>5</span>
            </div>
            <button className="text-orange-600 hover:text-orange-700">
              <MenuIcon />
            </button>
          </nav>
        </div>
      </header>
      {children}
      <footer className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-xl py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-orange-700 flex items-center">
            Made with <HeartIcon className="text-red-500 mx-1 w-5 h-5" /> and a bowl of
            <SoupIcon className="text-yellow-500 mx-1 w-5 h-5" /> Next.js
          </p>
          <Link
            className="rounded-lg border-2 border-orange-500 px-4 py-2 hover:bg-orange-500 font-medium text-orange-700 hover:text-white transition-colors flex items-center"
            href="#"
          >
            <GithubIcon className="mr-2 w-5 h-5" />
            More on Github
          </Link>
        </div>
      </footer>
    </div>
  );
}
