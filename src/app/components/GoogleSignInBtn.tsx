
import { signIn } from "@/app/auth"
import { redirect } from "next/navigation"
 
export default function GoogleSignInBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 