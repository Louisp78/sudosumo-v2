"use server";

import { ResponseDTO } from "./dto/ResponseDTO";
import { SudokuDTO } from "./dto/SudokuDTO";
import { fetchWrapper } from "./utils";

export async function getSudoku({
  regenerate = "true",
}): Promise<void | ResponseDTO<SudokuDTO>> {
  const response = await fetchWrapper("/sudoku/", undefined, [
    {
      key: "regenerate",
      value: regenerate,
    },
  ]);
  if (response) return { object: response.json(), status: response.status };
}

export async function solveSudoku(solution: string) {
  const response = await fetchWrapper("/sudoku/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solution: solution,
    }),
  });
  if (response) return { status: response.status };
}
