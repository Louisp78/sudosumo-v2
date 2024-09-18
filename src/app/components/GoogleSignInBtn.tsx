import { signInAction } from "../service/actions"
import { FaGoogle } from "react-icons/fa"

export default function GoogleSignInBtn() {
  return (
    <form action={signInAction}>
      <button type="submit" className="border px-3 py-2 rounded-sm font-medium flex gap-3 items-center">
        <FaGoogle />
        Signin with Google
      </button>
    </form>
  )
} 
