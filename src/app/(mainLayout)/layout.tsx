import Link from "next/link";
import { SoupIcon, GithubIcon, HeartIcon } from 'lucide-react'
import AppBar from "../components/AppBar";
import { auth } from "../auth";
import { getUser } from "../lib/actions";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const imageSrc = session?.user?.image;

  const user = await getUser();

  return (
    <>
      <AppBar avatarUrl={imageSrc} lifes={user?.lifes || 0} />
      {children}
      <footer className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-xl py-4 px-6 mt-auto">
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
  );
}