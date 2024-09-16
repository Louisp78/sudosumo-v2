import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function puzzleFormatToDisplay(puzzle: string): string[] {
  return puzzle.split("").map((element) => {
    return element !== "-" ? (Number(element) + 1).toString() : element;
  });
}

export function puzzleFormatToRequest(puzzle: string[]): string {
  return puzzle
    .map((elt) => (elt != "-" ? (Number(elt) - 1).toString() : elt))
    .join("");
}

function flatToMatrix(puzzle: string[]) {
  const matrix: string[][] = [];
  for (let i = 0; i < 9; i++) {
    const row = puzzle.slice(i * 9, i * 9 + 9);
    matrix.push(row);
  }
  return matrix;
}

export function checkPuzzle(puzzle: string[]) {
  const matPuzzle: string[][] = flatToMatrix(puzzle);

  // Helper function to check if a set of values are unique, ignoring "-"
  function hasUniqueValues(values: string[]): boolean {
    const filteredValues = values.filter((val) => val !== "-");
    const uniqueValues = new Set(filteredValues);
    return uniqueValues.size === filteredValues.length;
  }

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const row = matPuzzle[i];
    const col = matPuzzle.map((row) => row[i]);

    if (!hasUniqueValues(row) || !hasUniqueValues(col)) {
      return false;
    }
  }

  // Check 3x3 sub-grids
  for (let rowStart = 0; rowStart < 9; rowStart += 3) {
    for (let colStart = 0; colStart < 9; colStart += 3) {
      const grid = [];
      for (let r = rowStart; r < rowStart + 3; r++) {
        for (let c = colStart; c < colStart + 3; c++) {
          grid.push(matPuzzle[r][c]);
        }
      }
      if (!hasUniqueValues(grid)) {
        return false;
      }
    }
  }

  return true;
}
