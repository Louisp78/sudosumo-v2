'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { EraserIcon, RotateCcwIcon, SoupIcon } from 'lucide-react'
import GameWinPage from '../../components/GameWinPage'
import { getSudoku, solveSudoku } from '../../service/sudoku'
import { checkPuzzle, puzzleFormatToDisplay, puzzleFormatToRequest } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '../../components/ui/button'
import SSButton from '../../components/SSButton'
import InvalidPuzzleDialog from '../../components/InvalidPuzzleDialog'
import { loseLife } from '../../service/user'
import { SudokuDTO } from '../../service/dto/SudokuDTO'

export default function PuzzlePage() {
  const isDev = process.env.NEXT_PUBLIC_ENV! === 'development'

  const [puzzle, setPuzzle] = useState<string[]>(Array(81).fill('-'))
  const setPuzzleWithLocal = (puzzle: string[]) => {
    localStorage.setItem('puzzle', JSON.stringify(puzzle))
    return setPuzzle(puzzle)
  }
  const [prevPuzzle, setPrevPuzzle] = useState<string[] | undefined>(undefined)
  const setPrevPuzzleWithLocal = (prevPuzzle: string[] | undefined) => {
    if (prevPuzzle === undefined)
      localStorage.removeItem('prevPuzzle')
    else
      localStorage.setItem('prevPuzzle', JSON.stringify(prevPuzzle))
    setPrevPuzzle(prevPuzzle)
  }
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [validPuzzle, setValidPuzzle] = useState<boolean>(true)
  const [iniSudoku, setIniSudoku] = useState<SudokuDTO>()
  const setIniSudokuWithLocal = (iniSudoku: SudokuDTO) => {
    localStorage.setItem('iniSudoku', JSON.stringify(iniSudoku))
    setIniSudoku(iniSudoku)
  }

  async function puzzleGeneration() {
    const response = await getSudoku({ regenerate: "false" })
    if (response) {
      if (response.status === 200) {
        const sudoku = await response.object
        setPuzzleWithLocal(puzzleFormatToDisplay(sudoku.puzzle))
        setIniSudokuWithLocal(sudoku)
      } else if (response.status === 400) {
        setErrorMessage("No life left")
      } else if (response.status === 404) {
        setErrorMessage("User not found")
      }
    } else {
      throw new Error("Unable to load sudoku")
    }
  }

  async function solve() {
    const response = await solveSudoku(puzzleFormatToRequest(puzzle))
    if (response) {
      if (response.status === 200) {
        return true
      }
      if (response.status === 500) {
        return false
      }
    }
    return false
  }

  // For localstorage
  useEffect(() => {
    const iniSudokuSto = localStorage.getItem('iniSudoku')
    if (iniSudokuSto) {
      setIniSudoku(JSON.parse(iniSudokuSto) as SudokuDTO)
    } else {
      puzzleGeneration()
    }

    const puzzleSto = localStorage.getItem('puzzle')
    if (puzzleSto)
      setPuzzle(JSON.parse(puzzleSto) as string[])
    else if (iniSudoku) {
      setPuzzleWithLocal(puzzleFormatToDisplay(iniSudoku?.puzzle))
    }
    const prevPuzzleSto = localStorage.getItem('prevPuzzle')
    if (prevPuzzleSto)
      setPrevPuzzle(JSON.parse(prevPuzzleSto) as string[])
  }, [])

  // for solve
  useEffect(() => {
    if (!puzzle.includes("-")) {
      solve().then((isSolved) => {
        if (isSolved) {
          localStorage.clear()
        }
        return setIsSolved(isSolved)
      })
    }
  }, [puzzle])

  async function updatePuzzle(index: number, newValue: string) {
    setPrevPuzzleWithLocal(puzzle)
    const newPuzzle = puzzle.map((elt, i) => i === index ? newValue : elt)
    setPuzzleWithLocal(newPuzzle)
  }

  const indexOfSeparation = (index: number) => (index >= 9 * 3 && index < 9 * 4) ||
    (index >= 9 * 6 && index < 9 * 7) ||
    (index >= 9 * 9 && index < 9 * 10)

  const [selectedNb, selectNb] = useState<number>(1)

  async function handleCellSelect(selectedCell: number) {

    if (iniSudoku?.puzzle[selectedCell] === "-") {
      const tempPuzzle = puzzle.map((elt, i) => i === selectedCell ? selectedNb.toString() : elt)
      if (checkPuzzle(tempPuzzle) === false) {
        loseLife()
        return setValidPuzzle(false)
      }
      await updatePuzzle(selectedCell, selectedNb.toString())
    }
  }

  async function handleSolve(data: FormData) {
    const response = await solveSudoku(data.get('solution')?.toString() ?? '')
    if (response) {
      if (response.status === 200) {
        setIsSolved(true)
      }
    } else {
      setIsSolved(false)
    }
  }

  function handleClear() {
    if (iniSudoku?.puzzle) {
      setPuzzleWithLocal(puzzleFormatToDisplay(iniSudoku.puzzle))
    }
  }

  function handleUndo() {
    if (prevPuzzle)
      setPuzzleWithLocal(prevPuzzle)
    setPrevPuzzleWithLocal(undefined)
  }

  if (isSolved)
    return <GameWinPage onClose={() => {
      puzzleGeneration().then(() => setIsSolved(false))
    }} noodles={iniSudoku?.noodles ?? 0} />

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mb-8">
        {errorMessage && <p>{errorMessage}</p>}
        {errorMessage == null &&
          (
            <div className="border-4 border-white rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full aspect-square grid grid-cols-9 bg-white bg-opacity-90">
                {puzzle.map((cellVal, index) => (
                  <div
                    className={clsx("flex aspect-square justify-center items-center text-2xl md:text-3xl font-bold border border-orange-200", {
                      "border-l-[3px] border-orange-300": index % 3 === 0,
                      "border-t-[3px] border-orange-300": indexOfSeparation(index),
                      "bg-orange-100": iniSudoku?.puzzle[index] !== '-',
                      "bg-white": iniSudoku?.puzzle[index] === '-',
                      "hover:bg-yellow-100": iniSudoku?.puzzle[index] === '-',
                    })}
                    key={index}
                    onClick={() => handleCellSelect(index)}
                  >
                    {cellVal !== "-" ? cellVal : " "}
                  </div>
                ))}
              </div>
            </div>
          )
        }
        <h2 className="text-white text-center mt-4 flex items-center justify-center">
          <SoupIcon className="mr-2 text-yellow-300" />
          This puzzle contains {iniSudoku?.noodles} noodles
        </h2>
      </div>
      {validPuzzle === false &&
        <InvalidPuzzleDialog open={validPuzzle === false}
          onOpenChange={(open) => setValidPuzzle(!open)}
          onContinue={() => setValidPuzzle(true)} />
      }
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
        <ul className='flex gap-3 w-full justify-center md:justify-start'>
          <li>
            <SSButton
              className='flex gap-1'
              onClick={handleClear}
            >
              <EraserIcon size={15} />
              Clear
            </SSButton>
          </li>
          <li>
            {
              prevPuzzle &&
              <SSButton className='flex gap-1' onClick={handleUndo}>
                <RotateCcwIcon size={15} />
                Undo
              </SSButton>
            }
          </li>
        </ul>
        {isDev && <form action={handleSolve}>
          <Input name='solution' type='text' id='solution' />
          <Button type='submit' className='mt-3'>Submit</Button>
        </form>}
      </section>
    </main>
  )
}
