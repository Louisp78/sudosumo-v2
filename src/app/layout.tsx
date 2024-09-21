import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Sudosumo - Let's eat sudokus",
    description: "SudoSumo is a dynamic and engaging Sudoku game offering puzzles for all skill levels. Solve 9x9 grids, challenge your logic, and improve your puzzle-solving skills with intuitive gameplay and sleek design. Play now on web or mobile and become a Sudoku master!",
}

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode,
}>) {
    return (
        <html lang="en">
            <body>
                <div className={inter.className}>
                    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 flex flex-col">
                        {children}
                    </div>
                    <Toaster closeButton />
                </div>
            </body>
        </html>
    )
}
