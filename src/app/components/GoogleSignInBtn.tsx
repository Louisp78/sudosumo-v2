import { FaGoogle } from "react-icons/fa"
import { signIn } from "../auth"

export default function GoogleSignInBtn() {
  return (
    <form action={
      async () => {
        "use server"
        await signIn("google")
      }
    }>
      <button type="submit" className="border px-3 py-2 rounded-sm font-medium flex gap-3 items-center">
        <FaGoogle />
        Signin with Google
      </button>
    </form>
  )
} 
