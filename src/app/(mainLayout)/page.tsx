'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { SoupIcon, FlameIcon } from 'lucide-react'
import { getSudoku } from 'sudoku-gen'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import { redirect } from 'next/navigation'
import DevSolveBtn from '../components/DevSolveBtn'

export default function HomePage() {
  const isDev = process.env.ENV! === 'development';
  //TODO: store the sudoku in localstore to continue current puzzle

  const [puzzle, setPuzzle] = useState<string[]>(Array(81).fill('-'));
  var iniSudoku = useRef<Sudoku | undefined>()

  useEffect(() => {
    const sudoku = getSudoku("easy");
    setPuzzle(sudoku.puzzle.split(''))
    iniSudoku.current = sudoku;
  }, [setPuzzle])

  useEffect(() => {
    if (puzzle.join('') === iniSudoku.current?.solution)
      handleWin()
  }, [puzzle])

  function updatePuzzle(index: number, newValue: string) {
    setPuzzle(puzzle.map((elt, i) => i === index ? newValue : elt))
  }

  const indexOfSeparation = (index: number) => (index >= 9 * 2 && index < 9 * 3) ||
    (index >= 9 * 5 && index < 9 * 6) ||
    (index >= 9 * 8 && index < 9 * 9);

  const [selectedNb, selectNb] = useState<number>(1)

  function handleCellSelect(selectedCell: number) {
    if (puzzle[selectedCell] === "-")
      updatePuzzle(selectedCell, selectedNb.toString())
  }

  function handleCellError() {
    //TODO: cell handle errors
  }

  function handleWin() {
    redirect("/game/win")
  }

  function solveIt() {
    setPuzzle(iniSudoku.current?.solution.split('') ?? [])
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mb-8">
        <div className="border-4 border-white rounded-lg overflow-hidden shadow-2xl">
          <div className="w-full aspect-square grid grid-cols-9 bg-white bg-opacity-90">
            {puzzle.map((cellVal, index) => (
              <div
                className={clsx("flex aspect-square justify-center items-center text-2xl md:text-3xl font-bold border border-orange-200", {
                  "border-l-[3px] border-orange-300": index % 3 === 0,
                  "border-t-[3px] border-orange-300": indexOfSeparation(index),
                  "bg-orange-100": iniSudoku.current?.puzzle[index] !== '-',
                  "bg-white": iniSudoku.current?.puzzle[index] === '-',
                  "hover:bg-yellow-100": iniSudoku.current?.puzzle[index] === '-',
                })}
                key={index}
                onClick={() => handleCellSelect(index)}
              >
                {cellVal !== "-" ? cellVal : " "}
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-white text-center mt-4 flex items-center justify-center">
          <SoupIcon className="mr-2 text-yellow-300" />
          This puzzle contains 10 noodles
        </h2>
      </div>
      <section className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
        <ul className="flex gap-2 flex-wrap justify-center mb-4">
          {Array.from({ length: 9 }, (_, i) => i + 1).map(nbSudoku => (
            <li
              className={clsx("border-2 border-orange-400 rounded-md aspect-square w-12 flex justify-center items-center text-center text-xl font-bold cursor-pointer transition-colors", {
                "bg-orange-400 text-white": selectedNb === nbSudoku,
                "bg-white text-orange-600 hover:bg-orange-100": selectedNb !== nbSudoku,
              })}
              key={nbSudoku}
              onClick={() => selectNb(nbSudoku)}
            >
              {nbSudoku}
            </li>
          ))}
        </ul>
        <DevSolveBtn solveIt={solveIt} />
      </section>
    </main>
  )
}