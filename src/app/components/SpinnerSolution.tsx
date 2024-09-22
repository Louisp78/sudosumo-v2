export function SpinnerSolution() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-white border-t-transparent" />
      <p className="text-white font-medium">Checking your solution</p>
    </div>
  )
}
