export default function DevSolveBtn(props: { solveIt: () => void }) {
    if (process.env.NEXT_PUBLIC_ENV !== 'development')
        return null;
    return <button className='mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors' onClick={props.solveIt}>Solve It</button>
}